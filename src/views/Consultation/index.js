import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import ConsultationBoard from '../../components/ConsultationBoard'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import 'react-datepicker/dist/react-datepicker.css';
class Consultation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: moment(),
			doctorName: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {

	}
	handleChange(date) {
		this.setState({
			startDate: date
		});
	}
	render() {
		const data = [
			{
				"datetime": "2016-07-23 08:30:00",
				"doctor": {
					"name": "Jack"
				},
				"patient": {
					"name": "Hanrry"
				}
			},
			{
				"datetime": "2016-07-23 10:30:00",
				"doctor": {
					"name": "Jack"
				},
				"patient": {
					"name": "Muse"
				}
			}
		]
		return (
			<div className="animated fadeIn">
				<SearchBarWrapper>
					<div>Doctor name: <input type="text" onInput={(e) => this.setState({ doctorName: e.target.value})}/></div>
					<DatePickerWrapper>Day:  <DatePicker onChange={this.handleChange} selected={this.state.startDate}/></DatePickerWrapper>
					<RaisedButton label="Search" secondary={true} />
				</SearchBarWrapper>

				<ConsultationBoard Data={data} />
			</div>
		)
	}
}

export default Consultation;
const SearchBarWrapper = styled.div`
	display: flex;
	margin-bottom: 10px;
	align-items: center;
`
const DatePickerWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 0 10px;
`



