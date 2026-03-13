import {
    RouterProvider,
    createBrowserRouter,
    useNavigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Home from './ui/Home'
import Error from './ui/Error'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder, {
    action as createOrderAction,
} from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import { action as updateOrderAction } from './features/order/UpdateOrder'
import AppLayout from './ui/AppLayout'
import OrderList, {
    loader as orderListLoader,
    action as orderListAction,
} from './features/order/OrderList'
import Login from './features/user/Login'

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) navigate('/login')
    }, [isAuthenticated, navigate])

    return isAuthenticated ? children : null
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            {
                path: '/menu',
                element: <Menu />,
                loader: menuLoader,
                errorElement: <Error />,
            },
            { path: '/cart', element: <Cart /> },
            {
                path: '/order/new',
                element: <CreateOrder />,
                action: createOrderAction,
            },
            {
                path: '/order/:orderId',
                element: <Order />,
                loader: orderLoader,
                errorElement: <Error />,
                action: updateOrderAction,
            },
            {
                path: '/admin',
                element: (
                    <ProtectedRoute>
                        <OrderList />
                    </ProtectedRoute>
                ),
                loader: orderListLoader,
                action: orderListAction,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
