import { Favorite } from "../../models/favorite.model";

export interface IsetFavorites {
    readonly type: 'SET_FAVORITES',
    payload: any,
}

export interface IaddFavorites {
    readonly type: 'ADD_FAVORITE',
    payload: Favorite,
}

export interface IdeleteFavorite {
    readonly type: 'DELETE_FAVORITE',
    payload: string,
}

export type FavoritesActions = IsetFavorites | IdeleteFavorite | IaddFavorites
