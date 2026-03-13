import { Link } from 'react-router-dom'

function Button({ children, disabled, to, type, onClick }) {
    const base =
        'inline-block text-sm rounded-full bg-amber-500  font-semibold uppercase tracking-wide text-stone-200 transition-colors hover:bg-stone-700 focus:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-700 focus:ring-offset-2 disabled:cursor-not-allowed  '

    const styles = {
        primary: base + 'px-4 py-3 md:px-6 md:py-4',
        small: base + 'py-2 px-4 text-xs md:px-5 md:py-2.5',
        round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
        secondary:
            'px-4 py-2.5 md:px-6 text-sm text-stone-400 md:py-3.5 inline-block rounded-full border-stone-300 border-2 font-semibold uppercase tracking-wide  transition-colors hover:bg-stone-800 focus:bg-stone-700 focus:outline-none focus:ring focus:ring-stone-700 focus:ring-offset-2 disabled:cursor-not-allowed  ',
    }

    if (to)
        return (
            <Link to={to} className={styles[type]}>
                {children}
            </Link>
        )

    if (onClick)
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={styles[type]}
            >
                {children}
            </button>
        )

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

export default Button
