/**
 * Traduz uma lista de cores em português para suas versões em inglês.
 *
 * Exemplo:
 *   translateColors(["vermelho", "azul", "verde"]) => ["red", "blue", "green"]
 *
 * @param {string[]} coresPt - Array com nomes de cores em português.
 * @returns {string[]} Array com os nomes das cores em inglês.
 */
export function translateColors(coresPt: string[]): string[] {
  // Objeto que mapeia nomes de cores do português para o inglês
  const mapaCores: Record<string, string> = {
    vermelho: "red",
    azul: "blue",
    verde: "green",
    amarelo: "yellow",
    preto: "black",
    branco: "white",
    cinza: "gray",
    rosa: "pink",
    roxo: "purple",
    laranja: "orange",
    marrom: "brown",
    bege: "beige",
    dourado: "gold",
    prateado: "silver",
  };

  // Mapeia cada cor da lista usando o dicionário; se não encontrar, retorna "transparent"
  return coresPt.map((cor) => mapaCores[cor.toLowerCase()] || "transparent");
}
