'use client';
import Image from "next/image";
import { useState, useEffect } from "react";

export default function MainBanner() {
  const [bannerAtual, setBannerAtual] = useState(1);

    useEffect(() => {
        // Cria um novo intervalo sempre que bannerAtual mudar
        const interval = setInterval(() => {
            setBannerAtual(atual => atual === 3 ? 1 : atual + 1);
        }, 5000);

        // Limpa o intervalo quando bannerAtual mudar ou componente desmontar
        return () => clearInterval(interval);
    }, [bannerAtual]); // Dependência no bannerAtual



    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            <div
                // Animação do banner
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${(bannerAtual - 1) * 100}%)` }}
            >
                <div className="min-w-full relative h-[600px] ">
                    <Image
                        src="/banner-1.png"
                        alt="banner de promoção 1"
                        fill
                        priority
                        className="object-cover"
                        quality={85}
                    />
                </div>
                <div className="min-w-full relative h-[600px]">
                    <Image
                        src="/banner-2.png"
                        alt="banner de promoção 2"
                        fill
                        priority
                        className="object-cover"
                        quality={85}
                    />
                </div>
                <div className="min-w-full relative h-[600px]">
                    <Image
                        src="/banner-3.png"
                        alt="banner de promoção 3"
                        fill
                        priority
                        className="object-cover"
                        quality={85}
                    />
                </div>
            </div>
            {/* Bolinhas de navegação */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[1, 2, 3].map((numero) => (
                    <button
                        // Animação das bolinhas
                        key={numero}
                        disabled={bannerAtual === numero}
                        className={`w-3 h-3 rounded-full  transition-colors ${bannerAtual === numero ? 'bg-white cursor-default' : 'bg-white/50 cursor-pointer'
                            }`}
                        onClick={() => setBannerAtual(numero)}
                        aria-label={`Ver banner ${numero}`}
                    />
                ))}
            </div>
        </div>
    )
}