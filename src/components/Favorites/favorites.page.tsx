import React, {useEffect, Dispatch, useState} from 'react';
import FavoriteCard from "././favorites.components/favoriteCard.component";
import {AppState} from '../../redux/reducers/rootReducer';
import {useSelector, useDispatch} from 'react-redux';
import {Favorite} from '../../models/favorite.model';
import {FavoritesActions} from '../../redux/actions/favoritesActions';
import {fetchFavoritesData} from '../../api/api';
import {CircularProgress} from '@material-ui/core';

const Favorites = () => {

    const {favorites} = useSelector((state: AppState) => state.favorites);
    const setFavorites = useDispatch<Dispatch<FavoritesActions>>();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFavoritesWeather();
    }, []);

    const setFavoritesWeather = async () => {
        const data = await fetchFavoritesData(favorites);
        setFavorites({type: 'SET_FAVORITES', payload: data});
        setLoading(false);
    }

    if (loading) {
        return (
            <div style={{textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    } else {
        return (
            <div>
                {!loading && favorites.length === 0 ? (<p className="center">You dont have favorites...</p>) : (
                    <div className="favorites-container">
                        {favorites.map((fav: Favorite, i: number) => (
                            <FavoriteCard key={fav.id} fav={fav}/>
                        ))}
                    </div>
                )}
            </div>
        );
    }
};

export default Favorites;
