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

const AvailableBed = ({ data }) => {
    if (data.length === 0) return <div>Loading</div>
    return (
        <Table >
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Bed Id</TableHeaderColumn>
                    <TableHeaderColumn>Room Number</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {
                    data.map(({ room, bedId }) => (
                        <TableRow>
                            <TableRowColumn>{bedId}</TableRowColumn>
                            <TableRowColumn>{_.isEmpty(room) ? '' : room.roomNum}</TableRowColumn>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default AvailableBed;
// InpatientBoard.defaultProps = {
//     primaryDoctorSeq: {}
// };


