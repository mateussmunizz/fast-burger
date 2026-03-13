import { useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import { formatCurrency, calcMinutesLeft } from '../../utils/helpers'
import OrderItem from './OrderItem'
import OrderProgress from './OrderProgress'

const statusTranslation = {
    preparing: 'Preparando',
    'out-for-delivery': 'Saiu para Entrega',
    delivered: 'Entregue',
    cancelled: 'Cancelado',
}
function Order() {
    const order = useLoaderData()

    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order

    const deliveryIn = calcMinutesLeft(estimatedDelivery)

    return (
        <div className="space-y-8 px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">
                    Status do Pedido #{id}
                </h2>

                <div className="space-x-2">
                    {priority && (
                        <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
                            Prioridade
                        </span>
                    )}
                    <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
                        Pedido{' '}
                        {status === 'preparing' ? 'Preparando' : 'Entregue'}
                    </span>
                </div>
            </div>

            <OrderProgress status={status} />

            <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
                <p className="font-medium">
                    {deliveryIn >= 0
                        ? `Faltam apenas ${deliveryIn} minutos! 😋`
                        : 'O pedido já deveria ter chegado! 🏁'}
                </p>
                <p className="text-xs text-stone-500">
                    (Previsão:{' '}
                    {new Date(estimatedDelivery).toLocaleTimeString()})
                </p>
            </div>

            <ul className="divide-y divide-stone-200 border-b border-t">
                {cart.map((item) => (
                    <OrderItem
                        item={item}
                        key={item.burgerId}
                        ingredients={[]}
                        isLoadingIngredients={false}
                    />
                ))}
            </ul>

            <div className="space-y-2 bg-stone-200 px-6 py-5">
                <p className="text-sm font-medium text-stone-600">
                    Preço do lanche: {formatCurrency(orderPrice)}
                </p>
                {priority && (
                    <p className="text-sm font-medium text-stone-600">
                        Preço da prioridade: {formatCurrency(priorityPrice)}
                    </p>
                )}
                <p className="font-bold">
                    Total a pagar na entrega:{' '}
                    {formatCurrency(orderPrice + priorityPrice)}
                </p>

                <div className="space-y-8 px-4 py-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-xl font-semibold">
                            Status do Pedido #{id}
                        </h2>
                    </div>

                    <OrderProgress status={status} />

                    <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5"></div>
                </div>
            </div>
        </div>
    )
}

export async function loader({ params }) {
    const order = await getOrder(params.orderId)
    return order
}

export default Order
