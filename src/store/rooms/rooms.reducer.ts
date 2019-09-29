import { RECEIVED_ROOMS, SELECT_ROOM, ADD_ROOM } from '../../constants/action-types.constants';
import { Room, Rooms } from './rooms.type';

const initialState: Rooms = {
  list: [],
  selected: ''
}

export const getSelectedRoom = (rooms: Rooms) => {
  return rooms.list.find(room => room.id === rooms.selected);
}

const addRoomReducer = (state: Rooms, room: Room) => {
  const currentRoomId = state.list.findIndex((_room: Room) =>  room.id === _room.id);
  const rooms = state.list;
  if (currentRoomId !== -1) {
    return { ...state, list: [...rooms.slice(0, currentRoomId), room, ...rooms.slice(currentRoomId + 1)]};
  } else {
    return { ...state, list: [...rooms, room]};
  }
}

const reducer = (state = initialState, action: any) => {
  switch (action.type){
    case RECEIVED_ROOMS: 
      return {...state, list: [...action.rooms]};
    case SELECT_ROOM:
      return {...state, selected: action.roomId};
    case ADD_ROOM:
      return addRoomReducer(state, action.room);
    default:
      return state;
  }
}

export { reducer as RoomsReducer }