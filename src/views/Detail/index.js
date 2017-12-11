import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
class Detail extends Component {
	componentDidMount() {
		const seq = this.props.match.params.seq
	}
	render() {
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
		return (
			<div className="animated fadeIn">
				<RaisedButton label="See illness" style={{marginRight: 10}}/>
				<RaisedButton label="See allergy"/>
				<ItemsWrapepr>
					{
						Object.keys(data).map((key, index) => {
							switch (key) {
								case 'primaryDoctor':
									return (
										<div>
											<span>{key}: </span>
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

