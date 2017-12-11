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
 * [
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
       
 */
const ConsultationBoard = (props) => {
    if (props.Data.length === 0) return <div>Loading</div>
    const consultationList  = props.Data
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Doctor</TableHeaderColumn>
                    <TableHeaderColumn>Patient</TableHeaderColumn>
                    <TableHeaderColumn>Datetime</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    consultationList.map(({doctor,patient,datetime}) => (
                        <TableRow>
                            <TableRowColumn>{doctor.name}</TableRowColumn>
                            <TableRowColumn>{patient.name}</TableRowColumn>
                            <TableRowColumn>{datetime}</TableRowColumn>
                        </TableRow>
                    ))

                }
            </TableBody>
        </Table>
    )
}

export default ConsultationBoard;

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
