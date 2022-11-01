import classNames from 'classnames'

import './Button.css'

export default function Button({
    onClick,
    color = 'green',
    children,
    size = 's'
}) {
    const btnClass = classNames({
        'btn': true,
        'btn--green': color === 'green',
        'btn--blue': color === 'blue',
        'btn--red': color === 'red',
        'btn--small': size === 's',
        'btn--medium': size === 'm',
    })

    return (
        <button className={btnClass} onClick={(e) => {
            e.preventDefault();
            onClick()
        }}>
            {children}
        </button>
    )
}
