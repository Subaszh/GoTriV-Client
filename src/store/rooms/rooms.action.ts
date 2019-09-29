import axios from 'axios';
import { RECEIVED_ROOMS, SELECT_ROOM, REQUEST_ROOMS, ADD_ROOM } from '../../constants/action-types.constants';
import { Room } from './rooms.type';

const getRoomsByHotelId = (hotelId: string) => {
  return axios.get(`http://localhost:3000/rooms?hotel_id=${hotelId}`);
}

const getRoomById = (roomId: string) => {
  return axios.get(`http://localhost:3000/rooms/${roomId}`);
}

export const fetchRoomsByHotelId = (hotelId: string) => (dispatch: any, getState: any) => {
  const rooms = getState().rooms.list;
  if(rooms.length === 0 || rooms[0].hotel_id !== hotelId) {
    getRoomsByHotelId(hotelId)
      .then(response => {
        dispatch({type: RECEIVED_ROOMS, rooms: response.data});
      });
  }
};

export const fetchRoomById = (roomId: string) => (dispatch: any, getState: any) => {
  const state = getState();
  if (!state.rooms.selected) {
    dispatch({type: SELECT_ROOM, roomId: roomId});
    const selectedRoom = state.rooms.list.filter((room: Room) => roomId === room.id)[0];
    if (!selectedRoom) {
      dispatch({type: REQUEST_ROOMS, isLoading: true});
      getRoomById(roomId).then((response: any) => {
        dispatch({type: ADD_ROOM, room: response.data});
      });
    }
  }
}
