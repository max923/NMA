import React, { Component } from 'react';
import PatientBoard from '../../components/PatientBoard'
import styled from 'styled-components'
import AddPatient from '../../components/AddPatient'
import request from 'axios'
class Patient extends Component {
  componentDidMount() {
    // request.get()
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
        <AddPatient />
        <PatientBoard Data={data} />
      </div>
    )
  }
}

export default Patient;


