'use client'

import Image from 'next/image';


export default function Loja() {
 
  return (
    <>
      {/* Banner */}
      <div className="w-full h-screen">
        <div className="relative w-full h-[600px]">
          <Image
            src="/banner-1.png"
            alt="banner de promoção"
            fill
            priority
            className="object-cover" 
            quality={85}
          />
        </div>
      </div>
    </>
  );
}
