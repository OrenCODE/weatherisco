import { AUTO_COMPLETE_API, KEY, FIVE_DAY_FORECAST_API, CURRENT_CONDITIONS_API, DEFAULT } from "../config/keys";
import { Favorite } from "../models/favorite.model";

export const fetchCities = async (value: string) => {
    try {
        const res = await fetch(`${AUTO_COMPLETE_API}?apikey=${KEY}&q=${value}&language=en-us`);
        const data = await res.json();
        console.log('SEARCH:', data)
        return data;
    } catch (err) {
        console.log("cities search error")
    }
};

export const fetchSelectedWeather = async (locationKey: string) => {
    try {
        const res = await fetch(`${CURRENT_CONDITIONS_API}${locationKey}?apikey=${KEY}&language=en-us&details=true`);
        const data = await res.json();
        console.log('SELECTED:', data)
        return data
    } catch (err) {
        console.log("daily weather fetch error")
    }
}

export const fetchSelectedForecast = async (locationKey: string) => {
    try {
        const res = await fetch(`${FIVE_DAY_FORECAST_API}${locationKey}?apikey=${KEY}&language=en-us&metric=true`);
        const data = await res.json();
        console.log('FORECAST:', data)
        return data.DailyForecasts
    } catch (err) {
        console.log("forecast fetch error")
    }
}

export const fetchDefaultWeather = async () => {
    try {
        const res = await fetch(`${CURRENT_CONDITIONS_API}${DEFAULT}?apikey=${KEY}&language=en-us&details=true`);
        const data = await res.json();
        console.log('DEFAULT:', data)
        return data
    } catch (err) {
        console.log("daily weather fetch error")
    }
}

export const fetchDefaultForecast = async () => {
    try {
        const res = await fetch(`${FIVE_DAY_FORECAST_API}${DEFAULT}?apikey=${KEY}&language=en-us&metric=true`);
        const data = await res.json();
        console.log('DEFAULT:', data)
        return data.DailyForecasts
    } catch (err) {
        console.log("forecast fetch error")
    }
}

export const fetchFavoritesData = async (favorites: Favorite[]) => {
    try {
        let favoritesWeather: any[] = [];
        for (const fav of favorites) {
            const id = fav.id;
            const res = await fetch(`${CURRENT_CONDITIONS_API}${id}?apikey=${KEY}&language=en-us&details=true`);
            const data = await res.json();
            const favWeather = Object.assign(fav, data[0]);
            favoritesWeather.push(favWeather);
        }
        return favoritesWeather;
    } catch (err) {
        console.log("favorites weather error")
    }
}
