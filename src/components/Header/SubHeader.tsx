import Link from 'next/link';
import { useEffect, useState } from 'react';

// Tipo para os itens dos dropdowns
type DropdownItems = {
    [key: string]: string[];
};

type categorias = {
    categoria: string;
    itens: string[];
}

function SubHeader() {
    // Estado para controlar qual dropdown está ativo
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    // Novo estado para controlar a visibilidade da animação
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    // Estado para controlar se o conteúdo do dropdown deve ser renderizado no DOM.
    // Isso permite que a animação de saída ocorra antes que o elemento seja removido.
    const [shouldRenderDropdown, setShouldRenderDropdown] = useState<string | null>(null);


    // Dados para os dropdowns - tipado com nosso tipo DropdownItems
    const dropdownItems: DropdownItems = {
        Feminino: ['Vestidos', 'Blusas', 'Calças', 'Saias', 'Casacos'],
        Masculino: ['Camisetas', 'Calças', 'Camisas', 'Bermudas', 'Blazers'],
        Infantil: ['Bebê', 'Menina', 'Menino', 'Calçados', 'Acessórios'],
        Marcas: ['Nike', 'Adidas', 'Zara', 'H&M', 'Louis Vuitton'],
        Beleza: ['Perfumes', 'Maquiagem', 'Cuidados com a Pele', 'Cabelos', 'Unhas'],
        Esporte: ['Tênis', 'Roupas', 'Acessórios', 'Equipamentos', 'Suplementos'],
        Ofertas: ['Promoções', 'Liquidação', 'Black Friday', 'Outlet', 'Cupons']
    };

    const categorias: categorias[] = [
        {
            categoria: "Calçados",
            itens: [
                "Botas",
                "Chinelos",
                "Mocassins",
                "Rasteiras",
                "Sandálias",
                "Sapatilhas",
                "Scarpins",
                "Tênis",
                "Ver tudo de Calçados"
            ]
        },
        {
            categoria: "Roupas",
            itens: [
                "Blusas e Camisetas",
                "Calças",
                "Calças Jeans",
                "Camisas",
                "Jaquetas e Casacos",
                "Macacões",
                "Moda Praia",
                "Moletons",
                "Suéteres e Cardigans",
                "Vestidos",
                "Ver tudo de Roupas"
            ]
        },
        {
            categoria: "Acessórios",
            itens: [
                "Bolsas",
                "Carteiras",
                "Cintos",
                "Mochilas",
                "Óculos",
                "Relógios",
                "Ver tudo de Acessórios"
            ]
        },
        {
            categoria: "Moda Íntima",
            itens: [
                "Calcinhas",
                "Kits",
                "Meias",
                "Pijamas e Camisolas",
                "Sutiãs",
                "Ver tudo de Moda Íntima"
            ]
        },
        {
            categoria: "Esporte",
            itens: [
                "Bermudas e shorts",
                "Bolsas e mochilas",
                "Bonés",
                "Calças e Leggings",
                "Camisetas",
                "Jaquetas e Moletons",
                "Regatas",
                "Tênis esportivo",
                "Tops",
                "Ver tudo de Esporte"
            ]
        },
        {
            categoria: "Plus Size",
            itens: [
                "Ver tudo de Plus Size"
            ]
        },
        {
            categoria: "Marcas",
            itens: [
                "Beira Rio",
                "Colcci",
                "Farm",
                "Hering",
                "Lança Perfume",
                "Modare",
                "Ramarim",
                "Santa Lolla",
                "Sawary",
                "Vizzano"
            ]
        }
    ]

    // Hook useEffect para gerenciar as transições do dropdown
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (activeDropdown) {
            // Quando um dropdown é ativado (mouseEnter), renderiza o conteúdo imediatamente
            setShouldRenderDropdown(activeDropdown);
            // Pequeno atraso para garantir que o navegador aplique a opacidade inicial (0)
            // antes de iniciar a transição para opacidade final (100) e o slide.
            timer = setTimeout(() => setIsAnimating(true), 10);
        } else {
            // Quando o dropdown é desativado (mouseLeave), inicia a animação de saída.
            setIsAnimating(false);
            // Aguarda a duração da transição (300ms) antes de remover o conteúdo do DOM,
            // garantindo que a animação de fade-out e slide-up seja completa.
            timer = setTimeout(() => setShouldRenderDropdown(null), 300);
        }

        // Função de limpeza para evitar vazamento de memória se o componente for desmontado
        // ou o activeDropdown mudar novamente antes do timeout.
        return () => clearTimeout(timer);
    }, [activeDropdown]); // O efeito é re-executado sempre que activeDropdown muda

    return (
        <div className="flex items-center gap-10 py-2 border-b border-gray-200 text-gray-500 relative">
            {/* Seção de CEP */}
            <div className="ml-[18%]">
                Informe o seu CEP!
            </div>

            {/* Lista de categorias com dropdowns */}
            <ul className="flex items-center ">
                {Object.keys(dropdownItems).map((item) => (
                    <li
                        key={item}
                        // 'group' permite que estilos de 'group-hover' sejam aplicados aos filhos
                        className="group"
                        // Eventos para controlar o estado do dropdown ao passar o mouse
                        onMouseEnter={() => setActiveDropdown(item)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        {/* Item principal da categoria */}
                        <Link href={`/products`}>
                            <span className="cursor-pointer hover:text-gray-800 transition-colors py-3 px-4">
                                {item}
                            </span>
                        </Link>

                        {/* Dropdown: Renderizado apenas se shouldRenderDropdown corresponder ao item atual.
                            A classe 'opacity-0' e 'translate-y-[30px]' (subindo de baixo) ou 'translate-y-[-10px]' (descendo de cima)
                            são aplicadas inicialmente e transicionam para 'opacity-100' e 'translate-y-0'.
                            'pointer-events-none' desabilita interações enquanto o dropdown está transparente. */}
                        {shouldRenderDropdown === item && (
                            <div className={`
                                absolute flex justify-center left-0 top-9 mt-1 w-full bg-white shadow-lg rounded-md z-50 border border-gray-200
                                transition-all duration-300 ease-out
                                ${isAnimating && activeDropdown === item ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px] pointer-events-none'}
                            `}>
                                {
                                    // Mapeia cada item da lista de categorias
                                    categorias.map(obj => (
                                        <ul
                                            key={obj.categoria}
                                        >
                                            {
                                                // Mapeia a array itens dentro de cara categoria
                                                obj.itens.map((item, index) => {
                                                    return <li
                                                        className=" w-4/5 mx-auto "
                                                        key={item}
                                                    >
                                                        {/* nomes das subcategorias */}
                                                        {index === 0 && <h3 className='font-bold text-lg px-4 py-2'>{obj.categoria}</h3>}
                                                        <Link href={`/products?categoria`}>
                                                            <p
                                                                className={`
                                                                        hover:bg-gray-100 cursor-pointer transition-colors text-md px-4 py-2
                                                                         ${index === obj.itens.length - 1 && 'underline' /* 'sublinha se for o último item' */}
                                                                `}>
                                                                {item}
                                                            </p>
                                                        </Link>
                                                    </li>;
                                                }
                                                )
                                            }
                                        </ul>
                                    ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default SubHeader;