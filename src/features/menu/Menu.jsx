import { useLoaderData } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'
import { getSearchTerm } from '../cart/cartSlice'

export async function loader() {
    const menu = await getMenu()
    return menu
}

export default function Menu() {
    const menu = useLoaderData()
    const searchTerm = useSelector(getSearchTerm)

    const filteredMenu = menu.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const scrollToItem = (id) => {
        const element = document.getElementById(id)
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100
            window.scrollTo({ top: y, behavior: 'smooth' })
        } else {
            console.warn(
                `Atenção: Nenhum lanche encontrado com o ID ${id}. Verifique os IDs da sua API.`
            )
        }
    }

    return (
        <div className="space-y-4">
            <nav className="no-scrollbar sticky top-0 z-10 flex gap-3 overflow-x-auto whitespace-nowrap bg-stone-50 px-4 py-3 shadow-sm">
                <button
                    onClick={() =>
                        document
                            .getElementById('topo')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex-shrink-0 border-none bg-stone-200 px-4 py-2 text-sm font-bold uppercase text-stone-800 outline-none transition-all hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-none focus:ring-0 active:bg-yellow-500"
                    style={{ borderRadius: '9999px' }}
                >
                    🍔 Lanches
                </button>
                <button
                    onClick={() =>
                        document
                            .getElementById('item-11')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex-shrink-0 border-none bg-stone-200 px-4 py-2 text-sm font-bold uppercase text-stone-800 outline-none transition-all hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-none focus:ring-0 active:bg-yellow-500"
                    style={{ borderRadius: '9999px' }}
                >
                    🍟 Acompanhamentos
                </button>
                <button
                    onClick={() =>
                        document
                            .getElementById('item-14')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex-shrink-0 border-none bg-stone-200 px-4 py-2 text-sm font-bold uppercase text-stone-800 outline-none transition-all hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-none focus:ring-0 active:bg-yellow-500"
                    style={{ borderRadius: '9999px' }}
                >
                    🍦 Sobremesas
                </button>
                <button
                    onClick={() =>
                        document
                            .getElementById('item-19')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="flex-shrink-0 border-none bg-stone-200 px-4 py-2 text-sm font-bold uppercase text-stone-800 outline-none transition-all hover:bg-yellow-400 focus:bg-yellow-400 focus:outline-none focus:ring-0 active:bg-yellow-500"
                    style={{ borderRadius: '9999px' }}
                >
                    🥤 Bebidas
                </button>
            </nav>

            <ul className="divide-y divide-stone-200 px-2 pb-12">
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((burger, index) => (
                        <MenuItem
                            burger={burger}
                            key={burger.id}
                            htmlId={index === 0 ? 'topo' : `item-${burger.id}`}
                        />
                    ))
                ) : (
                    <p className="p-10 text-center font-medium text-stone-600">
                        Nenhum lanche encontrado com "{searchTerm}" 😕
                    </p>
                )}
            </ul>
        </div>
    )
}
