import React, { Component } from 'react';
import './hotel-config.page.css';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import { fetchHotelById, saveHotel, deleteHotel } from '../../store/hotels/hotels.action';
import { PRICE_CATEGORY_FILTER } from '../../constants/landing-page-filter-options.constants';
import { getSelectedHotel } from '../../store/hotels/hotels.reducer';
import { withRouter } from 'react-router';

class HotelConfigPageComponent extends Component<any> {
  readonly REQUIRED_FIELDS: string[] = ['name', 'description', 'city', 'country', 'distance_from_venue'];
  public isNewHotel = true;
  public state: any = {
    id: '',
    name: '',
    city: '',
    country: '',
    description: '',
    distance_from_venue: 100,
    price_category: 'low',
    amenities: [],
    rating: 0,
    images: [],
    errors: {
      name: '',
      city: '',
      country: '',
      description: '',
      distance_from_venue: ''
    }
  }

  componentDidMount() {
    const hotelId = this.props && this.props.match && this.props.match.params && this.props.match.params.hotelId;
    if(typeof hotelId === 'string') {
      this.props.dispatch(fetchHotelById(hotelId));
    }
  }

  componentWillReceiveProps(newProps: {[key: string]: any}) {
    if(this.props !== newProps && newProps.hotel) {
      this.isNewHotel = false;
      this.setState({...newProps.hotel});
    }
  }

  requiredValidateForm() {
    let valid = true;
    const {errors} = this.state;
    this.REQUIRED_FIELDS.forEach((field: string) => {
      if(!this.state[field]) {
        errors[field] = 'Should not be left empty';
        valid = false;
      }
    });
    if(!valid) {
      this.setState({...this.state, errors});
    }
    return valid;
  }

  validateForm() {
    let valid = true;
    Object.values(this.state.errors).forEach((val: any) =>{
      if (val.length > 0)  {
        valid = false;
      }
    });
    return valid;
  }

  validateLength(value: string, expectedLength: number): string {
    return value.length < expectedLength ? `Should have atleast ${expectedLength} characters` : '';
  }

  validationHandler(key: string, event: any) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors: any = this.state.errors;
    switch(name) {
      case 'name':
      case 'city':
      case 'country':
        errors[name] = this.validateLength(value, 4);
        break;
      case 'description':
        errors[name] = this.validateLength(value, 8);
        break;
      case 'distance_from_venue':
        errors[name] = (value > 0) ? '' : 'Should contain value greater than 0'
        break;
    }
    this.setState({errors, [name]: value})
  }

  submitHandler(e:any) {
    e.preventDefault();
    const hotel: any = {...this.state};
    delete hotel.errors;
    this.requiredValidateForm();
    if (this.validateForm()) {
      saveHotel(hotel).then((_hotel: any) => {
        alert('Hotel was saved successfully');
        this.props.history.push('/');
      }).catch(() => {
        alert('Changes are not saved');
      });
    }
  }

  deleteHotel(e: any) {
    e.preventDefault();
    if (this.state.id && window.confirm(`Are you sure you want to delete ${this.state.name} ?`)) {
      deleteHotel(this.state.id).then(() => {
        alert('Hotel was deleted successfully');
        this.props.history.push('/');
      });
    }
  }

  render() {
    return (
      <section className="hotel-config-c route-h">
        <h3 className="hotel-config-hd">Hotel Configuration</h3>
        <div className="hotel-config-bd">
          <form className="hotel-form" noValidate>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-input">
                <input type="text" className="form-control"
                  name="name"  value={this.state.name} onChange={this.validationHandler.bind(this, 'name')}/>
                {(this.state.errors.name.length > 0) ? <div className="error-c">* {this.state.errors.name}</div> : ''}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-input">
                <input type="text" className="form-control"
                  name="description"  value={this.state.description} onChange={this.validationHandler.bind(this, 'description')}/>
                {(this.state.errors.description.length > 0) ? <div className="error-c">* {this.state.errors.description}</div> : ''}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="city">City</label>
              </div>
              <div className="form-input">
                <input type="text" className="form-control"
                  name="city"  value={this.state.city} onChange={this.validationHandler.bind(this, 'city')}/>
                {(this.state.errors.city.length > 0) ? <div className="error-c">* {this.state.errors.city}</div> : ''}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="country">Country</label>
              </div>
              <div className="form-input">
                <input type="text" className="form-control"
                  name="country"  value={this.state.country} onChange={this.validationHandler.bind(this, 'country')}/>
                {(this.state.errors.country.length > 0) ? <div className="error-c">* {this.state.errors.country}</div> : ''}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="distance_from_venue">Distance from Venue</label>
              </div>
              <div className="form-input">
                <input type="number" className="form-control"
                  name="distance_from_venue"  value={this.state.distance_from_venue} onChange={this.validationHandler.bind(this, 'distance_from_venue')}/>
                {(this.state.errors.distance_from_venue.length > 0) ? <div className="error-c">* {this.state.errors.distance_from_venue}</div> : ''}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="price_category">Price Category</label>
              </div>
              <div className="form-input">
                <select className="form-control"
                  name="price_category"  value={this.state.price_category} onChange={this.validationHandler.bind(this, 'price_category')}>
                    {PRICE_CATEGORY_FILTER.map((op) => {
                      return <option value={op.key} key={`form-price-op-${op.key}`}>{op.label}</option>
                    })}
                </select>
              </div>
            </div>
            <button className="action-button"
              disabled={!this.validateForm()}
              onClick={this.submitHandler.bind(this)}>
                Save
            </button>
            { !this.isNewHotel ?

              (<button className="action-button danger" onClick={this.deleteHotel.bind(this)}>
                  Delete
              </button>) : ''
            }
          </form>
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ hotels }: ApplicationState) => ({
  hotel: getSelectedHotel(hotels) || {}
})

export const HotelConfigPage = withRouter<any, any>(connect(mapStateToProps)(HotelConfigPageComponent));