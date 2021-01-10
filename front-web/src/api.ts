import axios from "axios";

const API_URL = 'https://dsdeliver-sds2-2021.herokuapp.com';
const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;
export function fetchProducts(){
    console.log(axios(`${API_URL}/products`))
    return axios(`${API_URL}/products`)
}

export function fetchLocalMapBox(local: string){
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`);
}