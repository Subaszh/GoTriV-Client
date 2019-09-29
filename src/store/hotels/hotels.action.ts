import axios from 'axios';
import { REQUEST_HOTELS, RECEIVED_HOTELS, SELECT_HOTEL, ADD_HOTEL, SET_FILTERS, FILTER_AND_SORT_HOTELS, SORT_HOTELS } from '../../constants/action-types.constants';
import { Hotel } from './hotels.types';
import { HOST_URL } from '../../constants/environment.constants';

export const saveHotel = (hotel: any): Promise<any> => {
  if (hotel.id) {
    return axios.patch(`${HOST_URL}/hotels/${hotel.id}`, hotel)
  } else {
    return axios.post(`${HOST_URL}/hotels`, hotel)
  }
}

export const deleteHotel = (hotelId: string): Promise<any> => {
  return axios.delete(`${HOST_URL}/hotels/${hotelId}`)
}

const getHotels =  () => {
  return axios.get(`${HOST_URL}/hotels`)
}

const getHotelById = (hotelId: string) => {
  return axios.get(`${HOST_URL}/hotels/${hotelId}`)
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

export const sortHotels = (sort: any) => (dispatch: any, getState: any) => {
  dispatch({type: SORT_HOTELS, ...sort});
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
