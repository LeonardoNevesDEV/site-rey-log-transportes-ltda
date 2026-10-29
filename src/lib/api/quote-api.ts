import { z } from "zod";

const quoteSchema = z
  .object({
    veiculo: z.string().trim().min(1).max(120),
    origem: z.string().trim().min(1).max(200),
    destino: z.string().trim().min(1).max(200),
    modalidade: z.enum(["Carreta cegonha", "Caminhão sider", "Prancha", "A definir"]),
    observacoes: z.string().trim().max(500),
  })
  .strict();

const contacts = [
  { name: "Rhayane", phone: "5531994527926" },
  { name: "Leonardo", phone: "553191522756" },
];

const maxBodyBytes = 8_192;

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      ...headers,
    },
  });
}

function apiError(status: number, code: string, message: string, details?: unknown) {
  return jsonResponse(
    { error: { code, message, ...(details ? { details } : {}) } },
    status,
  );
}

function methodNotAllowed(allow: string) {
  const response = apiError(405, "METHOD_NOT_ALLOWED", "Método HTTP não permitido.", { allow });
  response.headers.set("allow", allow);
  return response;
}

export async function handleApiRequest(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/v1")) return null;

  if (url.pathname === "/api/v1" && request.method === "GET") {
    return jsonResponse({
      name: "ReyLog Quote API",
      version: "v1",
      endpoints: [
        { method: "GET", path: "/api/v1/health", description: "Verifica se a API está disponível." },
        {
          method: "POST",
          path: "/api/v1/cotacoes",
          description: "Valida uma cotação e prepara links para enviá-la ao WhatsApp comercial.",
        },
      ],
    });
  }

  if (url.pathname === "/api/v1/health") {
    if (request.method !== "GET") return methodNotAllowed("GET");
    return jsonResponse({ status: "ok", apiVersion: "v1" });
  }

  if (url.pathname !== "/api/v1/cotacoes") {
    return apiError(404, "NOT_FOUND", "Endpoint não encontrado.");
  }

  if (request.method !== "POST") return methodNotAllowed("POST");

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== url.origin) {
        return apiError(403, "ORIGIN_NOT_ALLOWED", "Origem da solicitação não permitida.");
      }
    } catch {
      return apiError(403, "ORIGIN_NOT_ALLOWED", "Origem da solicitação inválida.");
    }
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return apiError(415, "UNSUPPORTED_MEDIA_TYPE", "Envie o conteúdo como application/json.");
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxBodyBytes) {
    return apiError(413, "PAYLOAD_TOO_LARGE", "O corpo da solicitação excede o limite de 8 KB.");
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return apiError(400, "INVALID_BODY", "Não foi possível ler o corpo da solicitação.");
  }

  if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
    return apiError(413, "PAYLOAD_TOO_LARGE", "O corpo da solicitação excede o limite de 8 KB.");
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return apiError(400, "INVALID_JSON", "O corpo deve conter um JSON válido.");
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(422, "VALIDATION_ERROR", "Confira os campos da cotação.", {
      fields: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const quote = parsed.data;
  const message = [
    "Olá! Vim pelo site da ReyLog e gostaria de uma cotação:",
    "*Veículo:* " + quote.veiculo,
    "*Origem:* " + quote.origem,
    "*Destino:* " + quote.destino,
    "*Modalidade:* " + quote.modalidade,
    "*Observações:* " + (quote.observacoes || "Não informado"),
  ].join("\n");

  const whatsappContacts = contacts.map((contact) => ({
    name: contact.name,
    url:
      "https://wa.me/" +
      contact.phone +
      "?text=" +
      encodeURIComponent(message),
  }));

  return jsonResponse({
    data: { cotacao: quote, mensagem: message, contatos: whatsappContacts },
    meta: { armazenada: false },
  });
}
