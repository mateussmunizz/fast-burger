import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import CreateUser from '../features/user/CreateUser'
import Button from '../ui/Button'

function Home() {
    const username = useSelector((state) => state.user.username)

    return (
        <div className="w-full max-w-2xl rounded-xl bg-stone-900 p-8 text-center shadow-2xl md:p-16">
            <div className="w-full max-w-2xl rounded-xl bg-stone-900 p-10 text-center shadow-2xl md:p-16">
                <h1 className="mb-8 text-xl font-semibold text-stone-100 md:text-4xl">
                    A melhor Hamburgueria da ZN.
                    <br />
                    <span className="text-yellow-400">
                        Da chapa diretamente para você.
                    </span>
                </h1>

                {username === '' ? (
                    <div className="flex flex-col items-center space-y-8">
                        <CreateUser />

                        <Link
                            to="/menu"
                            className="group flex items-center gap-2 rounded-full border-2 border-stone-700 bg-red-500 px-6 py-3 text-sm font-bold uppercase tracking-widest text-stone-300 transition-all hover:border-yellow-400 hover:text-yellow-400 active:scale-95"
                        >
                            Ver Cardápio Completo
                        </Link>
                    </div>
                ) : (
                    <Button to="/menu" type="primary">
                        Continuar pedindo, {username}
                    </Button>
                )}
            </div>

            <div className="mt-16 flex flex-col items-center gap-6 border-t border-stone-200 pt-10 text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-stone-500">
                    Nossas Redes Socais
                </p>

                <div className="flex gap-12">
                    <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-stone-500 transition-all"
                    >
                        <FaWhatsapp className="h-10 w-10 text-stone-400 transition-colors group-hover:text-[#25D366]" />
                        WhatsApp
                    </a>

                    <a
                        href="https://instagram.com/fastburger011"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-stone-500 transition-all"
                    >
                        <FaInstagram className="h-10 w-10 text-stone-400 transition-colors group-hover:text-[#E4405F]" />
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Home
