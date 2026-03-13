import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { deleteItem } from './cartSlice'

function DeleteItem({ burgerId }) {
    const dispatch = useDispatch()

    return (
        <Button type="small" onClick={() => dispatch(deleteItem(burgerId))}>
            Apagar
        </Button>
    )
}

export default DeleteItem
