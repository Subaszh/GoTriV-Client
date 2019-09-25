import React,{ Component } from "react";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { fetchHotels } from '../../store/hotels/hotels.action';
import { Hotel } from '../../store/hotels/hotels.types';

interface propsFromState {
  hotels: Hotel[],
  dispatch: any
}

class LandingPageComponent extends Component<propsFromState> {
  componentDidMount() {
    this.props.dispatch(fetchHotels());
  }

  render() {
    const { hotels } = this.props;
    return  hotels.map(hotel => (
      <div key={hotel.id}>{hotel.id},  {hotel.city + ', ' + hotel.country}</div>
    ));
  }
}

const mapStateToProps = ({ hotels }: ApplicationState) => ({
  hotels: hotels.list
})

export const LandingPage = connect(mapStateToProps)(LandingPageComponent);
