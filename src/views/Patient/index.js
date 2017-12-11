import React, { Component } from 'react';
import PatientBoard from '../../components/PatientBoard'
import styled from 'styled-components'
import AddButton from '../../components/AddButton'
import request from 'axios'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
class Patient extends Component {
	constructor(props) {
		super(props)
		this.state = {
			addData: {
				"name": "",
				"birth": "",
				"gender": "",
				"address": "",
				"tel": "",
				"bloodType": "",
				"bloodSurger": "",
				"idl": "",
				"hdl": "",
				"triglyceride": "",
				"primaryDoctor": "",
				"illnesses": [],
				"allergies": []
			  },
			value: []
		};
	}
	componentDidMount() {
		// request.get()
	}
	render() {
		const physician = [
			{
				"annualSalary": 70000,
				"specialty": "xxxxxxxxxxx",
				"employee": {
					"seq": 2,
					"emp_no": 2,
					"ssn": "xxxxxxxxx",
					"name": "Jack",
					"gender": "M",
					"address": "xxxxxxxxx",
					"tel": "xxxxxxx"
				}
			},
			{
				"annualSalary": 70000,
				"specialty": "xxxxxxxxxxx",
				"employee": {
					"seq": 3,
					"emp_no": 3,
					"ssn": "xxxxxxxxx",
					"name": "Marry",
					"gender": "F",
					"address": "xxxxxxxxx",
					"tel": "xxxxxxx"
				}
			}
		]
		const data = {
			"seq": 1,
			"patient_no": 1,
			"name": "Jack",
			"birth": "1989-09-02",
			"gender": "M",
			"address": "xxxxxxxxxxx",
			"tel": "xxxxxxxx",
			"blood_type": "AB",
			"blood_surger": 2.7,
			"idl": 1.8,
			"hdl": 2.6,
			"triglyceride": 3.7,
			"risk_heart_disease": "L",
			"primaryDoctor": {
				"seq": 2,
				"annual_salary": 70000,
				"specialty": "xxxxxxx",
				"employee": {
					"seq": 4,
					"emp_no": 4,
					"ssn": "xxxxxxxxx",
					"name": "Jack",
					"gender": "M",
					"address": "xxxxxx",
					"tel": "xxxxxxxx"
				}
			}
		}
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
		return (
			<div className="animated fadeIn">
				<AddButton btnText="Add patient">
					<DialogContentWrapper>
						<InputWrapper>
							<span>Name: </span>
							<input type="text" onInput={ e => this.setState({name: e.target.value})}/>
						</InputWrapper>

						<InputWrapper>
							<span>Birth: </span>

						</InputWrapper>
						<InputWrapper style={{display:'flex'}}>
							<span>Gender: </span>
							<RadioButtonGroup name="shipSpeed" defaultSelected="not_light" style={{display:'flex'}}>
								<RadioButton
									value="Ｍ"
									label="Male"
									style={styles.radioButton}
								/>
								<RadioButton
									value="Ｆ"
									label="Female"
									style={styles.radioButton}
								/>
							</RadioButtonGroup>

						</InputWrapper>
						<InputWrapper>
							<span>Address: </span>
							<input type="text" onInput={ e => this.setState({address: e.target.value})}/>
						</InputWrapper>
						<InputWrapper>
							<span>Tel: </span>
							<input type="tel" onInput={ e => this.setState({tel: e.target.value})}/>
						</InputWrapper>
						<InputWrapper>
							<span>BloodType: </span>
							<input type="text" onInput={ e => this.setState({bloodType: e.target.value})}/>
						</InputWrapper>
						<InputWrapper>
							<span>BloodSurger: </span>
							<input type="text" onInput={ e => this.setState({bloodSurger: e.target.value})}/>
						</InputWrapper>
						<InputWrapper>
							<span>IDL: </span>
							<input type="text" onInput={ e => this.setState({idl: e.target.value})}/>
						</InputWrapper>
						<InputWrapper>
							<span>HDL: </span>
							<input type="text" onInput={ e => this.setState({hdl: e.target.value})}/>
						</InputWrapper>
						<InputWrapper>
							<span>Triglyceride: </span>
							<input type="text" onInput={ e => this.setState({triglyceride: e.target.value})}/>
						</InputWrapper>
						<InputWrapper>
							<span>PrimaryDoctorSeq: </span>
							<SelectField
								multiple={true}
								hintText="Select a doctor"
								value={this.state.values}
								onChange={this.handleChange}
								selectionRenderer={this.selectionRenderer}
							>
							</SelectField>
						</InputWrapper>
					</DialogContentWrapper>
				</AddButton>
				<PatientBoard Data={data} />
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
	width: 50%;
	margin-bottom: 10px;
	padding: 0 5px;
	> span {
		width: 150px;
		display: inline-block;
	}
`
// "{
// 	"name": "Jack",
// 	"birth": "1989-09-02",
// 	"gender": "M",
// 	"address": "xxxxxxxxxxx",
// 	"tel": "xxxxxxxx",
// 	"blood_type": "O",
// 	"blood_surger": 2.7,
// 	"idl": 1.8,
// 	"hdl": 2.6,
// 	"triglyceride": 3.7,
// 	"primaryDoctor": 2,
// 	"illnesses": [248, 302, 126],
// 	"allergies": [112, 203]
// }"

