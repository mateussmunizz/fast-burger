import { useFetcher, useLoaderData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOrders, updateOrder } from '../../services/apiRestaurant'
import { formatCurrency } from '../../utils/helpers'
import { logout } from '../user/authSlice'

function OrderList() {
    const orders = useLoaderData()
    const fetcher = useFetcher()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="px-4 py-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-stone-800">
                    Pedidos Realizados (Admin)
                </h2>
                <button
                    onClick={handleLogout}
                    className="w-full rounded-md border border-stone-300 bg-red-600 px-4 py-2 text-xs font-bold uppercase text-stone-100 transition-all hover:bg-red-700 active:scale-95 sm:w-auto"
                >
                    Sair do Painel 🚪
                </button>
            </div>

            <ul className="divide-y divide-stone-200">
                {orders.map((order) => (
                    <li
                        key={order.id}
                        className="mb-3 flex flex-col gap-4 rounded-lg border border-stone-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between md:gap-0"
                    >
                        <div className="grow">
                            <p className="font-medium text-stone-800">
                                Pedido #{order.id} - {order.customer}
                                {order.priority && (
                                    <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase text-red-700">
                                        Prioridade
                                    </span>
                                )}
                            </p>

                            <ul className="mt-1 text-xs text-stone-500">
                                {order.cart.map((item, index) => (
                                    <li
                                        key={`${order.id}-${item.burgerId}-${index}`}
                                    >
                                        {item.quantity}x {item.name}
                                    </li>
                                ))}
                            </ul>

                            <p className="mt-1 text-xs italic text-stone-400">
                                <span
                                    className={`font-bold ${
                                        order.status === 'delivered'
                                            ? 'text-green-600'
                                            : order.status ===
                                                'out-for-delivery'
                                              ? 'text-blue-600'
                                              : order.status === 'cancelled'
                                                ? 'text-red-600'
                                                : 'text-stone-600'
                                    }`}
                                >
                                    {order.status === 'preparing' &&
                                        'Preparando'}
                                    {order.status === 'out-for-delivery' &&
                                        'Saiu para Entrega'}
                                    {order.status === 'delivered' && 'Entregue'}
                                    {order.status === 'cancelled' &&
                                        'Cancelado'}
                                </span>{' '}
                                •{' '}
                                {new Date(
                                    order.created_at
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 border-t border-stone-100 pt-3 md:flex-row md:items-center md:gap-6 md:border-none md:pt-0">
                            <p className="text-lg font-bold text-stone-800">
                                {formatCurrency(
                                    order.orderPrice + order.priorityPrice
                                )}
                            </p>

                            <div className="flex gap-2">
                                {order.status === 'preparing' && (
                                    <>
                                        <fetcher.Form
                                            method="PATCH"
                                            className="grow md:grow-0"
                                        >
                                            <input
                                                type="hidden"
                                                name="orderId"
                                                value={order.id}
                                            />
                                            <input
                                                type="hidden"
                                                name="status"
                                                value="out-for-delivery"
                                            />
                                            <button className="flex w-full items-center justify-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-[10px] font-bold uppercase text-white transition-all hover:bg-blue-700 active:scale-95 md:w-auto">
                                                <span>🛵</span> Enviar
                                            </button>
                                        </fetcher.Form>

                                        <fetcher.Form
                                            method="PATCH"
                                            className="grow md:grow-0"
                                        >
                                            <input
                                                type="hidden"
                                                name="orderId"
                                                value={order.id}
                                            />
                                            <input
                                                type="hidden"
                                                name="status"
                                                value="cancelled"
                                            />
                                            <button className="flex w-full items-center justify-center gap-1 rounded-md border border-red-200 px-3 py-2 text-[10px] font-bold uppercase text-red-600 transition-all hover:bg-red-600 hover:text-white active:scale-95 md:w-auto">
                                                ✕ Recusar
                                            </button>
                                        </fetcher.Form>
                                    </>
                                )}

                                {order.status === 'out-for-delivery' && (
                                    <fetcher.Form
                                        method="PATCH"
                                        className="w-full md:w-auto"
                                    >
                                        <input
                                            type="hidden"
                                            name="orderId"
                                            value={order.id}
                                        />
                                        <input
                                            type="hidden"
                                            name="status"
                                            value="delivered"
                                        />
                                        <button className="flex w-full items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-[10px] font-bold uppercase text-white transition-all hover:bg-green-700 active:scale-95 md:w-auto">
                                            <span>✅</span> Entregue
                                        </button>
                                    </fetcher.Form>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const id = formData.get('orderId')
    const status = formData.get('status')
    await updateOrder(id, { status })
    return null
}

export async function loader() {
    const orders = await getOrders()
    return orders
}

export default OrderList
