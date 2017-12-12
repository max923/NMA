import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import fetchApiData from '../../model/Api'
import DialogModal from '../../components/DialogModal'
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
		fetchApiData(`/patient/${this.state.seq}`,'get')
			.then(({ data }) => {
				fetchApiData('/physician','get')
					.then(({ data }) => {
						this.setState({ physician: data })
					})
				this.setState({ patientData: data })
			})
	}
	handleIllnessBtn() {
		const seq = this.props.match.params.seq
		fetchApiData(`/patient/illness?patientSeq=${seq}`,'get')
			.then(({ data }) => {
				this.setState({ illnessData: data })
			})
	}
	handleAllergyBtn() {
		const seq = this.props.match.params.seq
		fetchApiData(`/patient/allergy?patientSeq=${seq}`,'get')
			.then(({ data }) => {
				this.setState({ allergyData: data })
			})
	}
	render() {
		const data = this.state.patientData
		if (data === {}) return <div>Loading</div>
		return (
			<div className="animated fadeIn">
				<DialogModal
					title="Illness"
					btnText="See illness"
					handleClick={() => this.handleIllnessBtn()}
				>
					{
						_.isEmpty
							? 'None illness'
							: this.illnessData.illnesses.map(element => (
								<div>
									<p>Doctor name: {element.doctor.name}</p>
									<p>Patient name: {element.name}</p>
									<p>Description: {element.description}</p>
									<p>Date: {element.dateDiagnosis}</p>
								</div>
							))
					}
				</DialogModal>
				<DialogModal
					title="Allergy"
					btnText="See allergy"
					handleClick={() => this.handleAllergyBtn()}
				>
					{
						_.isEmpty
							? 'None allergy'
							: this.allergyData.allergy.map(element => (
								<div>
									<p>Doctor name: {element.doctor.name}</p>
									<p>Patient name: {element.name}</p>
									<p>Description: {element.description}</p>
									<p>Date: {element.dateDiagnosis}</p>
								</div>
							))
					}
				</DialogModal>
				<ItemsWrapepr>
					{
						Object.keys(data).map((key, index) => {
							if (_.isEmpty(data[key]) || _.isNull(data[key])) return ''

							switch (key) {
								case 'primaryDoctor':
									return (
										<div>
											<h5>Primary doctor</h5>
											<ul>
												<li>
													<span>Name: </span>{data[key]['employee']['name']}
												</li>
												<li>
													<span>Gender: </span>{data[key]['employee']['name'] === 'M' ? 'Male' : 'Female'}
												</li>
												<li>
													<span>Address: </span>{data[key]['employee']['address']}
												</li>
												<li>
													<span>Tel: </span>{data[key]['employee']['tel']}
												</li>
												<li>
													<span>SSN: </span>{data[key]['employee']['ssn']}
												</li>
												<li>
													<span>Annual salary: </span>{data[key]['annualSalary']}
												</li>
												<li>
													<span>Specialty: </span>{data[key]['specialty']}
												</li>
												<li>
													<span>Specialty: </span>{data[key]['specialty']}
												</li>


											</ul>
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
											<span>{key}: </span>
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
`
const Item = styled.li`
	width: 50%;
`

