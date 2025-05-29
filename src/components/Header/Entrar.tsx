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

            <Link href="/login" className="flex items-center gap-1" >
                <IoPersonOutline className="inline text-3xl" />
                <p>Entrar</p>

            </Link>
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
                <div className="absolute z-10 w-full top-full bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-200 text-black">
                    <ul className="py-1">
                        {entrarDropItems.map((item, index) => (
                            <Link href={item.link} key={index} className="">
                                <li
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
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
        </>
    )
}

export default Entrar;