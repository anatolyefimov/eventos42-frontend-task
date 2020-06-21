import React from 'react'

import './Button.css'

function Button({className, title, ...props}) {
    return (
        <button className={'Button ' + className}>{title}</button>
    )
}

export default Button;