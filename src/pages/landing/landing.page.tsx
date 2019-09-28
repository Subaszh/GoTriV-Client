import React, { Component } from "react";
import { ApplicationState } from "../../store";
import LandingFiltersComponent from "../../components/landing-filters/landing-filters.component";
import { connect } from "react-redux";
import HotelCard from '../../components/hotel-card/hotel-card.component';
import { fetchHotels, filterHotels, sortHotels } from '../../store/hotels/hotels.action';
import { Hotel, SortFilters } from '../../store/hotels/hotels.types';
import './landing.page.css';
import LandingPageSortComponent from '../../components/landing-sort/landing-sort.component';

interface propsFromState {
  hotels: Hotel[],
  sort: SortFilters,
  dispatch: any
}

class LandingPageComponent extends Component<propsFromState> {
  componentDidMount() {
    this.props.dispatch(fetchHotels());
  }

  onFilterChange(filterType: string, value: string[]) {
    this.props.dispatch(filterHotels(filterType, value));
  }
  
  onSortChange(sort: any) {
    this.props.dispatch(sortHotels(sort));
  }

  render() {
    const { hotels } = this.props;
    return  (
      <div className="landing-page">
        <div className="filters-container landing-container">
          <LandingFiltersComponent change={this.onFilterChange.bind(this)}/>
        </div>
        <div className="hotel-container landing-container">
          <LandingPageSortComponent sort={this.props.sort} change={this.onSortChange.bind(this)}/>
          {hotels.map(hotel => (
            <HotelCard hotel={hotel} key={hotel.id}/>
          ))}
        </div>
      </div>)
  }
}

const mapStateToProps = ({ hotels }: ApplicationState) => ({
  hotels: hotels.visibleList,
  sort: hotels.sort
})

export const LandingPage = connect(mapStateToProps)(LandingPageComponent);
