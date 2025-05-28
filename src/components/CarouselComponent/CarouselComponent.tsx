'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"


export default function CarouselComponent() {

  const categorias = [
    'Rasteiras', 'Tênis', 'Sapatos', 'Chinelos', 'Tamancos',
    'Mocassins', 'Sapatilhas', 'Sandálias', 'Botas', 'Botinhas',
  ];

  return (
    // 50% on small screens and 33% on larger screens.
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-3/6 md:max-w-3/4  mx-auto"
      >
        <CarouselContent>
          {categorias.map((categoria, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/4 lg:basis-1/7">
              <div className="p-1">
                <Card className=" overflow-hidden p-0 border-0 shadow-none">
                  <CardContent className="p-0 flex flex-col gap-1 justify-center items-center ">
                    <Image className='object-cover rounded-full' src="https://placehold.co/150x150.png" alt='' width={150} height={150} quality={90} />
                    <p className='text-gray-500 text-sm '>{categoria.toUpperCase()}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
