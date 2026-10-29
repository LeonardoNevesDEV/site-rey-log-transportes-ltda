import { createServerFn } from "@tanstack/react-start";

import type { QuoteRequest } from "./quote.server";

export const generateQuote = createServerFn({ method: "POST" })
  .inputValidator((data: { description?: unknown }) => {
    const description = typeof data?.description === "string" ? data.description.trim() : "";
    if (description.length < 10) {
      throw new Error("Descreva o transporte com um pouco mais de detalhes (mínimo de 10 caracteres).");
    }
    if (description.length > 2000) {
      throw new Error("Descrição muito longa. Resuma em até 2000 caracteres.");
    }
    return { description };
  })
  .handler(async ({ data }): Promise<QuoteRequest> => {
    const { generateQuoteFromDescription } = await import("./quote.server");
    return generateQuoteFromDescription(data.description);
  });
