import React, {Fragment} from 'react';
import Search from './home.components/search/search.component';
import Forecast from './home.components/forecast/forecast.component';
import './home.page.style.css';

const Home = () => {

    return (
        <Fragment>
            <Search/>
            <Forecast/>
        </Fragment>
    )
}

export default Home
