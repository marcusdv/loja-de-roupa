'use client'
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { useAuth } from "@/contexts/AuthContext";

function Entrar({ entrarIsHovered }: { entrarIsHovered: boolean }) {
    const { user, signOut } = useAuth();

    // Se o usuário estiver logado, mostra opções de usuário logado
    const entrarDropItems = user ? [
        { link: 'perfil', text: "Meu Perfil" },
        { link: 'pedidos', text: "Meus Pedidos" },
        { link: 'enderecos', text: "Endereços" },
        { action: 'logout', text: "Sair" },
    ] : [
        { link: 'login', text: "Login" },
        { link: 'cadastro', text: "Cadastrar" },
    ];

    // Função para extrair nome do usuário
    const getUserDisplayName = () => {
        if (!user) return null;
        
        if (user.user_metadata?.full_name) {
            return user.user_metadata.full_name;
        }
        
        if (user.email) {
            return user.email.split('@')[0];
        }
        
        return 'Usuário';
    };

    return (
        <>
            {/* Icone de pessoa */}
            <ul className="flex gap-1">
                {user ? (
                    // Usuário logado - mostra nome
                    <div className="flex items-center gap-1">
                        <IoPersonOutline className="inline text-3xl" />
                        <p className="hidden lg:block">Olá, {getUserDisplayName()}</p>
                    </div>
                ) : (
                    // Usuário não logado - link para login
                    <Link href="/login" className="flex items-center gap-1">
                        <IoPersonOutline className="inline text-3xl" />
                        <p className="hidden lg:block">Login</p>
                    </Link>
                )}

                {entrarDropItems.map((item, i) => {
                    if (item.link) {
                        return (
                            <li key={item.link} className="flex items-center gap-1 md:hidden">
                                <Link href={item.link} className="flex items-center gap-1">
                                    <span className={`${i === 0 ? 'hidden' : ''}`}>|</span> {item.text}
                                </Link>
                            </li>
                        );
                    } else if (item.action === 'logout') {
                        return (
                            <li key={item.action} className="flex items-center gap-1 md:hidden">
                                <button 
                                    onClick={() => signOut()} 
                                    className="flex items-center gap-1"
                                >
                                    <span className={`${i === 0 ? 'hidden' : ''}`}>|</span> {item.text}
                                </button>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>

            <div className="hidden md:block">
                {/* Define icone seta para baixo ou para cima */}
                {
                    entrarIsHovered
                        ?
                        <IoIosArrowUp className="inline text-2xl" />
                        :
                        <IoIosArrowDown className="inline text-2xl" />
                }

                {/* dropdown do entrar */}
                {entrarIsHovered && entrarDropItems.length > 0 && (
                    <div className="absolute right-0 z-10 w-full top-full bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-200 text-black min-w-fit">
                        <ul className="py-1">
                            {entrarDropItems.map((item, index) => {
                                if (item.link) {
                                    return (
                                        <Link href={item.link} key={index} className="">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors">
                                                {item.text}
                                            </li>
                                        </Link>
                                    );
                                } else if (item.action === 'logout') {
                                    return (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                            onClick={() => signOut()}
                                        >
                                            {item.text}
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Entrar;