import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homescreen from './Homescreen';
import Mainscreen from './Mainscreen';

const Routes:React.FC = () => {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        getName();
    }, [])

    // getting name from homescreen and sending it to Mainscreen
    const getName = () => {
        setName(localStorage.getItem('name') || '')
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={(props) => <Homescreen getName={getName} {...props} />} />
                <Route exact path="/mainscreen" render={() => <Mainscreen user={name} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;