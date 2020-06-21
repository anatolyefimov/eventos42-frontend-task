import React, { useEffect, useState} from 'react';

import checkSession from 'api/checkSession'
import login from 'api/login'
import logout from 'api/logout'


import './App.css';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res = await checkSession()
            console.log(res)
            setIsLoggedIn(res.statusCode === 200)
        }

        fetchData()
        
    }, [])

    return (
        isLoggedIn ? (
            <div> 
                Logged in!!!!
                <button onClick={
                    () => {
                        logout()
                    }
                }>
                    Log out
                </button>
            </div>
        ) : (
            <div>
                Not logged 
                <button onClick={ () => {
                        login({
                            "login": "efimo.tolik@gmail.com",
                            "password": "575410820u"
                        })
                            .then(res => { setIsLoggedIn(res.statusCode === 200); console.log(res); window.localStorage.setItem("sessionId", res.sessionId) })
                    }
                }>
                    log in
                </button>
            </div>
        )
        
    )
}

export default App;
