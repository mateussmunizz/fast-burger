import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateName } from './userSlice'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (!username) return
        dispatch(updateName(username))
        navigate('/menu')
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="mb-4 text-lg font-medium text-stone-300">
                Bem-vindo! Por favor, diga seu nome:
            </p>

            <input
                type="text"
                placeholder="Seu nome completo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input mb-8 w-72 w-full rounded-full border border-stone-200 bg-stone-100 px-4 py-3 text-sm text-stone-800 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-offset-2 sm:px-6 sm:py-4 md:w-72"
            />

            {username !== '' && (
                <div>
                    <button
                        type="primary"
                        className="mb-8 w-72 rounded-full border border-amber-200 bg-amber-500 px-4 py-3 text-sm text-stone-800 transition-colors duration-300 placeholder:text-stone-400 hover:bg-amber-400 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-offset-2 sm:px-6 sm:py-4"
                    >
                        Comece a fazer o seu pedido
                    </button>
                </div>
            )}
        </form>
    )
}

export default CreateUser
