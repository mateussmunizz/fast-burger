function OrderProgress({ status }) {
    const steps = {
        preparing: '33%',
        'out-for-delivery': '66%',
        delivered: '100%',
        cancelled: '0%',
    }

    if (status === 'cancelled') {
        return (
            <div className="rounded-md bg-red-100 p-3 text-center text-sm font-bold text-red-700">
                ❌ Este pedido foi cancelado/recusado pelo restaurante.
            </div>
        )
    }

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase text-stone-500 sm:text-xs">
                <span
                    className={status === 'preparing' ? 'text-yellow-600' : ''}
                >
                    👨‍🍳 Preparando
                </span>
                <span
                    className={
                        status === 'out-for-delivery' ? 'text-blue-600' : ''
                    }
                >
                    🛵 Saiu para entrega
                </span>
                <span
                    className={status === 'delivered' ? 'text-green-600' : ''}
                >
                    ✅ Entregue
                </span>
            </div>
            <div className="h-3 w-full rounded-full bg-stone-200">
                <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                    style={{ width: steps[status] || '0%' }}
                ></div>
            </div>
        </div>
    )
}

export default OrderProgress
