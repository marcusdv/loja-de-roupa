// Importa a função clsx e o tipo ClassValue da biblioteca clsx
// clsx é uma biblioteca que ajuda a combinar classes CSS condicionalmente
import { clsx, type ClassValue } from "clsx"

// Importa a função twMerge da biblioteca tailwind-merge
// twMerge ajuda a resolver conflitos entre classes do Tailwind
import { twMerge } from "tailwind-merge"

// Função utilitária que combina clsx e twMerge
// Aceita múltiplos argumentos do tipo ClassValue (strings, objetos ou arrays)
// Retorna uma string com as classes CSS combinadas e sem conflitos
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
