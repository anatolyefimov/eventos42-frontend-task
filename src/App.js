import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from 'pages/Login'
import MeetUp from 'pages/MeetUp'
import PrivateRoute from 'components/PrivateRoute'
import checkSession from 'api/checkSession'

import './App.css';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res
            try {
                res = await checkSession()
            } catch (err) {
                console.error(err)
            }

            setIsLoggedIn(res.statusCode === 200)
            setIsLoaded(true)
        }

        fetchData()

    }, [])

    return (
        isLoaded && (
            <main>
                <Switch>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <PrivateRoute path='/meetup' component={MeetUp}/>

                </Switch>
            </main>
        )

    )
}

export default App;
