import { useState } from 'react';

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


    return (
        <div className="flex items-center gap-10 py-2 text-gray-500 relative">
            {/* Seção de CEP */}
            <div className="ml-[18%]">
                Informe o seu CEP!
            </div>

            {/* Lista de categorias com dropdowns */}
            <ul className="flex gap-8 items-center ">
                {Object.keys(dropdownItems).map((item) => (
                    <li
                        key={item}
                        className=" group "
                        onMouseEnter={() => setActiveDropdown(item)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        {/* Item principal da categoria */}
                        <span className="cursor-pointer hover:text-gray-800 transition-colors py-3">
                            {item}
                        </span>

                        {/* Dropdown - aparece quando o item está ativo */}
                        {activeDropdown === item && (
                            <div className="absolute flex justify-center left-0 top-9 mt-1 w-full bg-white shadow-lg rounded-md z-50 border border-gray-200">
                                {
                                    // Mapeia cada item da lista de categorias
                                    categorias.map(obj => (
                                        <ul
                                            className="py-1 "
                                            key={obj.categoria}
                                        >
                                            {
                                                // Mapeia a array itens dentro de cara categoria
                                                obj.itens.map((item, index) => {
                                                    return <li
                                                        className=" w-4/5 mx-auto "
                                                    >
                                                        {<>
                                                            {index === 0 && <h3 className='font-bold text-lg px-4 py-2'>{obj.categoria}</h3>}


                                                            <p
                                                                className={`
                                                                        hover:bg-gray-100 cursor-pointer transition-colors text-md px-4 py-2
                                                                         ${index === obj.itens.length - 1 && 'underline' /* 'sublinha se for o último item' */}
                                                                `}>
                                                                {item}
                                                            </p>
                                                        </>}
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