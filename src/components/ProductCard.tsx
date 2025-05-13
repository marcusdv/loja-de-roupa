import { Product } from '../types/types'

interface ProductCardProps {
    produto: Product;
    addToCart: (product: Product) => void;
}

function ProductCard({ produto, addToCart }: ProductCardProps) {
    return (
        <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full w-full border border-gray-200 rounded-md p-6 shadow-gray-400 shadow-sm">
                <img className="p-2 row-span-2 " src={produto.image} alt={produto.description} />
                <h3>{produto.name}</h3>
                <div className="flex flex-col justify-end">
                    <p>R$ {produto.price.toFixed(2)}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer w-full " onClick={() => addToCart(produto)}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;