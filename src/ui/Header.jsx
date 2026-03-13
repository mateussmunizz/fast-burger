import { Link, useLocation } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import SearchMenu from '../ui/SearchMenu'
import Username from '../features/user/Username'

function Header() {
    const location = useLocation()

    const isMenuPage = location.pathname === '/menu'

    return (
        <header className="border-b border-stone-200 bg-stone-900 px-4 py-4 uppercase text-stone-200 sm:px-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:gap-0">
                <Link
                    to="/"
                    className="flex items-center gap-3 tracking-widest"
                >
                    <img
                        src="/logo.png"
                        alt="Fast Burger 011 Logo"
                        className="h-12 w-12 rounded-full sm:h-14 sm:w-14"
                    />
                    <span className="text-xl font-semibold sm:text-2xl">
                        Fast Burger 011
                    </span>
                </Link>

                <div className="xs:flex-row flex flex-col items-center gap-3 sm:gap-4">
                    {isMenuPage && <SearchMenu />}

                    <SearchOrder />

                    <div className="hidden sm:block">
                        <Username />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
