import React, { Component } from "react";
import { ApplicationState } from '../../store/index';
import { connect } from "react-redux";
import { fetchHotelById } from '../../store/hotels/hotels.action';
import { getSelectedHotel } from '../../store/hotels/hotels.reducer';

class HotelDetailPageComponent extends Component<any> {
  componentDidMount() {
    const hotelId = this.props && this.props.match && this.props.match.params && this.props.match.params.hotelId
    this.props.dispatch(fetchHotelById(hotelId));
  }

  render() {
    return <div>
      {this.props.selectedHotel.name}
    </div>
  }
}

const mapStateToProps = ({ hotels }: ApplicationState) => ({
  selectedHotel: getSelectedHotel(hotels) || {}
})

export const HotelDetailPage = connect(mapStateToProps)(HotelDetailPageComponent);