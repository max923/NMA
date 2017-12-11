import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import ConsultationBoard from '../../components/ConsultationBoard'
class Consultation extends Component {
	componentDidMount() {
		
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
				<ConsultationBoard Data={data}/>
			</div>
		)
	}
}

export default Consultation;


