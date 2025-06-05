function EmailForm() {
    return (
        <div className='flex flex-col gap-8 border border-gray-400 p-10 md:w-3/4 w-5/6 items-center'>
            <h2 className='text-xl md:text-2xl font-bold'>Cadastre-se para receber ofertas e descontos exclusivos</h2>
            <ul className='flex flex-col lg:flex-row gap-2  w-full'>
                <li className=""><input type="text" placeholder='Nome' className='border rounded-sm border-slate-400 py-4 px-2 w-full text-lg' /></li>
                <li className=""><input type="text" placeholder='Digite seu e-mail' className='border rounded-sm border-slate-400 p-4 w-full px-2 text-lg' /></li>
                <li className=""><input type="text" placeholder='Categoria ' className='border rounded-sm border-slate-400 p-4 px-2 w-full text-lg' /></li>
            </ul>
            <p className="text-sm md:text-md">
                <input className="mr-2" type="checkbox" name="concordo com os termos" id="concorco_politica_privacidade" />
                Concordo em receber <b>ofertas e novidades</b> da loja Salpatos por <b>e-mail</b> conforme a <span className='text-orange-500'>Política de privacidade</span>
            </p>
            <button className='rounded-sm text-white bg-orange-500 py-3 w-full md:w-1/5 text-xl'>ENVIAR</button>
        </div>


    )
}

export default EmailForm;