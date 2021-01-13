import axios from "axios";

const API_URL = 'https://dsdeliver-sds2-2021.herokuapp.com';
const mapboxToken = process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX;
export function fetchOrders(){
    return axios(`${API_URL}/orders`)
}

export function confirmDelivery(orderId: number){
    return axios.put(`${API_URL}/orders/${orderId}/delivered`)
}

// export function fetchLocalMapBox(local: string){
//     return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`);
// }

// export function saveOrder(payload: OrderPayload){
//     return axios.post(`${API_URL}/orders`, payload);
// }