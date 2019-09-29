import axios from 'axios';
import { RECEIVED_ROOMS } from '../../constants/action-types.constants';

const getRoomsByHotelId = (hotelId: string) => {
  return axios.get(`http://localhost:3000/rooms?hotel_id=${hotelId}`);
}

export const fetchRoomsByHotelId = (hotelId: string) => (dispatch: any, getState: any) => {
  const rooms = getState().rooms;
  if(rooms.length === 0 || rooms[0].hotel_id !== hotelId) {
    getRoomsByHotelId(hotelId)
      .then(response => {
        dispatch({type: RECEIVED_ROOMS, rooms: response.data});
      });
  }
};
