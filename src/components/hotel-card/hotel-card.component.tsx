import React, { Component } from 'react';
import { Hotel } from '../../store/hotels/hotels.types';
import './hotel-card.component.css';
import { Redirect, Link } from 'react-router-dom';

interface HotelCardProps {
  hotel: Hotel
}

class HotelCard extends Component<HotelCardProps> {
  navigateToDetails() {
    return <Redirect to={`/hotel-details/${this.props.hotel.id}`} push={true} />
  }

  render() {
    return (
      <div className="landing-hotel-card">
        <div className="hotel-image-container">
          <img className="hotel-image" src={this.props.hotel.images[0]} />
        </div>
        <div className="hotel-detail-container">
          <div className="left">
            <div className="hotel-name">{this.props.hotel.name}</div>
            <div className="hotel-rating-container">
              <div className="rating-holder">{this.props.hotel.rating} <i className="fa fa-star"></i></div>
              <div className="hotel-city-desc">{this.props.hotel.city}, {this.props.hotel.country}</div>
            </div>
            <div className="hotel-desc-c">{this.props.hotel.description}</div>
          </div>
          <div className="right">
            <button className="action-button">
              <Link to={`/hotel-details/${this.props.hotel.id}`}>
                View Details
              </Link>
              </button>
            <div className="hotel-category-detail">Price Category: <span>{this.props.hotel.price_category}</span></div>
          </div>
        </div>
      </div>
    );
  }
}

 export default HotelCard
