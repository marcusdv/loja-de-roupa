function EmailForm() {
    return (
        <div className='flex flex-col gap-8 border border-gray-400 p-10 w-3/4 items-center'>
            <h2 className='text-2xl font-bold'>Cadastre-se para receber ofertas e descontos exclusivos</h2>
            <ul className='flex gap-4'>
                <li><input type="text" placeholder='Nome' className='border rounded-sm border-slate-400 p-4 w-xs text-lg' /></li>
                <li><input type="text" placeholder='Digite seu e-mail' className='border rounded-sm border-slate-400 p-4 w-xs text-lg' /></li>
                <li><input type="text" placeholder='Categoria ' className='border rounded-sm border-slate-400 p-4 w-xs text-lg' /></li>
            </ul>
            <p>
                <input className="mr-2" type="checkbox" name="concordo com os termos" id="concorco_politica_privacidade" />
                Concordo em receber <b>ofertas e novidades</b> da loja Salpatos por <b>e-mail</b> conforme a <span className='text-orange-500'>Política de privacidade</span>
            </p>
            <button className='rounded-sm text-white bg-orange-500 py-3 w-1/5 text-xl'>ENVIAR</button>
        </div>


    )
}

export default EmailForm;