import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: localStorage.getItem('isAdmin') === 'true',
    error: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { email, password } = action.payload

            const EMAIL_CORRETO = 'adm@fb.com'
            const SENHA_CORRETA = 'adm123'

            if (
                email.trim() === EMAIL_CORRETO &&
                password.trim() === SENHA_CORRETA
            ) {
                state.isAuthenticated = true
                state.error = ''
                localStorage.setItem('isAdmin', 'true')
            } else {
                state.error = 'Credenciais inválidas!'
            }
        },
        logout(state) {
            state.isAuthenticated = false
            localStorage.removeItem('isAdmin')
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
