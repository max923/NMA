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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
class InpatientBoard extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            selectedAdd: 'default',
            open: false,
            bed: [],
            nurse: [],
            dialogType: null,
            inPatientSeq: null,
        }
    }
    componentDidMount() {
        // fetchApiData(`/nurse`, 'GET')
        //     .then(({ data }) => {
        //         this.setState({ nurse: data })
        //     })
        // fetchApiData(`/inpatient/available_bed`, 'GET')
        //     .then(({ data }) => {
        //         this.setState({ bed: data })
        //     })
    }
    handleOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false });
    }
    handleAddBtn(state) {
        this.setState(state)
        if (state.dialogType === 'bed') {
            fetchApiData(`/inpatient/available_bed`, 'GET')
                .then(({ data }) => {
                    this.setState({ bed: data })
                })
        }
        if (state.dialogType === 'nurse') {
            fetchApiData(`/nurse`, 'GET')
                .then(({ data }) => {
                    this.setState({ nurse: data })
                })
        }
    }
    handleRemoveBed(e, seq) {
        fetchApiData(`/inpatient/bed?inPatientSeq=${seq}`, 'DELETE')
            .then(res => {
                if (res.code === 200) this.props.refresh()
            })

    }
    handleRemoveNurse(e, seq) {
        fetchApiData(`/inpatient/nurse?inPatientSeq=${seq}`, 'DELETE')
            .then(res => {
                if (res.code === 200) this.props.refresh()
            })
    }
    handleDialogAdd(event, index, value, ) {
        if (this.state.dialogType === 'nurse') {
            fetchApiData(`/inpatient/nurse`, 'PUT', {
                "inPatientSeq": this.state.inPatientSeq,
                "nurseSeq": this.state.selectedAdd
            })
                .then(res => {
                    this.props.refresh()
                })
        } else if (this.state.dialogType === 'bed') {
            fetchApiData(`/inpatient/bed`, 'PUT', {
                "inPatientSeq": this.state.inPatientSeq,
                "bedSeq": this.state.selectedAdd
            })
                .then(res => {
                    this.props.refresh()
                })
        }
        this.handleClose()
    }
    render() {
        const {
            data,
            refresh
        } = this.props
        if (data.length === 0) return <div>Loading</div>
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleClose()}
            />,
            <FlatButton
                label="Add"
                primary={true}
                onClick={() => this.handleDialogAdd()}
            />,
        ];
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Unit</TableHeaderColumn>
                        <TableHeaderColumn>Patient</TableHeaderColumn>
                        <TableHeaderColumn>Nurse</TableHeaderColumn>
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
                                <TableRowColumn>{_.isEmpty(patient) ? '' : patient.name}</TableRowColumn>
                                <TableRowColumn>{_.isEmpty(nurse) ? '' : nurse.employee.name}</TableRowColumn>
                                <TableRowColumn>{_.isEmpty(bed) ? '' : bed.room.roomNum}</TableRowColumn>
                                <TableRowColumn>{_.isEmpty(bed) ? '' : bed.bedId}</TableRowColumn>
                                <TableRowColumn>
                                    {
                                        _.isEmpty(bed)
                                            ? <button onClick={(e) => this.handleAddBtn({ open: true, dialogType: 'bed', inPatientSeq: seq })}>Add Bed</button>
                                            : <button onClick={(e) => this.handleRemoveBed(e, seq)}>Remove Bed</button>
                                    }

                                </TableRowColumn>
                                <TableRowColumn>
                                    {
                                        _.isEmpty(nurse)
                                            ? <button onClick={(e) => this.handleAddBtn({ open: true, dialogType: 'nurse', inPatientSeq: seq })}>Add Nurse</button>
                                            : <button onClick={(e) => this.handleRemoveNurse(e, seq)}>Remove Nurse</button>
                                    }
                                    <Dialog
                                        title={this.state.dialogType === 'nurse' ? 'Add Nurse' : 'Add Bed'}
                                        actions={actions}
                                        modal={true}
                                        open={this.state.open}
                                    >
                                        <DropDownMenu maxHeight={300} value={this.state.selectedAdd} onChange={(event, index, value) => this.setState({ selectedAdd: value })}>
                                            <MenuItem value='default' primaryText={this.state.dialogType === 'nurse' ? 'Select Nurse' : 'Select Bed'} disabled />
                                            {
                                                this.state.dialogType === 'nurse'
                                                    ? this.state.nurse.map((element, index) => (
                                                        <MenuItem value={element.seq} key={index} primaryText={element.employee.name} />
                                                    ))
                                                    : this.state.bed.map((element, index) => (
                                                        <MenuItem value={element.seq} key={index} primaryText={`${element.room.roomNum} ${element.bedId}`} />
                                                    ))

                                            }
                                        </DropDownMenu>
                                    </Dialog>
                                </TableRowColumn>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        )
    }
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
