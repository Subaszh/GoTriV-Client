import React, { Component } from 'react';
import { Hotel } from '../../store/hotels/hotels.types';
import './hotel-card.component.css';
import { Redirect, Link } from 'react-router-dom';
import { RatingComponent } from '../rating/rating.component';

interface HotelCardProps {
  hotel: Hotel
}

class HotelCard extends Component<HotelCardProps> {
  navigateToDetails() {
    return <Redirect to={`/hotel-details/${this.props.hotel.id}`} push={true} />
  }

  render() {
    const {hotel} = this.props
    return (
      <div className="landing-hotel-card">
        <div className="hotel-image-container">
          <img className="hotel-image" src={hotel.images[0] ||  ''} alt=""/>
        </div>
        <div className="hotel-detail-container">
          <div className="left">
            <div className="hotel-name">{hotel.name}</div>
            <div className="hotel-rating-container">
              <RatingComponent rating={hotel.rating}/>
              <div className="hotel-city-desc">{hotel.city}, {hotel.country}</div>

            </div>
            <div className="hotel-desc-c">{hotel.description}</div>
          </div>
          <div className="right">
            <button className="action-button">
              <Link to={`/hotel-details/${hotel.id}`}>
                View Details
              </Link>
              </button>
            <div className="hotel-category-detail">Price Category: <span>{hotel.price_category}</span></div>
            <div className="hotel-distance-c">
              <span><span className="bold">{hotel.distance_from_venue}m</span> from the venue</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 export default HotelCard
