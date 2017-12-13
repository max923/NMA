import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import ConsultationBoard from '../../components/ConsultationBoard'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import fetchApiData from '../../model/Api'
import 'react-datepicker/dist/react-datepicker.css';
class Consultation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false,
			searchConsultationDate: null,
			reservationDate: null,
			physician: [],
			doctorSeq: 'default',
			reservationDoctorSeq: 'default',
			reservationPhysician: [],
			reservationPatientSeq: 'default',
			reservationPatients: [],
			consultationList: null
		};
	}
	componentDidMount() {
		fetchApiData('/physician', 'get')
			.then(({ data }) => {
				this.setState({ physician: data })
			})
	}
	handleOpen() {
		this.setState({ open: true });
	}
	handleClose() {
		this.setState({ open: false });
	}
	handlReservationDateTime(dateTime) {
		//2018-08-12 09:20:00
		const formateDateTime = dateTime.format('YYYY-MM-DD HH:mm:ss')
		fetchApiData(`/physician/available?datetime=${formateDateTime}`, 'get')
			.then(({ data }) => {
				this.setState({
					reservationDate: dateTime,
					reservationPhysician: data
				})
			})
		fetchApiData(`/patient/available?datetime=${formateDateTime}`, 'get')
			.then(({ data }) => {
				this.setState({
					reservationDate: dateTime,
					reservationPatients: data
				})
			})
	}
	handleSearchBtn() {
		fetchApiData(`/consultation?${this.state.doctorSeq !== 'default' ? `doctorSeq=${this.state.doctorSeq}` : ''}${this.state.searchConsultationDate ? `&date=${this.state.searchConsultationDate.format('YYYY-MM-DD')}` : ''}`, 'get')
			.then(({ data }) => {
				this.setState({ consultationList: data })
			})
	}
	handleReservationBtn() {
		const consultationData = {
			"patientSeq": this.state.reservationPatientSeq!== 'default' ? this.state.reservationPatientSeq : null ,
			"doctorSeq": this.state.reservationDoctorSeq !== 'default' ? this.state.reservationDoctorSeq : null,
			"datetime": this.state.reservationDate ? this.state.reservationDate.format('YYYY-MM-DD HH:mm:ss'): null
		}
		fetchApiData(`/consultation`, 'post', consultationData)
			.then((data) => {
				if (data.code === 200) this.handleClose()
			})
	}
	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={() => this.handleClose()}
			/>,
			<FlatButton
				label="Reservation"
				primary={true}
				onClick={() => this.handleReservationBtn()}
			/>,
		];
		return (
			<div className="animated fadeIn">
				<RaisedButton label='Reservation' onClick={() => this.handleOpen()} />
				<Dialog
					title='Reservation consultation'
					actions={actions}
					modal={true}
					open={this.state.open}
				>
					<div>
						<DatePickerWrapper>Date:
							<DatePicker
								showTimeSelect
								dateFormat="YYYY-MM-DD HH:mm:ss"
								timeFormat="HH:mm"
								timeIntervals={15}
								onChange={(date) => this.handlReservationDateTime(date)}
								selected={this.state.reservationDate} />
						</DatePickerWrapper>

						<SelectDoctorWrapepr>
							<span>Doctor: </span>
							<DropDownMenu maxHeight={300} value={this.state.reservationDoctorSeq} onChange={(event, index, value) => this.setState({ reservationDoctorSeq: value })}>
								<MenuItem value='default' primaryText='Choose doctor' disabled />
								{
									this.state.reservationPhysician.map((element, index) => (
										<MenuItem value={element.employee.seq} key={index} primaryText={element.employee.name} />
									))
								}
							</DropDownMenu>
						</SelectDoctorWrapepr>
						<SelectPatientWrapepr>
							<span>Patient: </span>
							<DropDownMenu maxHeight={300} value={this.state.reservationPatientSeq} onChange={(event, index, value) => this.setState({ reservationPatientSeq: value })}>
								<MenuItem value='default' primaryText='Choose patient' disabled />
								{
									this.state.reservationPatients.map((element, index) => (
										<MenuItem value={element.seq} key={`patient${index}`} primaryText={element.name} />
									))
								}
							</DropDownMenu>
						</SelectPatientWrapepr>
					</div>
				</Dialog>
				<SearchBarWrapper>
					<SelectDoctorWrapepr>
						<span>Doctor:</span>
						<DropDownMenu maxHeight={300} value={this.state.doctorSeq} onChange={(event, index, value) => this.setState({ doctorSeq: value })}>
							<MenuItem value='default' primaryText='Choose doctor' disabled />
							{
								this.state.physician.map((element, index) => (
									<MenuItem value={element.seq} key={`doctor${index}`} primaryText={element.employee.name} />
								))
							}
						</DropDownMenu>
					</SelectDoctorWrapepr>
					<DatePickerWrapper>Date:  <DatePicker dateFormat="YYYY-MM-DD" onChange={(date) => this.setState({ searchConsultationDate: date })} selected={this.state.searchConsultationDate} /></DatePickerWrapper>
					<RaisedButton label="Search" secondary={true} onClick={() => this.handleSearchBtn()} style={{ marginLeft: '10px' }} />
				</SearchBarWrapper>
				<ConsultationBoard Data={this.state.consultationList} />
			</div>
		)
	}
}

export default Consultation;
const SearchBarWrapper = styled.div`
	display: flex;
	margin-bottom: 10px;
	align-items: center;
	padding: 15px;
	background: #fff;
`
const DatePickerWrapper = styled.div`
	display: flex;
	align-items: center;
`
const SelectDoctorWrapepr = styled.div`
	display: flex;
	align-items: center;
`
const SelectPatientWrapepr = styled.div`
display: flex;
align-items: center;
`



