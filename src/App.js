import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import ChartWindow from "./components/ChartWindow";
import ColumnChartWidget from "./components/ColumnChartWidget";
import LineChartWidget from "./components/LineChartWidget";
import RadarChartWidget from "./components/RadarChartWidget";
import PieChartWidget from "./components/PieChartWidget";

import "./scss/app.scss";


const App = () => {
  const DASHBOARD_GRAPH_PROPS = {
    width: 450,
    height: 350,
  };

  return (
    <div className="app">
      <NavBar />
      <div className="margin-top padding-bottom container row clearfix">
        <Switch>
          <Route path="/" exact={true}>
            <h1 className="container row main-heading">Dashboard</h1>

            <ChartWindow
              dashboardName="Tasks"
              graphComponent={<ColumnChartWidget {...DASHBOARD_GRAPH_PROPS} />}
              apiSlug="tasks"
            />
            
            <ChartWindow
              dashboardName="Nationality"
              graphComponent={<PieChartWidget {...DASHBOARD_GRAPH_PROPS} />}
              apiSlug="nationality"
            />

            <ChartWindow
              dashboardName="Language skills"
              graphComponent={<RadarChartWidget {...DASHBOARD_GRAPH_PROPS} />}
              apiSlug="language"
            />

            <ChartWindow
              dashboardName="Company revenue"
              graphComponent={<LineChartWidget {...DASHBOARD_GRAPH_PROPS} />}
              apiSlug="revenue"
            />
          
          </Route>
          <Route path="/about" exact={true}>
            <div className="container row">
              <h1 className="main-heading">About</h1>
              <img src="/img/architecture.png" className="architecture-image" alt="Architecture"/>
            </div>
          </Route>
          <Route path="/contact" exact={true}>
            <div className="container row">
              <h1 className="main-heading">Contact</h1>
              <p>Content will be added...</p>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
