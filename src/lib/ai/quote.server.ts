import { createOpenAI } from "@ai-sdk/openai";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { z } from "zod";

import { createLovableAiGatewayRunIdFetch } from "./run-id";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export const quoteSchema = z.object({
  veiculo: z.string().describe("Tipo, marca e modelo do veículo, se informados"),
  origem: z.string().describe("Cidade/UF ou endereço de coleta"),
  destino: z.string().describe("Cidade/UF ou endereço de entrega"),
  modalidade: z
    .enum(["Carreta cegonha", "Caminhão sider", "Prancha", "A definir"])
    .describe("Modalidade de transporte mais adequada"),
  observacoes: z.string().describe("Demais detalhes relevantes informados pelo cliente"),
});

export type QuoteRequest = z.infer<typeof quoteSchema>;

const INSTRUCTIONS = `Você é o assistente de cotações da Rey Log Transportes Ltda., transportadora de veículos que atende todo o Brasil.
A partir da descrição livre do cliente, organize uma solicitação de cotação com: veículo, origem, destino, modalidade de transporte e observações.
Regras:
- Responda sempre em português do Brasil.
- Modalidades disponíveis: Carreta cegonha (frotas e múltiplos veículos), Caminhão sider (veículo protegido contra intempéries), Prancha (atendimento individual dedicado). Se o cliente não indicar ou não houver informação suficiente, use "A definir".
- Se algum dado não foi informado, escreva "Não informado" no campo correspondente — nunca invente cidades, modelos ou datas.
- Nas observações, inclua detalhes úteis para o comercial: prazo, quantidade de veículos, se o veículo roda ou não, ponto de coleta (cliente ou pátio), etc. Seja breve, no máximo 2 frases.`;

export async function generateQuoteFromDescription(
  description: string,
): Promise<QuoteRequest> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("LOVABLE_API_KEY não configurada");

  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  try {
    const result = streamText({
      model: provider.responses(MODEL),
      system: INSTRUCTIONS,
      messages: [{ role: "user", content: description }],
      output: Output.object({ schema: quoteSchema }),
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    return await result.output;
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error) && error.text) {
      const parsed = quoteSchema.safeParse(JSON.parse(error.text));
      if (parsed.success) return parsed.data;
    }
    throw error;
  }
}
