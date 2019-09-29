import React, { Component } from 'react';
import './landing-sort.component.css';
import { LANDING_SORT_FILTER } from '../../constants/landing-page-filter-options.constants';
import { SortFilters } from '../../store/hotels/hotels.types';

interface LandingPageSortComponentProps {
  sort: SortFilters,
  change: Function
}

class LandingPageSortComponent extends Component<LandingPageSortComponentProps> {
  render() {
    return (
      <div className="landing-sort-c">
        <span className="landing-sort-h">
          Sort By
        </span>
        {LANDING_SORT_FILTER.map(sort => {
          return <div 
            key={`landing-sort-${sort.key}-${sort.order}`}
            className={"landing-sort-item " + ((this.props.sort.key === sort.key && this.props.sort.order === sort.order) ? 'active' : '')}
            onClick={() => this.props.change(sort)}>
            {sort.label}
          </div>
        })}
      </div>
    )
  }
}

export default LandingPageSortComponent