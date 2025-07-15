import Link from 'next/link'
import Image from 'next/image'
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { Product } from '../../types/product'
import { translatedForBackground } from '../../utils/translateColor'
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from '../../contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';


// Componente que exibe um card de produto com suas informações
function ProductCard({ produto, favoritado }: { produto: Product, favoritado: boolean }) {
    const { addItem } = useCart();
    const { showToast } = useToast();

    const {
        id,
        nome,
        preco,
        desconto,
        marca,
        descricao,
        estrelas,
        preco_anterior,
        frete_gratis,
        cores
    } = produto;

    // Função auxiliar para renderizar as estrelas de avaliação
    const renderEstrelas = () => {
        if (!estrelas || estrelas <= 0) return null;

        return (
            <div className="flex gap-0.5">
                {[...Array(Math.floor(estrelas))].map((_, i) => (
                    <FaStar key={i} className='fill-yellow-400' />
                ))}
                {estrelas % 1 !== 0 && <FaStarHalf className='fill-yellow-400' />}
            </div>
        );
    };

    // Função auxiliar para renderizar as cores disponíveis
    const renderCores = () => (
        <div className="flex gap-1 mt-1 items-center">
            <span className="text-xs text-gray-500 mr-1">Cores:</span>
            {cores.slice(0, 4).map((cor: string, i: number) => (
                <div
                    key={i}
                    className={`w-3 h-3 rounded-full border border-gray-300 ${translatedForBackground(cor)}`}
                />
            ))}
            {cores.length > 4 && (
                <span className="text-xs text-gray-500">+{cores.length - 4}</span>
            )}
        </div>
    );

    // Função para lidar com o clique no ícone do carrinho
    const handleClick = () => {
        addItem({
            id: id.toString(),
            name: nome,
            price: preco,
            quantity: 1,
            image: "https://placehold.co/300x300.png" // Placeholder para imagem
        });
        showToast(`${nome} adicionado ao carrinho!`, 1500);
    };

    return (
        <div className="relative flex flex-col p-2 max-w-[300px] border border-gray-100 cursor-pointer group hover:border-slate-300 hover:rounded-sm">
            {/* Seção da imagem e favorito */}
            <div className="relative">
                <Link href={`/product/${id}`}>
                    <Image
                        src={"https://placehold.co/300x300.png"}
                        alt={descricao}
                        width={300}
                        height={300}
                        className="object-contain"
                    />
                </Link>

                {/* Icone de coração */}
                <div className="absolute top-1 right-1 text-xl bg-slate-200 rounded-full p-1">
                    {favoritado ? <IoHeartSharp className='text-red-500' /> : <IoHeartOutline />}
                </div>
            </div>

            {/* Badge de desconto */}
            {!!desconto && desconto > 0 && (
                <div className="justify-end text-center bg-emerald-400 font-bold text-sm py-0.5 text-white">
                    {`-${desconto}% OFF`}
                </div>
            )}

            {/* Informações do produto */}
            <div className='flex flex-col gap-0.5'>
                <h3 className='text-sm text-gray-600 group-hover:underline mt-2'>
                    {nome} - {marca}
                </h3>

                {renderEstrelas()}

                {frete_gratis && (
                    <div className="text-green-400 font-bold tracking-tight">
                        FRETE GRÁTIS
                    </div>
                )}

                {renderCores()}

                {preco_anterior && (
                    <p className='text-sm text-gray-500 line-through'>
                        R${(preco_anterior / 3).toFixed(2)}
                    </p>
                )}

                <p className='text-xl font-bold'>
                    R$ {preco.toFixed(2)}
                </p>

                <p className='text-sm text-gray-500'>
                    ou 3x de R$ {(preco / 3).toFixed(2)} sem juros
                </p>
            </div>
            {/* Icone do carrinho */}
            <div
                onClick={handleClick}
                className='absolute right-6 bottom-2 text-2xl text-gray-700 hover:text-black transition-colors transform hover:animate-bounce'>
                <FaCartArrowDown />
            </div>
        </div>
    )
}

export default ProductCard;