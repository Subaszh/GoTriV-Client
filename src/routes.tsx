import { Route, Switch, Redirect} from "react-router-dom";
import React from 'react';
import { LandingPage } from './pages/landing/landing.page';
import { HotelDetailPage } from './pages/hotel-detail/hotel-detail.page';
import { ConfirmationPage } from "./pages/confirmation/confirmation.page";
import { HotelConfigPage } from './pages/hotel-config/hotel-config.page';

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/hotel-details/:hotelId" component={HotelDetailPage} />
    <Route path="/confirmation/:hotelId/:roomId" component={ConfirmationPage} />
    <Route path="/config/:hotelId" component={HotelConfigPage} />
    <Route path="/config" component={HotelConfigPage} />
    <Redirect from="*" to="/" />
  </Switch>
)

export default Routes