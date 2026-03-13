import supabase from './supabase'

export async function getMenu() {
    const { data, error } = await supabase.from('menu').select('*')

    if (error) {
        console.error(error)
        throw Error('Não foi possível carregar o cardápio no momento.')
    }

    const dadosOrdenados = data.sort((a, b) => a.id - b.id)

    const cardapioFormatado = dadosOrdenados.map((lanche) => {
        return {
            ...lanche,
            ingredients: lanche.ingredients.split(','),
        }
    })

    return cardapioFormatado
}

export async function getOrder(id) {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Erro ao buscar pedido:', error)
        throw Error(`Não foi possível encontrar o pedido #${id}`)
    }

    return data
}

export async function getOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error)
        throw Error('Não foi possível carregar a lista de pedidos.')
    }

    return data
}

export async function createOrder(newOrder) {
    try {
        const pedidoParaSalvar = {
            customer: newOrder.customer,
            phone: newOrder.phone,
            address: newOrder.address,

            priority:
                newOrder.priority === 'true' || newOrder.priority === true,
            cart: newOrder.cart,
            status: 'preparing',

            estimatedDelivery: new Date(Date.now() + 40 * 60000).toISOString(),
            orderPrice: newOrder.cart.reduce(
                (soma, item) => soma + item.totalPrice,
                0
            ),
            priorityPrice: newOrder.priority ? 10 : 0,
            position: newOrder.position || '',
        }

        console.log('DADOS QUE ESTÃO INDO PARA O SUPABASE:', pedidoParaSalvar)

        const { data, error } = await supabase
            .from('orders')
            .insert([pedidoParaSalvar])
            .select()
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('DETALHE DO ERRO NO SUPABASE:', error)
        throw Error(
            'Falha ao criar o seu pedido. Verifique sua conexão e tente novamente.'
        )
    }
}

export async function updateOrder(id, updateObj) {
    const { data, error } = await supabase
        .from('orders')
        .update(updateObj)
        .eq('id', id)
        .select()
        .single()

    if (error) throw Error('Falha ao atualizar o pedido')
    return data
}
