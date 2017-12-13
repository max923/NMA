import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import fetchApiData from '../../model/Api'
import DialogModal from '../../components/DialogModal'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import _ from 'lodash'
class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			patientData: {},
			seq: props.match.params.seq,
			illnessData: [],
			allergyData: [],
			physician: []
		}
	}
	componentDidMount() {
		this.fetchPatient()
		this.fetchPhysician()
	}
	fetchPhysician() {
		fetchApiData('/physician', 'GET')
			.then(({ data }) => {
				this.setState({ physician: data })
			})
	}
	fetchPatient() {
		fetchApiData(`/patient/${this.state.seq}`, 'GET')
			.then(({ data }) => {
				this.setState({ patientData: data })
			})
	}
	handleIllnessBtn() {
		fetchApiData(`/patient/illness?patientSeq=${this.state.seq}`, 'GET')
			.then(({ data }) => {
				this.setState({ illnessData: data })
			})
	}
	handleAllergyBtn() {
		fetchApiData(`/patient/allergy?patientSeq=${this.state.seq}`, 'GET')
			.then(({ data }) => {
				this.setState({ allergyData: data })
			})
	}
	deleteDoctor() {
		fetchApiData(`/patient/doctor?patientSeq=${this.state.seq}`, 'DELETE')
			.then(({ data }) => {
				this.fetchPatient()
			})
	}
	mappingTitle(title) {
		switch (title) {
			case 'ssn':
				return 'SSN'
				break;
			case 'name':
				return 'Name'
				break;
			case 'gender':
				return 'Gender'
				break;
			case 'birth':
				return 'Birth'
				break;
			case 'address':
				return 'Address'
				break;
			case 'tel':
				return 'Tel'
				break;
			case 'bloodType':
				return 'Blood Type'
				break;
			case 'riskHeartDisease':
				return 'Risk of Heart Disease'
				break;
			default:
				return title
				break;
		}
	}
	render() {
		const data = this.state.patientData
		if (data === {}) return <div>Loading</div>
		return (
			<div className="animated fadeIn">
				<BtnWrapper>
					<DialogModal
						title="Illness"
						btnText="See illness"
						handleClick={() => this.handleIllnessBtn()}
					>
						<ul>
							{
								_.isEmpty(this.state.illnessData)
									? 'None illness'
									: this.state.illnessData.map(({ illness }) => (
										<li>
											<div>Descrilition: {illness.description}</div>
											<div>Name: {illness.name}</div>
										</li>
									))
							}
						</ul>
					</DialogModal>
					<DialogModal
						title="Allergy"
						btnText="See allergy"
						handleClick={() => this.handleAllergyBtn()}
					>
						<ul>
							{
								_.isEmpty(this.state.allergyData)
									? 'None allergy'
									: this.state.allergyData.map(({ allergy }) => (
										<li>
											Name: {allergy.name}
										</li>
									))
							}
						</ul>
					</DialogModal>
				</BtnWrapper>

				<ItemsWrapepr>
					{
						Object.keys(data).map((key, index) => {
							if (_.isEmpty(data[key]) || _.isNull(data[key])) return ''

							switch (key) {
								case 'primaryDoctor':
									return (
										<div>

											<Title>Primary doctor  <button onClick={() => this.deleteDoctor()}>Remove Doctor</button></Title>
											<PrimaryDoctorItemWrapper>
												<PrimaryDoctorItem>
													<span>Name: </span>{data[key]['employee']['name']}
												</PrimaryDoctorItem>
												<PrimaryDoctorItem>
													<span>Gender: </span>{data[key]['employee']['name'] === 'M' ? 'Male' : 'Female'}
												</PrimaryDoctorItem>
												<PrimaryDoctorItem>
													<span>Address: </span>{data[key]['employee']['address']}
												</PrimaryDoctorItem>
												<PrimaryDoctorItem>
													<span>Tel: </span>{data[key]['employee']['tel']}
												</PrimaryDoctorItem>
												<PrimaryDoctorItem>
													<span>SSN: </span>{data[key]['employee']['ssn']}
												</PrimaryDoctorItem>
												<PrimaryDoctorItem>
													<span>Annual salary: </span>{data[key]['annualSalary']}
												</PrimaryDoctorItem>
												<PrimaryDoctorItem>
													<span>Specialty: </span>{data[key]['specialty']}
												</PrimaryDoctorItem>

											</PrimaryDoctorItemWrapper>
										</div>

									)
									break;
								case 'idl':
								case 'hdl':
									return (
										<div>
											<span>{key.toUpperCase()}: </span>
										</div>
									)
									break;
								default:
									return (
										<Item>
											<span>{this.mappingTitle(key)}: </span>
											{data[key]}
										</Item>
									)
									break;
							}
						})
					}
				</ItemsWrapepr>
			</div>
		)
	}
}

export default Detail;
const ItemsWrapepr = styled.ul`
	display: flex;
	flex-wrap: wrap;
	background: #fff;
    padding: 15px 15px 15px 50px;
    margin: 0;
`
const Item = styled.li`
	width: 50%;
	margin: 10px 0;
	font-size: 15px;
`
const BtnWrapper = styled.div`
	display: flex;
`
const PrimaryDoctorItemWrapper = styled.ul`
	display: flex;
	flex-wrap: wrap;
`
const PrimaryDoctorItem = styled.li`
	width: 33%;
	margin: 5px 0;
`
const Title = styled.p`
	margin-bottom: 10
`

