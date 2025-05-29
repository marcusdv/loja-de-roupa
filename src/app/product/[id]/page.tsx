// app/product/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import { translatedForBackground } from "@/utils/translateColor";
import Image from "next/image";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { data: produto, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error || !produto) {
        return <p>Produto não encontrado.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">

            <div className="grid md:grid-cols-2 md:col-span-2 gap-4">
                <div><Image src={"https://placehold.co/500x500.png"} alt={produto.nome} width={500} height={500} className="object-contain w-full h-auto max-h-[500px]" /></div>
                <div><Image src={"https://placehold.co/500x500.png"} alt={produto.nome} width={500} height={500} className="object-contain w-full h-auto max-h-[500px]" /></div>
                <div><Image src={"https://placehold.co/500x500.png"} alt={produto.nome} width={500} height={500} className="object-contain w-full h-auto max-h-[500px]" /></div>
                <div><Image src={"https://placehold.co/500x500.png"} alt={produto.nome} width={500} height={500} className="object-contain w-full h-auto max-h-[500px]" /></div>
            </div>


            {/* Informações do produto */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{produto.nome}</h1>

                <p className="text-gray-600">{produto.descricao}</p>

                {/* Preço e desconto */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-black">
                        R$ {produto.preco.toFixed(2)}
                    </span>
                    {produto.preco_anterior && (
                        <span className="text-gray-400 line-through text-sm">
                            R$ {produto.preco_anterior.toFixed(2)}
                        </span>
                    )}
                    {produto.desconto > 0 && (
                        <span className="bg-emerald-500 text-white px-2 py-0.5 text-sm rounded">
                            {produto.desconto}% OFF
                        </span>
                    )}
                </div>

                {/* Frete grátis */}
                {produto.frete_gratis && (
                    <div className="text-green-600 font-semibold">Frete grátis disponível</div>
                )}

                {/* Marca e avaliações */}
                <p className="text-sm text-gray-500">Marca: {produto.marca}</p>
                {produto.estrelas > 0 && (
                    <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(Math.floor(produto.estrelas))].map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                        {produto.estrelas % 1 !== 0 && <span>☆</span>}
                        <span className="ml-2 text-sm text-gray-600">{produto.estrelas} estrelas</span>
                    </div>
                )}

                {/* Cores disponíveis */}
                <div>
                    <p className="text-sm text-gray-500 mb-1">Cores disponíveis:</p>
                    <div className="flex gap-2">
                        {produto.cores.map((cor: string | null, i: number) => {
                            if (!cor) return null
                            return (
                                <div
                                    key={i}
                                    className={`w-6 h-6 rounded-full border border-gray-300 ${translatedForBackground(cor)}`}
                                    title={cor}
                                >
                                </div>

                            )
                        })}
                    </div>
                </div>

                {/* Botão de ação */}
                <button className="mt-6 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>

    );
}
