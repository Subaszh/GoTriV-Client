import React, { Component } from "react";
import './confirmation.page.css';
import StorageUtils from '../../utils/storage.utils';
import { ApplicationState } from '../../store/index';
import { connect } from "react-redux";
import { Hotel } from '../../store/hotels/hotels.types';
import { fetchHotelById } from '../../store/hotels/hotels.action';
import { Room } from '../../store/rooms/rooms.type';
import { fetchRoomById } from '../../store/rooms/rooms.action';
import { getSelectedHotel } from '../../store/hotels/hotels.reducer';
import { getSelectedRoom } from '../../store/rooms/rooms.reducer';
import { CONFIRM_HOTEL_KEY, CONFIRM_ROOM_KEY } from '../../constants/action-types.constants';
import { RatingComponent } from '../../components/rating/rating.component';
import { TagComponent } from '../../components/tag/tag.component';
import { Link } from 'react-router-dom';

export class ConfirmationPageComponent extends Component<any> {
  public storage = new StorageUtils();
  public state: {[key: string]: any}  = {
    hotel: {},
    room: {}
  }

  componentDidMount() {
    const hotelId = this.props && this.props.match && this.props.match.params && this.props.match.params.hotelId;
    const roomId = this.props && this.props.match && this.props.match.params && this.props.match.params.roomId;
    this.fetchHotelIfNotExists(hotelId);
    this.fetchRoomIfNotExists(roomId);
  }

  componentWillReceiveProps(newProps: any) {
    if(this.props !== newProps) {
      this.storage.set(CONFIRM_HOTEL_KEY, newProps.hotel);
      this.storage.set(CONFIRM_ROOM_KEY, newProps.room);
      this.setState(newProps);
    }
  }

  fetchHotelIfNotExists(hotelId: string) {
    const hotel = this.storage.get(CONFIRM_HOTEL_KEY) as Hotel;
    if((hotel && hotel.id) && hotel.id === hotelId) {
      this.setState({hotel});
    } else {
      this.props.dispatch(fetchHotelById(hotelId))
    }
  }
  
  fetchRoomIfNotExists(roomId: string) {
    const room = this.storage.get(CONFIRM_ROOM_KEY) as Room;
    if((room && room.id) && room.id === roomId) {
      this.setState({room});
    } else {
      this.props.dispatch(fetchRoomById(roomId))
    }
  }

  invalidBookingConfirmation() {
    return (<div className="invalid-message-c">
      <div className="book-more">
        Invalid Booking Information. Please Contact Customer Care
        <br/>
        Click to continue <Link to="/">Search</Link> for rooms
      </div>
    </div>)
  }

  render() {
    const {hotel, room} = this.state;
    if(!(hotel && hotel.id) || !(room && room.id)) {
      return this.invalidBookingConfirmation();
    } else {
      return (
        <div className="confirmation-page-c">
          <div className="page-h">
            <div className="card-holder">
              <div className="eq-c hotel-detail">
                <div className="hotel-name">{hotel.name}</div>
                <div className="hotel-rating-container">
                  <RatingComponent rating={hotel.rating}/>
                  <div className="hotel-city-desc">{hotel.city}, {hotel.country}</div>
                  <div className="hotel-distance-c">
                    <span><span className="bold">{hotel.distance_from_venue}m</span> from the venue</span>
                  </div>
                  <div className="hotel-amenities-c">
                    <div className="amenities-h">
                      Amenities:
                    </div>
                    {(hotel.amenities || []).map((amenity: string, index: number) => (<TagComponent content={amenity} key={`amenity-${hotel.id}-${index}`}/>))}              
                  </div>    
                </div>
              </div>
              <div className="eq-c room-detail">
                <div className="room-d-name">{room.name}</div>
                <div className="room-details-desc">{room.description}</div>
                <div className="room-left-c">People/Room: <span className="bold">{room.max_occupancy}</span></div>
                <span className="room-price">$ {room.price_in_usd} <span className="italic">/night</span></span>
              </div>
              <div className="eq-c checkin-detail">
                <br/>
                Congratulations, <span className="bold">Mr.{this.props.user} ! </span> your room has been booked successfully booked.
                <br/>
                <br/>
                Please Check-in to the room by <span className="bold">12pm</span> on <span className="bold">10 Oct, 2019</span>.<br/>
                If you need any further assistance, Contact <span className="bold">Customer Care</span>
              </div>
            </div>
            <div className="book-more">
              Click to <Link to="/">Search</Link> for more rooms
            </div>
          </div>
        </div>);
    }
  }
}

const mapStateToProps = ({hotels, rooms, user}: ApplicationState) => ({
  hotel: getSelectedHotel(hotels) || {},
  room: getSelectedRoom(rooms) || {},
  user: user.username
})

export const ConfirmationPage = connect(mapStateToProps)(ConfirmationPageComponent);