import LinkButton from '../../ui/LinkButton'

function EmptyCart() {
    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Voltar ao menu</LinkButton>

            <p className="mt-7 font-semibold">Seu carrinho está vazio!</p>
        </div>
    )
}

export default EmptyCart
