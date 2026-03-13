import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotalCartQuantity, getTotalCartPrice } from './cartSlice'
import { formatCurrency } from '../../utils/helpers'

function CartOverview() {
    const totalCartQuantity = useSelector(getTotalCartQuantity)
    const totalCartPrice = useSelector(getTotalCartPrice)

    if (!totalCartQuantity) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
            <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
                <span>{totalCartQuantity} lanches</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>
            <Link to="/cart">Abrir carrinho &rarr;</Link>
        </div>
    )
}

export default CartOverview
