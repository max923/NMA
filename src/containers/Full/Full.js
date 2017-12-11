import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Detail from '../../views/Detail'
import Patient from '../../views/Patient'
import Consultation from '../../views/Consultation'

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
              <Route path="/patient/:seq" name="PatientDetail" component={Detail}/>
                <Route path="/patient" name="Patient" component={Patient}/>
                <Route path="/consultation" name="Consultation" component={Consultation}/>
                <Redirect from="/" to="/patient"/>
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
      </div>
    );
  }
}

export default Full;
