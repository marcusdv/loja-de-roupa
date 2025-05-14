
import { useState, useRef, useEffect } from 'react'
import { IoMdSearch } from "react-icons/io";


function InputDePesquisa() {
    const [pesquisaIsFocused, setPesquisaIsFocused] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const pesquisarRef = useRef<HTMLDivElement>(null)


    // Exemplo de recomendações (substitua por sua lógica real)
    const suggestions = [
        "Camisetas",
        "Calças jeans",
        "Tênis esportivos",
        "Acessórios",
        "Ofertas especiais"
    ].filter(item =>
        // O filter() cria um novo array apenas com os elementos que passam no teste da função callback (no caso, os que incluem o searchTerm, ignorando maiúsculas/minúsculas).
        item.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pesquisarRef.current && !pesquisarRef.current.contains(event.target as Node)) {
                setPesquisaIsFocused(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])


    return (
        <div
            className="w-4/12 relative"
            ref={pesquisarRef}
        >
            <input
                type="search"
                name="pesquisar"
                id="pesquisar"
                placeholder="O que você procura?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setPesquisaIsFocused(true)}
                className="bg-white text-black w-full p-2 outline-none "
            />
            {/* lupa do input de pesquisa */}
            <button className="hover:bg-gray-600 hover:text-white absolute right-0 text-3xl text-black h-full px-2 cursor-pointer"><IoMdSearch /></button>

            {/* Dropdown de sugestões */}
            {pesquisaIsFocused && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-200 text-black">
                    <ul className="py-1">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                onClick={() => {
                                    setSearchTerm(item)
                                    setPesquisaIsFocused(false)
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default InputDePesquisa;