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
        Feminino: ['Tênis', 'Sandálias', 'Botas', 'Scarpins', 'Rasteiras'],
        Masculino: ['Tênis', 'Sapatos Sociais', 'Botas', 'Chinelos', 'Mocassins'],
        Infantil: ['Tênis Infantil', 'Sandálias', 'Sapatilhas', 'Botinhas', 'Chinelos'],
        Marcas: ['Nike', 'Adidas', 'Puma', 'Vans', 'Asics'],
        Estilos: ['Casual', 'Esportivo', 'Social', 'Trilha', 'Running'],
        Lançamentos: ['Novidades', 'Mais Vendidos', 'Coleção Nova', 'Edição Limitada', 'Exclusivos'],
        Ofertas: ['Promoções', 'Descontos Progressivos', 'Frete Grátis', 'Outlet', 'Cupons']
    };

    const categorias: categorias[] = [
        {
            categoria: "Calçados Casuais",
            itens: [
                "Tênis casual",
                "Mocassins",
                "Sapatênis",
                "Slip-ons",
                "Dockside",
                "Alpargatas",
                "Sapatos Oxford",
                "Tênis plataforma",
                "Ver todos Casuais"
            ]
        },
        {
            categoria: "Calçados Sociais",
            itens: [
                "Sapatos sociais",
                "Scarpins",
                "Sapatos Monk Strap",
                "Brogues",
                "Loafers",
                "Peep toes",
                "Sapatos Derby",
                "Sapatos envernizados",
                "Ver todos Sociais"
            ]
        },
        {
            categoria: "Calçados Esportivos",
            itens: [
                "Tênis de corrida",
                "Tênis para academia",
                "Tênis para caminhada",
                "Tênis de basquete",
                "Chuteiras",
                "Tênis de skate",
                "Tênis esportivos infantis",
                "Tênis com amortecimento",
                "Ver todos Esportivos"
            ]
        },
        {
            categoria: "Sandálias e Rasteiras",
            itens: [
                "Sandálias plataforma",
                "Rasteirinhas",
                "Anabelas",
                "Papetes",
                "Tamancos",
                "Slide",
                "Gladiadoras",
                "Sandálias de tiras",
                "Ver todas Sandálias"
            ]
        },
        {
            categoria: "Botas",
            itens: [
                "Botas cano curto",
                "Botas cano longo",
                "Coturnos",
                "Chelsea boots",
                "Galochas",
                "Botas over the knee",
                "Botas tratoradas",
                "Botas texanas",
                "Ver todas Botas"
            ]
        },
        {
            categoria: "Infantil",
            itens: [
                "Ver todos Calçados Infantis"
            ]
        },
        {
            categoria: "Marcas",
            itens: [
                "Nike",
                "Adidas",
                "Puma",
                "Vans",
                "Asics",
                "Olympikus",
                "Mizuno",
                "Beira Rio",
                "Vizzano",
                "Dakota"
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
        <div className="flex flex-col md:flex-row md:items-center justify-center gap:2 md:gap-4 py-2 border-b border-gray-200 text-gray-500 relative">
            {/* Seção de CEP */}
            <div className="whitespace-nowrap hidden lg:block">
                Informe o seu CEP!
            </div>

            {/* Lista de categorias com dropdowns */}
            <ul className="flex flex-col md:flex-row  md:items-center ">
                {Object.keys(dropdownItems).map((item) => (
                    <li
                        key={item}
                        // 'group' permite que estilos de 'group-hover' sejam aplicados aos filhos
                        className="group text-xl md:text-md lg:text-lg"
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
                                absolute hidden md:flex justify-center left-0 top-9 mt-1 w-full bg-white shadow-lg rounded-md z-50 border border-gray-200
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
                                                        className=" w-4/5 mx-auto"
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