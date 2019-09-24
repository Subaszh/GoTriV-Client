import { Route, Switch} from "react-router-dom";
import React from 'react';
import { LandingPage } from './pages/landing/landing.page';
import { HotelDetailPage } from './pages/hotel-detail/hotel-detail.page';
import { ConfirmationPage } from "./pages/confirmation/confirmation.page";

const Routes: React.SFC = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/hotel-details" component={HotelDetailPage} />
    <Route path="/confirmation" component={ConfirmationPage} />
    <Route component={() => <div>Not Found</div>} />
  </Switch>
)

export default Routes