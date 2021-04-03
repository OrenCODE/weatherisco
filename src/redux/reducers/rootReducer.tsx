import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import forecastReducer from './forecastReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
    search: searchReducer,
    forecast: forecastReducer,
    favorites: favoritesReducer,
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer;