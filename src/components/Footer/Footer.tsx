import { TiSocialInstagram, TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";

function Footer() {
    return (
        <footer className=" text-gray-400 text-xs pt-12 bg-gray-900 mt-5 pb-10 flex-grow">
            <div className="w-2/4 mx-auto flex justify-between">

                {/* Primeira coluna */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sm">Sobre</h3>
                    {
                        ['Sobre nós', 'Nossa missão', 'Blog', 'Sustentabilidade', 'Parceiros'].map((item, index) => (
                            <p key={index}>{item}</p>
                        ))
                    }
                </div>

                {/* Segunda coluna */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sm">Ajuda</h3>

                    {
                        ['Ajuda', 'Como comprar', 'Envio e entrega', 'Devoluções', 'Segurança'].map((item, index) => (
                            <p key={index}>{item}</p>
                        ))
                    }
                </div>

                {/* Terceira coluna */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sm">Contatos</h3>

                    {
                        ['Carreiras', 'Termos de uso', 'Privacidade', 'Contato', 'Mapa do site'].map((item, index) => (
                            <p key={index}>{item}</p>
                        ))
                    }
                </div>

                {/* Quarta coluna */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sm">Central de ajuda</h3>
                    <button className="bg-transparent border border-gray-400 p-2 mt-2 cursor-pointer hover:bg-gray-400 hover:text-gray-900">Ajuda aqui!</button>
                </div>

                {/* Quinta coluna */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-sm">Redes sociais</h3>
                    <div className="flex gap-2">
                        {
                            [
                                { icon: <TiSocialInstagram /> },
                                { icon: <TiSocialFacebook /> },
                                { icon: <TiSocialLinkedin /> },
                                { icon: <TiSocialTwitter /> }
                            ].map((item, index) => (
                                <div key={index} className="text-xl border border-gray-400 rounded-full p-1 hover:bg-gray-400 hover:text-gray-900 cursor-pointer">{item.icon}</div>
                            ))
                        }
                    </div>
                </div>


            </div>
            <div className="text-center mt-8">

                <p>Desenvolvido por <a href="https://github.com/marcusdv" target="_blank" className="text-blue-500 hover:underline">marcusdv</a></p>
            </div>
        </footer>
    )
}

export default Footer;