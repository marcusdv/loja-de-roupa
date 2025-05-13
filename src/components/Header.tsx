function Header() {
    return (
        <header className="flex py-4 justify-between items-center w-full px-12  shadow-sm">
            <h2 className="text-4xl">Lojas Paraibanas</h2>
            <ul className="flex gap-2 text-2xl">
                <li>Home</li>
                <li>Shop</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Cart</li>
            </ul>
        </header>
    )
}

export default Header;