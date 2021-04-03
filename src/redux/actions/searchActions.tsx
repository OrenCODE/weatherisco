import { City } from "../../models/city.model";

export interface IsetText {
    readonly type: 'SET_TEXT',
    payload: string,
}

export interface IclearSearch {
    readonly type: 'CLEAR_SEARCH',
    payload: string,
}

export interface IclearCities {
    readonly type: 'CLEAR_CITIES',
    payload: any,
}

export interface IsetCities {
    readonly type: 'SET_CITIES',
    payload: any,
}

export interface IsetLocation {
    readonly type: 'SET_LOCATION',
    payload: {location: string, locationKey: string},
}

export interface IsetLoading {
    readonly type: 'SET_LOADING',
    payload: boolean
}

export type SearchActions = IsetCities | IsetText | IclearCities | IsetLocation | IclearSearch | IsetLoading