import { RECEIVED_ROOMS} from '../../constants/action-types.constants';
import { Room } from './rooms.type';

const initialState: Room[] = []

const reducer = (state = initialState, action: any) => {
  switch (action.type){
    case RECEIVED_ROOMS: 
      return [...action.rooms];
    default:
      return state;
  }
}

export { reducer as RoomsReducer }