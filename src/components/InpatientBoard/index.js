import React, { Component } from 'react';
import styled from 'styled-components'
import fetchApiData from '../../model/Api'
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

const InpatientBoard = ({ data,refresh }) => {
    if (data.length === 0) return <div>Loading</div>
    const handleRemoveBed = (e,seq) => {
        fetchApiData(`/inpatient/bed?inPatientSeq=${seq}`,'delete')
        .then(res =>{
            if(res.code === 200) refresh() 
        })
        
    }
    const handleRemoveNurse = (e,seq) => {
        fetchApiData(`/inpatient/nurse?inPatientSeq=${seq}`,'delete')
        .then(res =>{
            if(res.code === 200) refresh() 
        })
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Unit</TableHeaderColumn>
                    <TableHeaderColumn>Nurse Name</TableHeaderColumn>
                    <TableHeaderColumn>Patient</TableHeaderColumn>
                    <TableHeaderColumn>Room Number</TableHeaderColumn>
                    <TableHeaderColumn>Bed Id</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map(({ nursingUnit, seq, patient, bed, nurse }) => (
                        <TableRow>
                            <TableRowColumn>{nursingUnit}</TableRowColumn>
                            <TableRowColumn>{_.isEmpty(nurse) ? '' : nurse.employee.name}</TableRowColumn>
                            <TableRowColumn>{_.isEmpty(patient) ? '' : patient.name}</TableRowColumn>
                            <TableRowColumn>{_.isEmpty(bed) ? '' : bed.room.roomNum}</TableRowColumn>
                            <TableRowColumn>{_.isEmpty(bed) ? '' : bed.bedId}</TableRowColumn>
                            <TableRowColumn>
                                <button onClick={(e) => handleRemoveBed(e,seq)}>Remove Bed</button>
                            </TableRowColumn>
                            <TableRowColumn>
                                <button onClick={(e) => handleRemoveNurse(e,seq)}>Remove Nurse</button>
                            </TableRowColumn>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default InpatientBoard;
// InpatientBoard.defaultProps = {
//     primaryDoctorSeq: {}
// };

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
