import { RECEIVED_ROOMS, SELECT_ROOM, ADD_ROOM } from '../../constants/action-types.constants';
import { Room } from './rooms.type';

const initialState: Room[] = []

const reducer = (state = initialState, action: any) => {
  switch (action.type){
    case RECEIVED_ROOMS: 
      return [...action.rooms];
    // case SELECT_ROOM:
    //   return {...state, selected: action.roomId};
    // case ADD_ROOM:
      // return addRoomsReducer(state, action.room);
    default:
      return state;
  }
}

export { reducer as RoomsReducer }