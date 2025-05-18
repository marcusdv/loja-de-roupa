export type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    quantity?: number,
}

export type ProductAPIResponse = {
    id: number,
    title: string,
    price: number,
    description: string,
    image: string
}