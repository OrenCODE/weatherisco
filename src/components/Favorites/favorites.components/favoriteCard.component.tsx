import React, {Dispatch} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import {AppState} from '../../../redux/reducers/rootReducer';
import {FavoritesActions} from '../../../redux/actions/favoritesActions';
import {SearchActions} from '../../../redux/actions/searchActions';
import {dayLightIcon, dayNightIcon} from '../../Home/home.components/forecast/forecastDayIcons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {Button} from "@material-ui/core";
import {useStyles} from "./favoriteCardStyle";

export type Props = {
    fav: any
}

const FavoriteCard = ({fav}: Props) => {

    const classes = useStyles();

    const {showFahrenheit} = useSelector((state: AppState) => state.forecast);
    const deleteFavorite = useDispatch<Dispatch<FavoritesActions>>();
    const setLocation = useDispatch<Dispatch<SearchActions>>();

    const removeFavorite = (id: string) => {
        deleteFavorite({type: 'DELETE_FAVORITE', payload: id});
    };

    const redirectToForecastPage = (location: string, locationKey: string) => {
        setLocation({type: 'SET_LOCATION', payload: {location, locationKey}});
    };

    return (
        <div className={classes.root}>
            <Link to={'/'} className={classes.dayTitle}
                  onClick={() => redirectToForecastPage(fav.name, fav.id)}>{fav.name}
            </Link>
            <div>
                <div className={classes.weatherTitle}>{fav.WeatherText}</div>
                <div className={classes.weatherIcon}>
                    {fav.WeatherIcon.toString().length === 1 ? (
                        <img src={`${dayLightIcon}${fav.WeatherIcon}-s.png`}
                             alt=""
                             style={{width: '150px', marginTop: '10px'}}/>
                    ) : (
                        <img src={`${dayNightIcon}${fav.WeatherIcon}-s.png`}
                             alt=""
                             style={{width: '150px', marginTop: '10px'}}/>
                    )}
                </div>
                <div className={classes.temp}>
                    {showFahrenheit ? (
                        <p>{fav.Temperature["Imperial"].Value} <i> °{fav.Temperature["Imperial"].Unit}</i></p>
                    ) : (
                        <p>{fav.Temperature["Metric"].Value} <i> °{fav.Temperature["Metric"].Unit}</i></p>
                    )}
                </div>
                    <Button className={classes.favDel} onClick={() => removeFavorite(fav.id)}>
                        <i className="fas fa-trash fa-2x"/>
                    </Button>
            </div>
        </div>
    );
};

export default FavoriteCard
