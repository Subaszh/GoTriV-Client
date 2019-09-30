import React, { Component } from "react";
import CheckBoxGroupComponent from '../checkbox-group/checkbox-group.component';
import './landing-filters.component.css';
import { AMENITIES_FILTER, PRICE_CATEGORY_FILTER } from '../../constants/landing-page-filter-options.constants';
import { withTranslation, WithTranslation } from 'react-i18next';

interface LandingFiltersComponentProps {
  change: Function
}

class LandingFiltersComponent extends Component<LandingFiltersComponentProps & WithTranslation> {
 
  render() {
    const {t} = this.props;
    return (
      <div>
        <h3 className="filters-main-h">{t('filters.filters')}</h3>
        <div className="landing-filter">
          <div className="landing-filter-h">{t('filters.price_category')}</div>
          <CheckBoxGroupComponent options={PRICE_CATEGORY_FILTER} change={this.props.change.bind(this, 'price_category')} />
        </div>
        <div className="landing-filter">
          <div className="landing-filter-h">{t('hotel.amenities')}</div>
          <div className="landing-filter-b">
            <CheckBoxGroupComponent options={AMENITIES_FILTER} change={this.props.change.bind(this, 'amenities')} />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(LandingFiltersComponent)