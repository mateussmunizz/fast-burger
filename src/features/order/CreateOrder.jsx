import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import EmptyCart from '../cart/EmptyCart'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false)
    const {
        username,
        status: addressStatus,
        position,
        address,
        error: errorAddress,
    } = useSelector((state) => state.user)
    const isLoadingAddress = addressStatus === 'loading'

    const navigation = useNavigation()
    const isSubmitting = navigation.state == 'submitting'

    const formErrors = useActionData()
    const dispatch = useDispatch()

    const cart = useSelector(getCart)
    const totalCartPrice = useSelector(getTotalCartPrice)
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
    const totalPrice = totalCartPrice + priorityPrice

    if (!cart.length) return <EmptyCart />

    return (
        <div className="px-4 py-6 pb-32">
            <h2 className="mb-8 text-xl font-semibold">
                Pronto para fazer o seu pedido?
            </h2>

            <Form method="POST">
                <div className="sm:item-center mb-5 flex flex-col gap-2 sm:flex-row">
                    <label className="sm:basis-40">Nome</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>

                <div className="sm:item-center mb-5 flex flex-col gap-2 sm:flex-row">
                    <label className="sm:basis-40">Número de Telefone</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {formErrors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Endereço</label>
                    <div className="grow">
                        <input
                            className={`input w-full ${!position.latitude && !position.longitude ? 'pr-36 md:pr-40' : ''}`}
                            type="text"
                            name="address"
                            disabled={isLoadingAddress}
                            defaultValue={address}
                            required
                        />
                        {addressStatus === 'error' && (
                            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                                {errorAddress}
                            </p>
                        )}
                    </div>

                    {!position.latitude && !position.longitude && (
                        <span className="absolute right-[3px] top-[34px] z-50 sm:top-[3px] md:right-[5px] md:top-[5px]">
                            <Button
                                disabled={isLoadingAddress}
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(fetchAddress())
                                }}
                            >
                                Localização atual
                            </Button>
                        </span>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        className="h-6 w-6 accent-stone-400 focus:outline-none focus:ring focus:ring-stone-400 focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Deseja dar prioridade ao seu pedido?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.longitude && position.latitude
                                ? `${position.latitude},${position.longitude}`
                                : ''
                        }
                    />
                    <Button
                        disabled={isSubmitting || isLoadingAddress}
                        type="primary"
                    >
                        {isSubmitting
                            ? 'Fazendo pedido....'
                            : `Faça seu pedido ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'true',
    }

    const errors = {}
    if (!isValidPhone(order.phone))
        errors.phone = 'Por favor, digite um número de telefone válido!'

    if (Object.keys(errors).length > 0) return errors

    const newOrder = await createOrder(order)

    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
