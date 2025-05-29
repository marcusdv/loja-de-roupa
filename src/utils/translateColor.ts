

/**
 * A normaliza o  feita em 3 etapas:
 * 1. Decompor caracteres acentuados em sua forma base.
 *    Exemplo: "vermelhô" vira "vermelho".
 * 2. Remover acentos.
 *    Exemplo: "vermelho" vira "vermelho".
 * 3. Converter para letras min sculas.
 *    Exemplo: "VERMELHO" vira "vermelho".
 *
 * @param {string} cor - A string de cor que deseja normalizar.
 * @returns {string} A string de cor normalizada.
 */

function normalizeColor(cor: string): string {
  return cor
    .normalize("NFD")                // decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // remover acentos
    .toLowerCase()
    .trim();
}

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
  return coresPt.map((cor) => mapaCores[normalizeColor(cor)] || "transparent");
}



/**
 * Traduz uma cor em português para sua classe de estilo de background no Tailwind CSS.
 *
 * Exemplo:
 *   translatedForBackground("vermelho") => "bg-red-500"
 *
 * @param {string} cor - A cor em português que deseja traduzir.
 * @returns {string} A classe de estilo de background no Tailwind CSS.
 */
export function translatedForBackground(cor: string): string {
  
  const bgColors: Record<string, string> = {
        preto: "bg-black",
        branco: "bg-white",
        vermelho: "bg-red-500",
        azul: "bg-blue-500",
        verde: "bg-green-500",
        amarelo: "bg-yellow-500",
        cinza: "bg-gray-500",
        rosa: "bg-pink-500",
        roxo: "bg-purple-500",
        laranja: "bg-orange-500",
        marrom: "bg-orange-900",
        bege: "bg-yellow-100",
        dourado: "bg-yellow-300",
        prateado: "bg-gray-300",
    };

    console.log(normalizeColor("Róxo"))

    return bgColors[normalizeColor(cor)] || "bg-transparent";
}