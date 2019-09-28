import { combineReducers } from 'redux';
import { UserReducer, User } from './user/user.reducer';
import { Hotels } from './hotels/hotels.types';
import { HotelsReducer } from './hotels/hotels.reducer';
import { RoomsReducer } from './rooms/rooms.reducer';
import { Room } from './rooms/rooms.type';

export interface ApplicationState {
  user: User,
  hotels: Hotels,
  rooms: Room[]
}

export const rootReducer = combineReducers({
  user: UserReducer,
  hotels: HotelsReducer,
  rooms: RoomsReducer
});