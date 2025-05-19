'use client'

import { useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import InputDePesquisa from "./InputDePesquisa";
import Entrar from "./Entrar";
import SubHeader from './SubHeader';
import Link from 'next/link';
import Image from 'next/image';


function Header() {
    const [entrarIsHovered, setEntrarIsHovered] = useState(false)

    return (
        <>
            <header className="flex py-4 justify-center gap-16 items-center bg-black text-white">

                {/* Parte Esquerda */}
                <ul className="flex gap-2 items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src="/logo.png" 
                            alt="Logo" 
                            width={80} 
                            height={80}
                            priority
                            quality={90} 
                        />
                        <h2 className="text-3xl">Salpatos</h2>
                    </Link>
                </ul>

                {/* Parte Meio */}
                <InputDePesquisa />

                {/* Parte direita */}
                <ul className="flex gap-4 items-center text-sm font-bold">
                    <li className="flex items-center gap-2 cursor-pointer">
                        <FaRegHeart className="inline text-3xl" />
                        Lista de Desejos
                    </li>
                    {/* Entrar*/}
                    <li
                        className="flex items-center gap-1 py-2 cursor-pointer relative"
                        onMouseEnter={() => setEntrarIsHovered(true)}
                        onMouseLeave={() => setEntrarIsHovered(false)}
                    >
                        <Entrar entrarIsHovered={entrarIsHovered} />
                    </li>
                    <li className='cursor-pointer relative'>
                        <HiOutlineShoppingBag className="inline text-4xl" />
                        <span className='absolute top-[18px] right-[-5px] bg-white text-black rounded-full w-[18px] h-[18px] flex justify-center items-center text-xs '>20</span>
                    </li>
                </ul>
            </header>
            <SubHeader />
        </>
    )
}

export default Header;