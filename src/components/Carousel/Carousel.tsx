'use client';

import Image from 'next/image';
import { useRef } from 'react';

export default function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null); // referência na div com overflow

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categorias = [
    'Rasteiras', 'Tênis', 'Sapatos', 'Chinelos', 'Tamancos',
    'Mocassins', 'Sapatilhas', 'Sandálias', 'Botas', 'Botinhas', 
  ];

  return (
    <div className="relative w-full">
      {/* Botões de navegação */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full cursor-pointer"
      >
        ◀
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white shadow rounded-full cursor-pointer"
      >
        ▶
      </button>

      {/* Carrossel com scroll horizontal */}
      <div ref={scrollRef} className="overflow-x-auto px-8 scroll-smooth">
        <ul className="flex flex-nowrap gap-4 py-4">
          {categorias.map((categoria) => (
            <li key={categoria} className="flex flex-col gap-2 items-center">
              <Image
                width={100}
                height={100}
                alt="categoria"
                src="https://placehold.co/100x100.png"
                className="object-cover rounded-full"
              />
              <p className="text-sm">{categoria}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
