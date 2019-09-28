import React, { Component } from "react";
import { ApplicationState } from '../../store/index';
import { connect } from "react-redux";
import { fetchHotelById } from '../../store/hotels/hotels.action';
import { getSelectedHotel } from '../../store/hotels/hotels.reducer';
import { fetchRoomsByHotelId } from '../../store/rooms/rooms.action';
import { Room } from '../../store/rooms/rooms.type';

class HotelDetailPageComponent extends Component<any> {
  componentDidMount() {
    const hotelId = this.props && this.props.match && this.props.match.params && this.props.match.params.hotelId
    this.props.dispatch(fetchHotelById(hotelId));
    this.props.dispatch(fetchRoomsByHotelId(hotelId));
  }

  render() {
    return <div>
      {this.props.selectedHotel.name}
      <div>
        {this.props.rooms.map((room: Room) => <div>{room.id}</div>)}
      </div>
    </div>
  }
}

const mapStateToProps = ({ hotels, rooms }: ApplicationState) => ({
  selectedHotel: getSelectedHotel(hotels) || {},
  rooms
})

export const HotelDetailPage = connect(mapStateToProps)(HotelDetailPageComponent);