import {FavoritesActions} from '../actions/favoritesActions'

type FavoritesState = {
    favorites: any[]
}

const initialState: FavoritesState = {
    favorites: []
};

const favoritesReducer = (state: FavoritesState = initialState, action: FavoritesActions) => {
    switch (action.type) {
        case 'SET_FAVORITES':
            return {
                ...state,
                favorites: action.payload,
            };
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case 'DELETE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter((fav: { id: string; }) => fav.id !== action.payload)
            };
        default:
            return state
    }
}

export default favoritesReducer