import React, { Component } from "react";
import { ApplicationState } from '../../store/index';
import { connect } from "react-redux";
import { fetchHotelById } from '../../store/hotels/hotels.action';
import { getSelectedHotel } from '../../store/hotels/hotels.reducer';
import { fetchRoomsByHotelId } from '../../store/rooms/rooms.action';
import './hotel-detail.page.css';
import { RatingComponent } from '../../components/rating/rating.component';
import { TagComponent } from '../../components/tag/tag.component';
import { Room } from '../../store/rooms/rooms.type';
import { RoomDetailsComponent } from '../../components/room-details/room-details.component';
import { withRouter } from 'react-router';
import StorageUtils from '../../utils/storage.utils';
import { CONFIRM_HOTEL_KEY, CONFIRM_ROOM_KEY } from "../../constants/action-types.constants";

class HotelDetailPageComponent extends Component<any> {
  public state = { activeImage: '' };
  public storage = new StorageUtils();
  
  componentDidMount() {
    const hotelId = this.props && this.props.match && this.props.match.params && this.props.match.params.hotelId
    this.props.dispatch(fetchHotelById(hotelId));
    this.props.dispatch(fetchRoomsByHotelId(hotelId));
    this.setState({})
  }

  getBackGroundImageStyle(src: string) {
    return {
      backgroundImage: `url(${src})`,
      backgroundSize: '100%'
    }
  }

  setActiveImage(src: string) {
    this.setState({activeImage: src});
  }

  onRoomSelect(room: Room) {
    this.storage.set(CONFIRM_HOTEL_KEY, this.props.hotel);
    this.storage.set(CONFIRM_ROOM_KEY, room);
    this.props.history.push(`/confirmation/${this.props.hotel.id}/${room.id}`);
  }

  render() {
    const {hotel, rooms} = this.props;
    return (
      <section className="hotel-details-c">
        <div className="left-c">
          <div className="img-p-c">
            {(hotel.images || []).map((image: string, index: number) => 
            <div className="img-p-h"
              key={`${hotel.id}-image-${index}`} 
              style={this.getBackGroundImageStyle(image)}
              onMouseEnter={this.setActiveImage.bind(this, image)}
            ></div>)}
          </div>
          <div className="act-img-c">
            <img className="act-img" src={this.state.activeImage || (hotel.images || [])[0]} alt=""/>
          </div>
        </div>
        <div className="right-c">
          <div className="hotel-name">{hotel.name}</div>
          <div className="hotel-rating-container">
            <RatingComponent rating={hotel.rating}/>
            <div className="hotel-city-desc">{hotel.city}, {hotel.country}</div>
          </div>
          <div className="hotel-desc-c">{hotel.description}</div>
          <div className="hotel-amenities-c">
            <div className="amenities-h">
              Amenities:
            </div>
            {(hotel.amenities || []).map((amenity: string, index: number) => (<TagComponent content={amenity} key={`amenity-${hotel.id}-${index}`}/>))}              
          </div>    
          <div className="hotel-distance-c">
            <span>Distance: <span className="bold">{hotel.distance_from_venue}m</span> from the venue</span>
          </div>
          <div className="hotel-rooms-c">
            {(rooms || []).map((room: Room) => <RoomDetailsComponent key={`room-detail-${room.id}`} room={room}  onClick={this.onRoomSelect.bind(this)}/>)}
          </div>
          <div className="hotel-review-c">
            <div className="hotel-review-hd">Ratings & Reviews</div>
            <div className="review-hd">
              <RatingComponent rating={4.5} /> One of the Best Hotels in Town
            </div>
            <div className="review-bd">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="review-hd">
              <RatingComponent rating={4.1} /> Had the Best stay here !!!!
            </div>
            <div className="review-bd">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div className="hotel-review-ft">
              See All Reviews (1,345)
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ hotels, rooms }: ApplicationState) => ({
  hotel: getSelectedHotel(hotels) || {},
  rooms: rooms.list
});

export const HotelDetailPage = withRouter<any, any>(connect(mapStateToProps)(HotelDetailPageComponent));
