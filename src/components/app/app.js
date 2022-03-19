import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';
import PeoplePage from "../pages/people-page";
import PlanetsPage from "../pages/planets-page";
import StarshipsPage from "../pages/starships-page";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {PersonDetails, PlanetDetails, StarshipDetails} from "../sw-components";
import PageNotFound from "../page-not-found/page-not-found";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService()
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={ this.state.swapiService } >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={ this.onServiceChange }/>

              <RandomPlanet />

              <Routes>
                <Route path="/" element={<h2>Welcome to StartDB React Application</h2>} />
                {/*<Route path="/people" element={<PeoplePage />}  />*/}
                <Route path="/people">
                  <Route path=":id" element={<PeoplePage />} />
                  <Route path="" element={<PeoplePage />} />
                </Route>

                <Route path="/planets" element={<PlanetsPage />} />
                <Route path="/planets/:id" element={<PlanetDetails />} />

                <Route path="/starships" element={<StarshipsPage />} />
                <Route path="/starships/:id" element={<StarshipDetails />} />

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
