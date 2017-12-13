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

const SurgeryBoard = ({ data }) => {
    if (data.length === 0) return <div></div>
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Surgeon Name</TableHeaderColumn>
                    <TableHeaderColumn>Patient Name</TableHeaderColumn>
                    <TableHeaderColumn>Room Number</TableHeaderColumn>
                    <TableHeaderColumn>Surgery Type</TableHeaderColumn>
                    <TableHeaderColumn>Start Date</TableHeaderColumn>
                    <TableHeaderColumn>End Date</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((element) => (
                        <TableRow>
                            <TableRowColumn>{element.surgeon.employee.name}</TableRowColumn>
                            <TableRowColumn>{element.patient.name}</TableRowColumn>
                            <TableRowColumn>{element.room.roomNum}</TableRowColumn>
                            <TableRowColumn>{element.type.code}</TableRowColumn>
                            <TableRowColumn>{element.startDatetime}</TableRowColumn>
                            <TableRowColumn>{element.endDatetime}</TableRowColumn>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default SurgeryBoard;
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
