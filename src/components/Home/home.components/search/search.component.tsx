import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../../redux/reducers/rootReducer';
import { SearchActions } from '../../../../redux/actions/searchActions';
import { ForecastActions } from '../../../../redux/actions/forecastActions';
import { fetchCities, fetchSelectedWeather, fetchSelectedForecast } from '../../../../api/api';
import { CircularProgress } from '@material-ui/core';
import { City } from '../../../../models/city.model';
import debounce from 'debounce';
import './Search.css'

const Search = () => {

    const { text, cities, loading } = useSelector((state: AppState) => state.search);

    const setText = useDispatch<Dispatch<SearchActions>>();
    const setLoading = useDispatch<Dispatch<SearchActions>>();
    const setLocation = useDispatch<Dispatch<SearchActions>>();
    const setCities = useDispatch<Dispatch<SearchActions>>();
    const clearSearch = useDispatch<Dispatch<SearchActions>>();
    const getSelectedWeather = useDispatch<Dispatch<ForecastActions>>();
    const getSelectedForecast = useDispatch<Dispatch<ForecastActions>>();

    const handleSetText = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText({ type: 'SET_TEXT', payload: value });
        if (value.length === 0) {
            clearSearch({ type: 'CLEAR_SEARCH', payload: '' })
        }
        if (value.length > 0) {
            setLoading({ type: 'SET_LOADING', payload: true });
            await debounceCitiesSearch(value);
        }
    }

    const debounceCitiesSearch = debounce(async (value: string) => {
        const data = await fetchCities(value);
        setCities({ type: 'SET_CITIES', payload: data })
        setLoading({ type: 'SET_LOADING', payload: false });
    }, 400)

    const suggestionSelected = (location: string, locationKey: string) => {
        setText({ type: 'SET_TEXT', payload: location })
        setLocation({ type: 'SET_LOCATION', payload: { location, locationKey } })
        getWeather(locationKey);
        getForecast(locationKey);
        clearSearch({ type: 'CLEAR_SEARCH', payload: '' })
    }

    const getWeather = async (locationKey: string) => {
        const data = await fetchSelectedWeather(locationKey)
        getSelectedWeather({ type: 'GET_SELECTED_WEATHER', payload: data })
    }

    const getForecast = async (locationKey: string) => {
        const data = await fetchSelectedForecast(locationKey)
        getSelectedForecast({ type: 'GET_SELECTED_FORECAST', payload: data })
    }

    const renderSuggestions = () => {
        if (cities.length === 0) {
            return null;
        }
        return (
            <ul>
                {cities.map((item: City) =>
                    <li key={item.Key}
                        onClick={() => suggestionSelected(item.LocalizedName, item.Key)}>{item.LocalizedName}
                    </li>)}
            </ul>
        )
    };


    return (
        <div className="search-container">
            <div className="search">
                <input value={text} onChange={handleSetText} type="text" placeholder="Search Cities" />
                {loading ? <div className="progress-container">
                    <CircularProgress />
                </div> : null}
                {cities.length === 0 && text !== '' && !loading ? (<p>City not found...</p>) : null}
                {renderSuggestions()}
            </div>
        </div>
    );
};

export default Search