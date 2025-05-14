import { useState } from 'react';


// Tipo para os itens dos dropdowns
type DropdownItems = {
    [key: string]: string[];
};

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

    return (
        <div className="flex items-center gap-4 py-2 text-gray-500 relative">
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
                            <div className="absolute left-0 top-9 mt-1 w-screen bg-white shadow-lg rounded-md z-50 border border-gray-200">
                                <ul className="py-1">
                                    {dropdownItems[item].map((subItem) => (
                                        <li
                                            key={subItem}
                                            className="px-4 py-2 w-4/6 mx-auto hover:bg-gray-100 cursor-pointer transition-colors"
                                        >
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubHeader;