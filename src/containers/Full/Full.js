import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Detail from '../../views/Detail'
import Patient from '../../views/Patient'
import Consultation from '../../views/Consultation'
import Inpatient from '../../views/Inpatient'
import AvailableBed from '../../views/AvailableBed'
import Surgery from '../../views/Surgery'
import Staff from '../../views/Staff'
import StaffDetail from '../../views/StaffDetail'
class Full extends Component {
	constructor(prop) {
		super(prop)
		this.state = {
			physician:[]
		}
	}
	render() {
		return (
			<div className="app">
				<Header />
				<div className="app-body">
					<Sidebar {...this.props} />
					<main className="main">
						<Breadcrumb />
						<Container fluid>
							<Switch>
								<Route path="/patient/:seq" name="PatientDetail" component={Detail}/>
								<Route path="/patient" name="Patient" component={Patient} />
								<Route path="/consultation" name="Consultation" component={Consultation} />
								<Route path="/inpatient/available" name="Availablebed" component={AvailableBed} />
								<Route path="/inpatient" name="Inpatient" component={Inpatient} />
								<Route path="/surgery" name="surgery" component={Surgery} />
								<Route path="/staff/:type/:seq" name="staff" component={StaffDetail} />
								<Route path="/staff" name="staff" component={Staff} />
								<Redirect from="/" to="/patient" />
							</Switch>
						</Container>
					</main>
				</div>
			</div>
		);
	}
}

export default Full;
