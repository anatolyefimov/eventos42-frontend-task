import  React from 'react'

import './Input.css'

function Input({className, ...props}) {

    return (
        <input className={'Input ' + className} {...props} />
    );
}

export default Input;