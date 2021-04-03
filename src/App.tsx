import React, {useEffect, useRef, useState} from 'react';
import {AppState} from "./redux/reducers/rootReducer";
import {useSelector} from "react-redux";
import Favorites from './components/Favorites/favorites.page';
import Home from './components/Home/home.page';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import BackgroundComponent from "./components/background.component";
import './App.css';

import Navbar from "./components/Navbar/navbar.component";

const App = () => {

    const {weatherDate} = useSelector((state: AppState) => state.forecast);
    const [backgroundColor, setBackgroundColor] = useState('');

    const usePrevious = (value: any) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;

    }
    const prevWeatherDate = usePrevious(weatherDate);

    useEffect(() => {
        if (prevWeatherDate !== weatherDate) {
            getBackground(weatherDate);
        }
    }, [prevWeatherDate, weatherDate]);

    const getBackground = (date: string) => {
        console.log(date)
        const now = Date.parse(date);
        const offset = (new Date()).getTimezoneOffset() * 60;
        const d = new Date((now + offset) * 1000);
        console.log(now);
        const hour = d.getHours();
        console.log(hour);
        if (hour <= 7 || hour > 18) {
            console.log('here')
            setBackgroundColor('blue');
        }else if (hour > 7 && hour <= 15) {
            setBackgroundColor('green');
        } else {
            console.log('here')
            setBackgroundColor('orange');
        }
    }

    return (
        <Router>
            <BackgroundComponent bgImage={backgroundColor}>
                <Navbar/>
                <div className="wrapper">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/favorites' component={Favorites}/>
                    </Switch>
                </div>
            </BackgroundComponent>
        </Router>
    );
};

export default App;

