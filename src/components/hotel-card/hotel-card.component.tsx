import React, { Component } from 'react';
import { Hotel } from '../../store/hotels/hotels.types';

interface HotelCardProps {
  hotel: Hotel
}

class HotelCard extends Component<HotelCardProps> {
  render() {
    return (<div>{this.props.hotel.name + '    ' + this.props.hotel.distance_from_venue }</div>)
  }
}

 export default HotelCard
