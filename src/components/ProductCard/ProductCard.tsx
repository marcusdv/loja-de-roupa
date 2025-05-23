import { Product } from '../../types/types'
import Image from 'next/image'
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaStar, FaStarHalf } from "react-icons/fa6";


function ProductCard({ produto, favoritado }: { produto: Product, favoritado: boolean }) {
    const { nome, preco, desconto, marca, descricao, estrelas, preco_anterior, frete_gratis, cores } = produto;

    return (
        <div className="flex flex-col p-2 max-w-[300px] border border-gray-100 cursor-pointer group">
            {/* Imagem do produto e icone de favoritar */}
            <div className="relative">
                <Image
                    src={"https://placehold.co/300x300.png"}
                    alt={descricao}
                    width={300}
                    height={300}
                    className="object-contain"
                />
                {/* ❤️ */} <div className="absolute top-1 right-1 text-xl bg-slate-200 rounded-full p-1">{favoritado ? <IoHeartSharp className='text-red-500' /> : <IoHeartOutline />}</div>
            </div>

            {!!desconto && desconto > 0 && 
            <div className="justify-end text-center bg-emerald-400 font-bold text-sm py-0.5 text-white">{`-${desconto}% OFF`}</div>
            }

            <div className='flex flex-col gap-0.5'>
                <h3 className='text-sm text-gray-600 group-hover:underline mt-2'>{nome} - {marca}</h3>
                {estrelas && estrelas > 0 &&
                    <div className="flex gap-0.5">
                        {/* cria uma array com o numero de estrelas arredondado para baixo. ex: 4.3 -> 4 estrelas */}
                        {[...Array(Math.floor(estrelas))].map((_, i) => (
                            <FaStar key={i} className='fill-yellow-400' />
                        ))}
                        {/* se o numero de estrelas nao for inteiro, adiciona uma estrela meio preenchida */}
                        {estrelas % 1 !== 0 && <FaStarHalf className='fill-yellow-400' />}
                    </div>

                }
                {frete_gratis &&
                    <div className="text-green-400 font-bold tracking-tight">FRETE GRÁTIS</div>
                }
                {/* Cores disponíveis */}
                <div className="flex gap-1 mt-1 items-center">
                    <span className="text-xs text-gray-500 mr-1">Cores:</span>
                    {/* exibe as 4 primeiras cores */}
                    {cores.slice(0, 4).map((cor, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full border border-gray-300`}
                            style={{
                                backgroundColor: cor,
                                opacity: 0.8,
                                boxShadow: cor === 'white' ? 'inset 0 0 0 1px #ccc' : 'none'
                            }}
                        ></div>
                    ))}
                    {/* se houver mais de 4 cores, exibe o numero de cores restantes */}
                    {cores.length > 4 && (
                        <span className="text-xs text-gray-500">+{cores.length - 4}</span>
                    )}
                </div>
                {preco_anterior &&
                    <p className='text-sm text-gray-500 line-through '>R${(preco_anterior / 3).toFixed(2)}</p>

                }
                <p className='text-xl font-bold'>R$ {preco.toFixed(2)}</p>
                <p className='text-sm text-gray-500'>ou 3x de R$ {(preco / 3).toFixed(2)} sem juros</p>
            </div>

        </div>
    )
}

export default ProductCard;