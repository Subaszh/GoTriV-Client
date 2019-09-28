import React, { Component } from "react";
import { ApplicationState } from "../../store";
import LandingFiltersComponent from "../../components/landing-filters/landing-filters.component";
import { connect } from "react-redux";
import HotelCard from '../../components/hotel-card/hotel-card.component';
import { fetchHotels, filterHotels } from '../../store/hotels/hotels.action';
import { Hotel } from '../../store/hotels/hotels.types';
import './landing.page.css';

interface propsFromState {
  hotels: Hotel[],
  dispatch: any
}

class LandingPageComponent extends Component<propsFromState> {
  componentDidMount() {
    this.props.dispatch(fetchHotels());
  }

  onFilterChange(filterType: string, value: string[]) {
    this.props.dispatch(filterHotels(filterType, value));
  }

  render() {
    const { hotels } = this.props;
    return  (
      <div className="landing-page">
        <div className="filters-container landing-container">
          <LandingFiltersComponent change={this.onFilterChange.bind(this)}/>
        </div>
        <div className="hotel-container landing-container">
          {hotels.map(hotel => (
            <HotelCard hotel={hotel} key={hotel.id}/>
          ))}
        </div>
      </div>)
  }
}

const mapStateToProps = ({ hotels }: ApplicationState) => ({
  hotels: hotels.visibleList
})

export const LandingPage = connect(mapStateToProps)(LandingPageComponent);
