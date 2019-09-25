import { combineReducers } from 'redux';
import { UserReducer, User } from './user/user.reducer';
import { Hotels } from './hotels/hotels.types';
import { HotelsReducer } from './hotels/hotels.reducer';

export interface ApplicationState {
  user: User,
  hotels: Hotels
}

export const rootReducer = combineReducers({
  user: UserReducer,
  hotels: HotelsReducer
});