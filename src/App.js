import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from 'pages/Login';
import MeetUpsList from 'pages/MeetUpsList';
import MeetUpSettings from 'pages/MeetUpSettings';
import MeetUpVisitor from 'pages/MeetUpVisitors';
import VisitorsRegistration from 'pages/VisitorRegistration';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import MeetUpBar from 'components/MeetUpBar';
import checkSession from 'api/checkSession';

import './App.css';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let res;
            try {
                res = await checkSession();
            } catch (err) {
                console.error(err);
            }

            setIsLoggedIn(res.statusCode === 200);
            setIsLoaded(true);
        };

        fetchData();

    }, []);

    return (
        isLoaded && (
            <>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <main>
                    <Switch>
                        <Route path='/'>
                            <VisitorsRegistration />
                        </Route>
                        <Route path='/login'>
                            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                        </Route>
                        <PrivateRoute path='/meetup'>
                            <MeetUpsList />
                        </PrivateRoute>
                        <PrivateRoute path='/m/:meetUpId' >
                            <MeetUpBar />
                            <PrivateRoute path='/m/:meetUpId/settings' >
                                <MeetUpSettings />
                            </PrivateRoute>
                            <PrivateRoute path='/m/:meetUpId/visitor' >
                                <MeetUpVisitor />
                            </PrivateRoute>
                        </PrivateRoute>
                    </Switch>
                </main>
            </>
        )

    );
}

export default App;
