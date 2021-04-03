export interface IsetDefaultWeather {
    readonly type: 'SET_DEFAULT_WEATHER',
    payload: any,
}

export interface IsetDefaultForecast {
    readonly type: 'SET_DEFAULT_FORECAST',
    payload: any,
}

export interface IgetSelectedWeather {
    readonly type: 'GET_SELECTED_WEATHER',
    payload: any,
}

export interface IgetSelectedForecast {
    readonly type: 'GET_SELECTED_FORECAST',
    payload: any,
}

export interface IsetLoading {
    readonly type: 'SET_LOADING',
    payload: boolean,
}

export interface IsetTempetureUnit {
    readonly type: 'SET_TEMPERATURE_UNIT'
    payload: boolean,
}

export type ForecastActions = IsetDefaultForecast | IsetDefaultWeather | IgetSelectedForecast | IgetSelectedWeather | IsetLoading | IsetTempetureUnit
