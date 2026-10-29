import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { generateQuote } from "@/lib/ai/quote.functions";
import type { QuoteRequest } from "@/lib/ai/quote.server";

type QuoteApiResponse = {
  data?: { cotacao: QuoteRequest; contatos: { name: string; url: string }[] };
  error?: { message?: string };
};

export function QuoteAssistant({
  contacts,
}: {
  contacts: { name: string; number: string }[];
}) {
  const run = useServerFn(generateQuote);
  const [text, setText] = useState("");
  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [whatsappUrls, setWhatsappUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const organized = await run({ data: { description: text } });
      const response = await fetch("/api/v1/cotacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organized),
      });
      const payload = (await response.json()) as QuoteApiResponse;
      if (!response.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Não foi possível preparar os links do WhatsApp.");
      }
      setQuote(payload.data.cotacao);
      setWhatsappUrls(Object.fromEntries(payload.data.contatos.map((contact) => [contact.name, contact.url])));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível organizar a cotação.");
    } finally {
      setLoading(false);
    }
  }

  const fields: [string, keyof QuoteRequest][] = [
    ["Veículo", "veiculo"],
    ["Origem", "origem"],
    ["Destino", "destino"],
    ["Modalidade", "modalidade"],
    ["Observações", "observacoes"],
  ];

  return (
    <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-2">
      <form onSubmit={submit} className="min-w-0 border-t border-border pt-6">
        <label htmlFor="quote-desc" className="font-display text-lg font-semibold">
          Descreva o transporte
        </label>
        <textarea
          id="quote-desc"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          maxLength={2000}
          placeholder="Ex.: Preciso levar uma BMW X1 de Belo Horizonte/MG para São Paulo/SP na próxima semana, o carro está rodando."
          className="mt-4 w-full resize-y rounded-lg border border-input bg-secondary p-4 text-base leading-relaxed placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
        <Button
          type="submit"
          disabled={loading || text.trim().length < 10}
          className="mt-4 h-12 w-full rounded-full px-6 font-semibold shadow-none sm:w-auto"
        >
          {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Sparkles className="size-4" aria-hidden />}
          {loading ? "Organizando..." : "Organizar com IA"}
        </Button>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </form>

      <div className="min-w-0 border-t border-border pt-6" aria-live="polite" aria-busy={loading}>
        <h3 className="font-display text-lg font-semibold">Sua solicitação</h3>
        {quote ? (
          <>
            <dl className="mt-4 space-y-3">
              {fields.map(([label, key]) => (
                <div key={key}>
                  <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
                  <dd className="break-words text-base font-semibold">{quote[key]}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              {contacts.map((c) => (
                <Button asChild key={c.name} className="h-auto min-h-11 rounded-full px-5 py-3 font-semibold shadow-none"><a
                  key={c.name}
                  href={whatsappUrls[c.name] ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  Enviar para {c.name}
                </a></Button>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            {loading ? "Organizando seu pedido…" : "Aguardando os detalhes do seu transporte."}
          </p>
        )}
      </div>
    </div>
  );
}
