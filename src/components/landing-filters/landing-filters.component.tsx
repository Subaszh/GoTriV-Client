import React, { Component } from "react";
import CheckBoxGroupComponent from '../checkbox-group/checkbox-group.component';
import './landing-filters.component.css';
import { AMENITIES_FILTER, PRICE_CATEGORY_FILTER } from '../../constants/landing-page-filter-options.constants';
import RadioButtonGroupComponent from '../radio-button-group/radio-button-group.component';

interface LandingFiltersComponentProps {
  change: Function
}

class LandingFiltersComponent extends Component<LandingFiltersComponentProps> {
  render() {
    return (
      <div>
        <h3 className="filters-main-h">Filters</h3>
        <div className="landing-filter">
          <div className="landing-filter-h">Price Category</div>
          <RadioButtonGroupComponent options={PRICE_CATEGORY_FILTER} change={this.props.change.bind(this, 'price_category')} />
        </div>
        <div className="landing-filter">
          <div className="landing-filter-h">Amenities</div>
          <div className="landing-filter-b">
            <CheckBoxGroupComponent options={AMENITIES_FILTER} change={this.props.change.bind(this, 'amenities')} />
          </div>
        </div>
      </div>
    );
  }
}

export default LandingFiltersComponent