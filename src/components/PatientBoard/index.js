import React, { Component } from 'react';
import styled from 'styled-components'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
/**
 * 
 * {
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
            "primaryDoctorSeq": {
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
        },
 */
const PatientBoard = (props) => {
    if (!props.Data) return <div>Loading</div>
    const {
        seq,
        patient_no,
        name,
        birth,
        gender,
        address,
        tel,
        blood_type,
        blood_surger,
        ldl,
        hdl,
        triglyceride,
        risk_heart_disease,
        primaryDoctorSeq
    } = props.Data
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Gender</TableHeaderColumn>
                    <TableHeaderColumn>Birthday</TableHeaderColumn>
                    <TableHeaderColumn>Telephone</TableHeaderColumn>
                    <TableHeaderColumn>Address</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableRowColumn>{patient_no}</TableRowColumn>
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>
                        {gender === 'M'? 'Male' : 'Female'}
                    </TableRowColumn>
                    <TableRowColumn>{birth}</TableRowColumn>
                    <TableRowColumn>{tel}</TableRowColumn>
                    <TableRowColumn>{address}</TableRowColumn>
                    <TableRowColumn>
                        <Link 
                            to={`/patient/${seq}`}
                        >
                            <RaisedButton label="Detail" secondary={true} />
                        </Link>
                    </TableRowColumn>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default PatientBoard;
PatientBoard.defaultProps = {
    primaryDoctorSeq: {}
};

const style = {
    margin: 12,
};

const ItemWapper = styled.li`
    position: relative;
    height: 50px;
    overflow: hidden;
    display: flex;
    border-bottom: solid 1px #d8dadc;
    padding-bottom: 5px;
    margin-bottom: 5px;
    &:after{
        content: '';
        height: 60%;
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgb(228, 229, 230) 70%);
        pointer-events: none;
    }
`
const ItemLeft = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const ItemRight = styled.div`
`
const Item = styled.div`
    width: 50%;
`
const CheckBtn = styled.button`
    
`
