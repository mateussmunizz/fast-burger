import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchOrder() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        if (!query) return
        navigate(`/order/${query}`)
        setQuery('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Buscar pedido #..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-800 shadow-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
            />
        </form>
    )
}

export default SearchOrder
