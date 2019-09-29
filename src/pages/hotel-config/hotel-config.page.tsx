import React, { Component } from 'react';
import './hotel-config.page.css';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import { fetchHotelById, saveHotel, deleteHotel } from '../../store/hotels/hotels.action';
import { PRICE_CATEGORY_FILTER } from '../../constants/landing-page-filter-options.constants';
import { getSelectedHotel } from '../../store/hotels/hotels.reducer';
import { withRouter } from 'react-router';

class HotelConfigPageComponent extends Component<any> {
  public state = {
    id: '',
    name: '',
    city: '',
    country: '',
    description: '',
    distance_from_venue: 0,
    price_category: 'low',
    amenities: [],
    rating: 0,
    images: [],
    errors: {
      name: '',
      city: '',
      country: '',
      distance_from_venue: 0
    }
  }
  public isNewHotel = true;

  componentDidMount() {
    const hotelId = this.props && this.props.match && this.props.match.params && this.props.match.params.hotelId;
    if(typeof hotelId === 'string') {
      this.props.dispatch(fetchHotelById(hotelId));
      this.isNewHotel = false;
    }
  }

  componentWillReceiveProps(newProps: {[key: string]: any}) {
    if(this.props !== newProps && newProps.hotel) {
      this.setState({...newProps.hotel});
    }
  }

  validationHandler(key: string, event: any) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    //TODO: Form Validations
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
  })
  }

  submitHandler(e:any) {
    e.preventDefault();
    const hotel: any = {...this.state};
    delete hotel.errors;
    saveHotel(hotel).then((_hotel: any) => {
      alert('Hotel was saved successfully');
      this.props.history.push('/');
    }).catch(() => {
      alert('Changes are not saved');
    });
  }

  deleteHotel() {
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
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control"
                name="name"  value={this.state.name} onChange={this.validationHandler.bind(this, 'name')}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control"
                name="description"  value={this.state.description} onChange={this.validationHandler.bind(this, 'description')}/>
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control"
                name="city"  value={this.state.city} onChange={this.validationHandler.bind(this, 'city')}/>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" className="form-control"
                name="country"  value={this.state.country} onChange={this.validationHandler.bind(this, 'country')}/>
            </div>
            <div className="form-group">
              <label htmlFor="distance_from_venue">Distance from Venue</label>
              <input type="number" className="form-control"
                name="distance_from_venue"  value={this.state.distance_from_venue} onChange={this.validationHandler.bind(this, 'distance_from_venue')}/>
            </div>
            <div className="form-group">
              <label htmlFor="price_category">Price Category</label>
              <select className="form-control"
                name="price_category"  value={this.state.price_category} onChange={this.validationHandler.bind(this, 'price_category')}>
                  {PRICE_CATEGORY_FILTER.map((op) => {
                    return <option value={op.key} key={`form-price-op-${op.key}`}>{op.label}</option>
                  })}
              </select>
            </div>
            <button className="action-button" onClick={this.submitHandler.bind(this)}>
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