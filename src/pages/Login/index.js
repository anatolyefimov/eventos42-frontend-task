import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import Input from 'components/Input';
import Button from 'components/Button';
import login from 'api/login';

import './Login.css';

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    return (
        <div className='Login'>
            <form className='form' onSubmit={
                (event) => {
                    event.preventDefault();
                    login({
                        login: email,
                        password: password
                    })
                        .then((res) => res.statusCode === 200)
                        .then(logInStatus => {
                            setIsLoggedIn(logInStatus);
                            if (logInStatus) {
                                setSuccess(true);
                                setError(false);
                            } else {
                                setSuccess(false);
                                setError(true);
                            }
                        });
                }
            }>
                <Input
                    className='form__input'
                    type='email'
                    placeholder='email'
                    value={email}
                    onChange={ (event) => setEmail(event.target.value) }
                /> <br/>
                <Input
                    className='form__input'
                    type='password'
                    placeholder='пароль'
                    value={password}
                    onChange={ (event) => setPassword(event.target.value) }
                /> <br/>
                <Button
                    className='form__button'
                    title='ВОЙТИ'
                    type='submit'
                />
                { error && <div className='form__error'>Incorrect username or password</div> }
            </form>

            { success && <Redirect to='/meetup' />}
        </div>
    );
}


export default Login;
