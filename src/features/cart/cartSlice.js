import { createSlice } from '@reduxjs/toolkit'

const savedCart = localStorage.getItem('cart')
const initialState = {
    cart: savedCart ? JSON.parse(savedCart) : [],
    searchTerm: '',
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(
                (item) => item.burgerId !== action.payload
            )
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.burgerId === action.payload
            )
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.burgerId === action.payload
            )
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice

            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action)

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        clearCart(state) {
            state.cart = []

            localStorage.removeItem('cart')
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },
    },
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    setSearchTerm,
} = cartSlice.actions

export default cartSlice.reducer

export const getCart = (state) => state.cart.cart
export const getSearchTerm = (state) => state.cart.searchTerm

export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCurrentQuantityById = (id) => (state) =>
    state.cart.cart.find((item) => item.burgerId === id)?.quantity ?? 0
