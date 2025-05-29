'use client'

import { useState } from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import InputDePesquisa from "./InputDePesquisa";
import Entrar from "./Entrar";
import SubHeader from './SubHeader';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';


function Header() {
    const [entrarIsHovered, setEntrarIsHovered] = useState(false)
    const [hamburguerIsOpen, setHamburguerIsOpen] = useState(false)

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
                <div className='w-2/6 hidden md:block'>
                    <InputDePesquisa />
                </div>

                {/* Parte direita */}
                {/* Esconde em telas maiores */}
                <ul className="hidden md:flex gap-4 items-center text-sm font-bold">
                    <li className="flex items-center gap-2 cursor-pointer">
                        <FaRegHeart className="inline text-3xl" />
                        <span className="hidden lg:block">Lista de Desejos</span>
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
                        <span className='absolute top-[18px] right-[-5px] bg-white text-black rounded-full w-[18px] h-[18px] flex justify-center items-center text-xs '>0</span>
                    </li>
                </ul>


                {/* Mobile */}
                {/* Esconde em telas maiores */}

                {/* Hamburguer */}
                <button
                    className="md:hidden text-4xl cursor-pointer " onClick={() => setHamburguerIsOpen(!hamburguerIsOpen)}
                    aria-label={hamburguerIsOpen ? 'Fechar menu' : 'Abrir menu'}
                >
                    {hamburguerIsOpen ? <HiX /> : <HiMenu />}
                </button >


                {/* Botão hambúrguer apenas em mobile */}
                {hamburguerIsOpen && (
                    <aside className="fixed inset-0 z-40 bg-black/95 text-white p-6 overflow-auto">
                        <div className="flex items-center justify-between mb-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
                                <h2 className="text-xl font-bold">Salpatos</h2>
                            </Link>
                            <button
                                className="text-2xl"
                                onClick={() => setHamburguerIsOpen(false)}
                                aria-label="Fechar menu"
                            >
                                <HiX />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <InputDePesquisa />

                            <ul className="space-y-4 text-lg font-medium">
                                <li className="flex items-center gap-2"><FaRegHeart className="text-2xl" /> Lista de Desejos</li>
                                <li
                                >
                                    <Entrar entrarIsHovered={false} />
                                </li>
                                <li className="flex items-center gap-2">
                                    <HiOutlineShoppingBag className="text-2xl" />
                                    <span className="relative ">Carrinho<span className='absolute -bottom-0 -left-5 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-xs'>0</span></span>
                                </li>
                            </ul>

                            {/* Aqui é o SubHeader também em mobile */}
                            <div className="pt-6 border-t border-gray-700">
                                <SubHeader />
                            </div>
                        </div>
                    </aside>
                )

                }



            </header>
            <div className="hidden md:block pt-[65px]">
                <SubHeader />
            </div>


        </>

    )
}

export default Header;