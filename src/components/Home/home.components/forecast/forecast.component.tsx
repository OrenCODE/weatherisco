import React, { useEffect, Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchSelectedForecast, fetchDefaultWeather, fetchDefaultForecast, fetchSelectedWeather } from '../../../../api/api';
import ForecastDay from './forecastDay/forecastDay.component';
import { AppState } from '../../../../redux/reducers/rootReducer';
import { Favorite } from '../../../../models/favorite.model';
import { ForecastActions } from '../../../../redux/actions/forecastActions';
import { FavoritesActions } from '../../../../redux/actions/favoritesActions';
import { Button } from '@material-ui/core';
import { dayLightIcon, dayNightIcon } from './forecastDayIcons'
import { FahrenheitIcon, CelsiusIcon } from './assets/index';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './forecast.style.css';

const Forecast = () => {

    const { location, defaultLocation, locationKey } = useSelector((state: AppState) => state.search);
    const { currentWeather, forecasts, showFahrenheit, loading } = useSelector((state: AppState) => state.forecast);
    const { favorites } = useSelector((state: AppState) => state.favorites);

    const getSelectedForecast = useDispatch<Dispatch<ForecastActions>>();
    const getSelectedWeather = useDispatch<Dispatch<ForecastActions>>();
    const setDefaultWeather = useDispatch<Dispatch<ForecastActions>>();
    const setDefaultForecast = useDispatch<Dispatch<ForecastActions>>();
    const setTemperatureUnit = useDispatch<Dispatch<ForecastActions>>();
    const setLoading = useDispatch<Dispatch<ForecastActions>>();

    const setFavorites = useDispatch<Dispatch<FavoritesActions>>();
    const addFavorite = useDispatch<Dispatch<FavoritesActions>>();
    const deleteFavorite = useDispatch<Dispatch<FavoritesActions>>();

    useEffect(() => {
        initializeFavorites();
        setLoading({ type: 'SET_LOADING', payload: true })
        if (location !== defaultLocation) {
            setSelectedWeather();
            setSelectedLocation();
        } else {
            getDefaultWeather();
            getDefaultForecast();
        }
        setLoading({ type: 'SET_LOADING', payload: false })
    }, []);

    const initializeFavorites = async () => {
        if (favorites !== null) {
            setFavorites({ type: 'SET_FAVORITES', payload: favorites });
        } else {
            setFavorites({ type: 'SET_FAVORITES', payload: [] });
        }
    }

    const setSelectedWeather = async () => {
        const data = await fetchSelectedWeather(locationKey);
        getSelectedWeather({ type: 'GET_SELECTED_WEATHER', payload: data });
    }

    const setSelectedLocation = async () => {
        const data = await fetchSelectedForecast(locationKey);
        getSelectedForecast({ type: 'GET_SELECTED_FORECAST', payload: data });
    }

    const getDefaultWeather = async () => {
        const data = await fetchDefaultWeather();
        setDefaultWeather({ type: 'SET_DEFAULT_WEATHER', payload: data });
    }

    const getDefaultForecast = async () => {
        const data = await fetchDefaultForecast();
        setDefaultForecast({ type: 'SET_DEFAULT_FORECAST', payload: data });
    }

    const addToFavorites = (key: string, location: string) => {
        const favorite: Favorite = { id: key, name: location };
        addFavorite({ type: 'ADD_FAVORITE', payload: favorite });
    };

    const removeFavorite = (id: string) => {
        deleteFavorite({ type: 'DELETE_FAVORITE', payload: id });
    };

    return (
        <div className="weather-container-wrapper">
            {currentWeather.map((current: any) => (
                <div key={current.EpochTime} className="weather-container">
                    <div className="current-weather-row">
                        <div className="current-weather-box">
                            <div className="weather-icon-container">
                                {current.WeatherIcon.toString().length === 1 ?
                                    (<img src={`${dayLightIcon}${current.WeatherIcon}-s.png`} alt="" className="current-weather-icon" />) :
                                    (<img src={`${dayNightIcon}${current.WeatherIcon}-s.png`} alt="" className="current-weather-icon" />)
                                }
                            </div>
                            <div className="current-weather-container">
                                <div className="location-name"> {location}</div>
                                <div className="current-weather-temp">
                                    {showFahrenheit ?
                                        (<div className="current-temp"> {current.Temperature["Imperial"].Value}
                                            <i> °{current.Temperature["Imperial"].Unit}</i>
                                        </div>) :
                                        (<div className="current-temp">{current.Temperature["Metric"].Value}
                                            <i> °{current.Temperature["Metric"].Unit}</i>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="weather-actions">
                            <div className="action-button">
                                {showFahrenheit ?
                                    (<Button className="cel-btn" onClick={() => setTemperatureUnit({ type: 'SET_TEMPERATURE_UNIT', payload: false })}>
                                        <img src={CelsiusIcon} alt=""/>
                                    </Button>) :
                                    (<Button className="fer-btn" onClick={() => setTemperatureUnit({ type: 'SET_TEMPERATURE_UNIT', payload: true })}>
                                        <img src={FahrenheitIcon} alt=""/>
                                    </Button>)
                                }
                            </div>
                            <div className="action-button">
                                {favorites.find((fav: Favorite) => fav.id === locationKey) ?
                                    (<Button className="remove-fav" onClick={() => removeFavorite(locationKey)}>
                                        <FavoriteIcon />
                                    </Button>) :
                                    (<Button className="add-fav" onClick={() => addToFavorites(locationKey, location)}>
                                        <FavoriteBorderIcon />
                                    </Button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="main-forecast">{current.WeatherText}</div>
                </div>
            ))}
            <div className="days-container">
                {!loading && forecasts.length === 0 ? (
                    <p className="center">Sorry, forecast could not be showed due to server issues.</p>) : (
                        <div>
                            <div className="forecast-container">
                                {forecasts.map((day: any) => (
                                    <ForecastDay key={day.EpochDate} day={day} />
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </div >
    )
}

export default Forecast
