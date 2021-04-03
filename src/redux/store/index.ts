import { createStore, CombinedState } from 'redux';
import rootReducer, { AppState } from '../reducers/rootReducer'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { loadState, saveState } from '../../utils/localStorage.util';
import { debounce } from 'debounce';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, devToolsEnhancer({}));

store.subscribe(debounce(() => {
    saveState({favorites: store.getState().favorites} as CombinedState<AppState>);
  },1000));

export default store;