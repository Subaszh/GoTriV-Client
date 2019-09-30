import React, { Component } from 'react';
import { Hotel } from '../../store/hotels/hotels.types';
import './hotel-card.component.css';
import { Redirect, Link } from 'react-router-dom';
import { RatingComponent } from '../rating/rating.component';
import { withTranslation, WithTranslation } from 'react-i18next';

interface HotelCardProps {
  hotel: Hotel
}

class HotelCard extends Component<HotelCardProps & WithTranslation> {
  navigateToDetails() {
    return <Redirect to={`/hotel-details/${this.props.hotel.id}`} push={true} />
  }

  render() {
    const {hotel, t} = this.props
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
                {t('common.view_details')}
              </Link>
              </button>
            <div className="hotel-category-detail">{t('filters.price_category')}: <span>{hotel.price_category}</span></div>
            <div className="hotel-distance-c">
              <span><span className="bold">{hotel.distance_from_venue}m</span> {t('common.from_the_venue')} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

 export default withTranslation()(HotelCard)
