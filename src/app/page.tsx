'use client'

import Image from 'next/image';


export default function Loja() {
 
  return (
    <>
      {/* Banner */}
      <div className="w-full h-screen">
        <div className="relative w-full h-full">
          <Image
            src="/modelo-home.jpg"
            alt="Modelo"
            fill
            priority
            className="object-cover"
            quality={85}
            sizes="100vw"
          />
        </div>
      </div>
    </>
  );
}
