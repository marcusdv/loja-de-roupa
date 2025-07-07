import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

function Entrar({ entrarIsHovered }: { entrarIsHovered: boolean }) {
    const entrarDropItems = [
        { link: 'login', text: "Login" },
        { link: 'pedidos', text: "Meus Pedidos" },
        { link: 'enderecos', text: "Endereços" },
    ]

    return (
        <>
            {/* Icone de pessoa */}

            <ul className="flex gap-1">
                <Link href="/login" className="flex items-center gap-1" >
                    <IoPersonOutline className="inline text-3xl" />
                    <p className="hidden lg:block">Login</p>
                </Link>

                {entrarDropItems.map((item, i) => {
                    return (
                        <li key={item.link} className="flex items-center gap-1 md:hidden ">
                            <Link href={item.link} className="flex items-center gap-1"><span className={`${i === 0 ? 'hidden' : ''}`}>|</span> {item.text}</Link>
                        </li>
                    )
                })}
            </ul>

            <div className="hidden md:block">
                {/* Define icone seta para baixoou para cima */}
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
                            {entrarDropItems.map((item, index) => (
                                <Link href={item.link} key={index} className="">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors "
                                        onClick={() => {
                                        }}
                                    >
                                        {item.text}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Entrar;