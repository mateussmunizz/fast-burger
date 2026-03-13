import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from './authSlice'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Pegamos o estado do Redux
    const { isAuthenticated, error } = useSelector((state) => state.auth)

    // SE o isAuthenticated mudar para true, o React nos leva para o admin automaticamente
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin', { replace: true })
        }
    }, [isAuthenticated, navigate])

    function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password) return
        dispatch(login({ email, password }))
    }

    return (
        <div className="flex h-screen items-center justify-center bg-stone-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"
            >
                <h2 className="mb-6 text-center text-2xl font-bold text-stone-800">
                    Admin Fast Burger
                </h2>

                {error && (
                    <p className="mb-4 rounded-md bg-red-100 py-2 text-center text-xs font-semibold text-red-600">
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="input w-full rounded-md border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Senha"
                        className="input w-full rounded-md border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="w-full rounded-md bg-yellow-400 py-3 font-bold uppercase transition-all hover:bg-yellow-500 active:scale-95">
                    Fazer login
                </button>
            </form>
        </div>
    )
}

export default Login
