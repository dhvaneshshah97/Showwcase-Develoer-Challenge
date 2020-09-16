import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homescreen from './Homescreen';
import Mainscreen from './Mainscreen';


const Routes = () => {
    const [name, setName] = useState<string>('Default user');

    const getName = (val: string) => {
        setName(val);   
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={(props) => <Homescreen getName={getName} {...props}  />} />
                <Route exact path="/mainscreen" render={() => <Mainscreen user={name} /> }  />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;