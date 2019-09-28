import axios from 'axios';
import { REQUEST_HOTELS, RECEIVED_HOTELS, SELECT_HOTEL, ADD_HOTEL, SET_FILTERS, FILTER_AND_SORT_HOTELS } from '../../constants/action-types.constants';
import { Hotel } from './hotels.types';

const getHotels =  () => {
  return axios.get('http://localhost:3000/hotels')
}

const getHotelById = (hotelId: string) => {
  return axios.get(`http://localhost:3000/hotels/${hotelId}`)
}

export const fetchHotels = () => (dispatch: any, getState: any) => {
  if(getState().hotels.list.length === 0) {
    dispatch({type: REQUEST_HOTELS, isLoading: true});
    getHotels().then((response) => {
      dispatch({type: RECEIVED_HOTELS, hotels: response.data});
      dispatch({type: FILTER_AND_SORT_HOTELS});
    });
  }
}


export const filterHotels = (filterType: string, value: string[]) => (dispatch: any, getState: any) => {
  dispatch({type: SET_FILTERS, filterChange: { [filterType]: value }});
  dispatch({type: FILTER_AND_SORT_HOTELS});
} 

export const fetchHotelById = (hotelId: string) => (dispatch: any, getState: any) => {
  const state = getState();
  if (!state.hotels.selected) {
    dispatch({type: SELECT_HOTEL, hotelId: hotelId});
    const selectedHotel = state.hotels.list.filter((hotel: Hotel) => hotelId === hotel.id)[0];
    if (!selectedHotel) {
      dispatch({type: REQUEST_HOTELS, isLoading: true});
      getHotelById(hotelId).then(response => {
        dispatch({type: ADD_HOTEL, hotel: response.data});
      });
    }
  }
}
