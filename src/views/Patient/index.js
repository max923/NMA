import React, { Component } from 'react';
import PatientBoard from '../../components/PatientBoard'
import styled from 'styled-components'
import axios from 'axios'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import fetchApiData from '../../model/Api'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import _ from 'lodash'
class Patient extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			snackbarOpen: false,
			patientData: [],
			doctorSeq: 'doctorDefault',
			illnessSeq: 'illnessDefault',
			allergySeq: 'allergyDefault',
			physician: [],
			illness: [],
			allergy: [],
			illnessRes: [],
			allergyRes: []
		};
	}
	handleOpen() {
		this.setState({ open: true });
	}
	handleClose() {
		this.setState({ open: false });
	};
	handleSubmit() {
		const data = {
			"name": this.state.name || null,
			"birth": this.state.birth ? this.state.birth.format('YYYY-MM-DD') : null,
			"ssn": this.state.ssn || null,
			"gender": this.state.gender || null,
			"address": this.state.address || null,
			"tel": this.state.tel || null,
			"bloodType": this.state.bloodType || null,
			"bloodSurger": Number(this.state.bloodSurger) || null,
			"ldl": Number(this.state.ldl) || null,
			"hdl": Number(this.state.hdl) || null,
			"triglyceride": Number(this.state.triglyceride) || null,
			"primaryDoctorSeq": this.state.doctorSeq !== 'doctorDefault' ? this.state.doctorSeq : null,
			"illnesses": this.state.illnessRes,
			"allergies": this.state.allergyRes
		}
		fetchApiData('/patient', 'post', data)
			.then(res => {
				if (res.code === 200) {
					var copyPatientData = Object.assign([], this.state.patientData);
					copyPatientData.push(res.data)
					this.setState({ patientData: copyPatientData })
					this.handleClose()
				}
			})
	}
	componentDidMount() {
		fetchApiData('/patient', 'get')
			.then(({ data }) => {
				this.setState({ patientData: data })
			})
		fetchApiData('/physician', 'get')
			.then(({ data }) => {
				this.setState({ physician: data })
			})
		fetchApiData('/symptom/illness', 'get')
			.then(({ data }) => {
				this.setState({ illness: data })
			})
		fetchApiData('/symptom/allergy', 'get')
			.then(({ data }) => {
				this.setState({ allergy: data })
			})
	}
	handleDropMenuIllness(event, index, value) {
		console.log(event)
		var copyData = Object.assign([], this.state.illnessRes);
		copyData.push(value)
		this.setState({
			illnessRes: _.uniqBy(copyData),
			snackbarOpen: true,
			illnessSeq: value
		})
	}
	handleDropMenuAllergies(value) {
		var copyData = Object.assign([], this.state.allergyRes);
		copyData.push(value)
		this.setState({
			allergyRes: _.uniqBy(copyData),
			snackbarOpen: true,
			allergySeq: value
		})
	}
	handleRequestClose() {
		this.setState({
			snackbarOpen: false,
		});
	};
	render() {
		const styles = {
			errorStyle: {
				color: orange500,
			},
			underlineStyle: {
				borderColor: orange500,
			},
			floatingLabelStyle: {
				color: orange500,
			},
			floatingLabelFocusStyle: {
				color: blue500,
			},
		};
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={() => this.handleClose()}
			/>,
			<FlatButton
				label="Add"
				primary={true}
				onClick={() => this.handleSubmit()}
			/>,
		];
		return (
			<div className="animated fadeIn">
				<RaisedButton label='Add patient' onClick={() => this.handleOpen()} />
				<Snackbar
					open={this.state.snackbarOpen}
					message="Success Add"
					autoHideDuration={4000}
					onRequestClose={() => this.handleRequestClose()}
				/>
				<Dialog
					title='Add patient'
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<DialogContentWrapper>

						<InputWrapper>
							<span>Name: </span>
							<input type="text" onInput={e => this.setState({ name: e.target.value })} />
						</InputWrapper>
						<InputWrapper>
							<span>SSN: </span>
							<input type="text"
								maxLength={9}
								onInput={e => this.setState({ ssn: e.target.value })}
								onKeyPress={(event) => event.charCode >= 48 && event.charCode <= 57}
							/>
						</InputWrapper>
						<InputWrapper>
							<span>Birth: </span>
							<DatePicker onChange={date => this.setState({ birth: date })} selected={this.state.birth || null} />
						</InputWrapper>
						<InputWrapper>
							<span>Gender: </span>
							<label>Male: <input type="radio" name="gender" value="M" onChange={e => this.setState({ gender: e.target.value })} /></label>
							<label>Female: <input type="radio" name="gender" value="F" onChange={e => this.setState({ gender: e.target.value })} /></label>

						</InputWrapper>
						<InputWrapper>
							<span>Address: </span>
							<input type="text" onInput={e => this.setState({ address: e.target.value })} />
						</InputWrapper>
						<InputWrapper>
							<span>Tel: </span>
							<input type="tel" onInput={e => this.setState({ tel: e.target.value })} />
						</InputWrapper>
						<InputWrapper>
							<span>BloodType: </span>
							<label>A: <input type="radio" name="bloodType" value="A" onChange={e => this.setState({ bloodType: e.target.value })} /></label>
							<label>B: <input type="radio" name="bloodType" value="B" onChange={e => this.setState({ bloodType: e.target.value })} /></label>
							<label>AB: <input type="radio" name="bloodType" value="AB" onChange={e => this.setState({ bloodType: e.target.value })} /></label>
							<label>O: <input type="radio" name="bloodType" value="O" onChange={e => this.setState({ bloodType: e.target.value })} /></label>
						</InputWrapper>
						<InputWrapper>
							<span>BloodSurger: </span>
							<input type="text" onInput={e => this.setState({ bloodSurger: e.target.value })} />
						</InputWrapper>
						<InputWrapper>
							<span>LDL: </span>
							<input type="text" onInput={e => this.setState({ ldl: e.target.value })} />
						</InputWrapper>
						<InputWrapper>
							<span>HDL: </span>
							<input type="text" onInput={e => this.setState({ hdl: e.target.value })} />
						</InputWrapper>
						<InputWrapper>
							<span>Triglyceride: </span>
							<input type="text" onInput={e => this.setState({ triglyceride: e.target.value })} />
						</InputWrapper>
						<InputWrapper>
							<span>Primary Doctor: </span>
							<div>
								<DropDownMenu
									maxHeight={300}
									value={this.state.doctorSeq}
									style={{ minWidth: '150px' }}
									onChange={(event, index, value) => this.setState({ doctorSeq: value })}
								>
									<MenuItem value="doctorDefault" primaryText="Choose doctor" disabled />
									{
										this.state.physician.map((element, index) => (
											<MenuItem value={element.employee.seq} key={index} primaryText={element.employee.name} />
										))
									}
								</DropDownMenu>
							</div>
						</InputWrapper>
						<InputWrapper>
							<span>Illnesses: </span>
							<div>
								<DropDownMenu
									maxHeight={300}
									value={this.state.illnessSeq}
									style={{ minWidth: '150px' }}
									onChange={(event, index, value) => this.handleDropMenuIllness(event, index, value)}
								>
									<MenuItem value="illnessDefault" primaryText="Choose illnesses" disabled />
									{
										this.state.illness.map((element, index) => (
											<MenuItem value={element.seq} key={index} primaryText={element.name} />
										))
									}
								</DropDownMenu>
							</div>
							<br />

						</InputWrapper>
						<InputWrapper>
							<span>Allergies: </span>
							<div>
								<DropDownMenu
									maxHeight={300}
									value={this.state.allergySeq}
									style={{ minWidth: '150px' }}
									onChange={(event, index, value) => this.handleDropMenuAllergies(value)}
								>
									<MenuItem value="allergyDefault" primaryText="Choose allergy" disabled />
									{
										this.state.allergy.map((element, index) => (
											<MenuItem value={element.seq} key={index} primaryText={element.name} />
										))
									}
								</DropDownMenu>
							</div>
						</InputWrapper>
					</DialogContentWrapper>
				</Dialog>
				<PatientBoard data={this.state.patientData} />
			</div>
		)
	}
}

export default Patient;
const DialogContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 50%;
	margin-bottom: 10px;
	padding: 0 5px;
	> span {
		width: 150px;
		display: inline-block;
	}
	> label{
		margin-right: 5px;
	}
`


