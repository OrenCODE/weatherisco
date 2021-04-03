import { SearchActions } from "../actions/searchActions";
import { City } from "../../models/city.model"

type SearchState = {
    text: string,
    locationKey: string,
    defaultLocation: string,
    location: string,
    cities: City[],
    loading: boolean,
}

const initialState: SearchState = {
    text: '',
    locationKey: '215854',
    defaultLocation: 'Tel Aviv',
    location: 'Tel Aviv',
    cities: [],
    loading: false
};

const searchReducer = (state: SearchState = initialState, action: SearchActions) => {
    switch (action.type) {
        case 'SET_TEXT':
            return {
                ...state,
                text: action.payload
            };
        case 'SET_LOCATION':
            return {
                ...state,
                location: action.payload.location,
                locationKey: action.payload.locationKey,
            };
        case 'CLEAR_SEARCH':
            return {
                ...state,
                text: action.payload,
                cities: []
            };
        case 'SET_CITIES':
            return {
                ...state,
                cities: action.payload
            };
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload,
            }
        default:
            return state
    }
}

export default searchReducer