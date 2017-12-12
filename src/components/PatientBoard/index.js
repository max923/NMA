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

const PatientBoard = ({data}) => {
    if ( data.length ===0 ) return <div>Loading</div>
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
                {
                    data.map(({patientNo, seq, name, gender, birth, tel, address}) => (
                        <TableRow>
                            <TableRowColumn>{patientNo}</TableRowColumn>
                            <TableRowColumn>{name}</TableRowColumn>
                            <TableRowColumn>
                                {gender === 'M' ? 'Male' : 'Female'}
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
                    ))
                }
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
