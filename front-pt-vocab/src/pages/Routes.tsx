import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PieChart from '../pages/Charts';
import About from '../pages/About';

const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={PieChart} />
            <Route path="/about" component={About} />
        </Switch>
    </BrowserRouter>
)

export default Routes;