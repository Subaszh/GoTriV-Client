import { RECEIVED_HOTELS, SELECT_HOTEL, ADD_HOTEL } from '../../constants/action-types.constants';
import { Hotels, Hotel } from './hotels.types';

const initialState: Hotels = {selected: '', list: []};

export const getSelectedHotel = (hotels: Hotels) => {
  return hotels.list.find(hotel =>  hotel.id === hotels.selected);
}

const addHotelReducer = (state: Hotels, hotel: Hotel) => {
  const currentHotelId = state.list.findIndex((_hotel: Hotel) =>  hotel.id === _hotel.id);
  const hotels = state.list;
  if (currentHotelId !== -1) {
    return { ...state, list: [...hotels.slice(0, currentHotelId), hotel, ...hotels.slice(currentHotelId + 1)]};
  } else {
    return { ...state, list: [...hotels, hotel]};
  }
}

const reducer = (state = initialState, action: any) => {
  switch (action.type){
    case RECEIVED_HOTELS: 
      return {...state, list: action.hotels};
    case SELECT_HOTEL:
      return {...state, selected: action.hotelId};
    case ADD_HOTEL:
      return addHotelReducer(state, action.hotel);
    default:
      return state;
  }
}

export { reducer as HotelsReducer }