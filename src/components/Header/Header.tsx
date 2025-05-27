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
            <header className="fixed top-0 left-0 right-0 z-50 flex py-1 justify-center gap-16 items-center bg-black text-white">

                {/* Parte Esquerda */}
                <ul className="flex gap-2 items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={55}
                            height={55}
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
            <div className="pt-[65px]" >
                <SubHeader />
            </div>
        </>
    )
}

export default Header;