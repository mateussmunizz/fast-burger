import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'
import { addItem, getCurrentQuantityById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

function formatIngredients(ing) {
    if (!ing) return ''
    const rawString = Array.isArray(ing) ? ing.join(', ') : String(ing)
    return rawString.replace(/[{}[\]"]/g, '').trim()
}

function MenuItem({ burger, htmlId }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = burger
    const dispatch = useDispatch()

    const currentQuantity = useSelector(getCurrentQuantityById(id))
    const isInCart = currentQuantity > 0

    function handleAddToCart() {
        const newItem = {
            burgerId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        }
        dispatch(addItem(newItem))
    }

    return (
        <li id={htmlId} className="flex scroll-mt-24 gap-4 py-3 sm:gap-6">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 w-24 rounded-lg object-cover shadow-sm transition-all duration-300 sm:h-32 sm:w-32 ${
                    soldOut ? 'opacity-70 grayscale' : ''
                }`}
            />

            <div className="flex grow flex-col pt-0.5">
                <p className="font-bold text-stone-800 sm:text-lg">{name}</p>

                <p className="text-xs capitalize italic text-stone-500 sm:text-sm">
                    {formatIngredients(ingredients)}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    {!soldOut ? (
                        <p className="text-sm font-semibold text-stone-700 sm:text-base">
                            {formatCurrency(unitPrice)}
                        </p>
                    ) : (
                        <p className="text-xs font-bold uppercase text-stone-400 sm:text-sm">
                            Esgotado
                        </p>
                    )}

                    <div className="flex items-center gap-3 sm:gap-8">
                        {isInCart && (
                            <div className="flex items-center gap-2 sm:gap-3">
                                <UpdateItemQuantity
                                    burgerId={id}
                                    currentQuantity={currentQuantity}
                                />
                                <DeleteItem burgerId={id} />
                            </div>
                        )}

                        {!soldOut && !isInCart && (
                            <Button type="small" onClick={handleAddToCart}>
                                + Adicionar
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default MenuItem
