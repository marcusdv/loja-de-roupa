'use cliente'

import { useState, useRef, useEffect } from 'react'


import { FaRegHeart } from "react-icons/fa6";
import { TbSquareLetterMFilled } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

function Header() {
    const [isFocused, setIsFocused] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const searchRef = useRef<HTMLDivElement>(null)

    // Exemplo de recomendações (substitua por sua lógica real)
    const suggestions = [
        "Camisetas",
        "Calças jeans",
        "Tênis esportivos",
        "Acessórios",
        "Ofertas especiais"
    ].filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    return (
        <header className="flex py-4 justify-center gap-16 items-center bg-black text-white">

            {/* logo */}
            <ul className="flex gap-2 items-center">
                <TbSquareLetterMFilled className="text-5xl" />
                <h2 className="text-4xl">Modique</h2>
            </ul>

            {/* input de pesquisa */}
            <div
                className="w-4/12 relative"
                ref={searchRef}
            >
                <input
                    type="search"
                    name="pesquisar"
                    id="pesquisar"
                    placeholder="O que você procura?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="bg-white text-black w-full p-2 outline-none "
                />
                {/* lupa do input de pesquisa */}
                <button className="hover:bg-gray-600 hover:text-white absolute right-0 text-3xl text-black h-full px-2 cursor-pointer"><IoMdSearch /></button>

                {/* Dropdown de sugestões */}
                {isFocused && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-200 text-black">
                        <ul className="py-1">
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                    onClick={() => {
                                        setSearchTerm(item)
                                        setIsFocused(false)
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Parte direita */}
            <ul className="flex gap-4 items-center text-sm font-bold">
                <li className="flex items-center gap-1"><FaRegHeart className="inline text-2xl" /> Lista de Desejos</li>
                <li className="flex items-center gap-1"><IoPersonOutline className="inline text-2xl" /> Entrar <IoIosArrowDown className="inline text-2xl" /></li>
                <li><HiOutlineShoppingBag className="inline text-3xl" /></li>
            </ul>
        </header>
    )
}

export default Header;