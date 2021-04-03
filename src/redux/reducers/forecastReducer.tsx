import { ForecastActions } from '../actions/forecastActions';

type ForecastState = {
    currentWeather: any[],
    weatherDate: string,
    forecasts: any[],
    loading: boolean,
    showFahrenheit: boolean,
}

const initialState: ForecastState = {
    currentWeather: [],
    weatherDate: '',
    forecasts: [],
    loading: false,
    showFahrenheit: false,
};

const forecastReducer = (state: ForecastState = initialState, action: ForecastActions) => {
    switch (action.type) {
        case 'SET_DEFAULT_WEATHER':
            return {
                ...state,
                currentWeather: action.payload,
                weatherDate: action.payload[0].LocalObservationDateTime,
                loading: false
            };
        case 'SET_DEFAULT_FORECAST':
            return {
                ...state,
                forecasts: action.payload,
                loading: false
            };
        case 'GET_SELECTED_WEATHER':
            return {
                ...state,
                currentWeather: action.payload,
                weatherDate: action.payload[0].LocalObservationDateTime,
                loading: false
            };
        case 'GET_SELECTED_FORECAST':
            return {
                ...state,
                forecasts: action.payload,
                loading: false
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'SET_TEMPERATURE_UNIT':
            return {
                ...state,
                showFahrenheit: action.payload
            };
        default:
            return state
    }
}

export default forecastReducer
