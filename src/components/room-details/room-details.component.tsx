import { Room } from '../../store/rooms/rooms.type';
import React, { SFC } from 'react';
import './room-details.component.css';

interface RoomDetailsComponentProps {
  room: Room,
  onClick: Function
}

export const RoomDetailsComponent: SFC<RoomDetailsComponentProps> = (props) => {
  const {room, onClick} = props;
  return (<div className="room-details-c">
    <div className="room-details-h">{room.name}</div>
    <div className="room-details-b">
      <div className="room-details-desc">{room.description}</div>
      <div className="room-book-c">
        <div className="room-left-c">People/Room: <span className="bold">{room.max_occupancy}</span></div>
        <div className="room-right-c">
          <span className="room-price">$ {room.price_in_usd} <span className="italic">/night</span></span>
          <button className="action-button" onClick={() => onClick(room)}>Book Now</button>
        </div>
      </div>
    </div>
  </div>)
}