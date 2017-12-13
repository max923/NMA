import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import ConsultationBoard from '../../components/ConsultationBoard'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import fetchApiData from '../../model/Api'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css';
class Staff extends Component {
    constructor(props) {
        super(props)
        this.state = {
            StaffType: ['Support Staff', 'Physician', 'Nurse', 'Surgeon'],
            selectedStaff: 'default',
            staffList: [],
            surgeryType: [],
            open: false,
            selectedAddStaff: 'default',
            selectedSurgeryType: 'default'
        };
    }
    componentDidMount() {
        fetchApiData(`/surgery/type`, 'GET')
            .then(({ data }) => {
                this.setState({ surgeryType: data })
            })
    }
    handleOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false });
    }
    handleAddStaffBtn() {
        const employeeData = {
            employee: {
                "name": this.state.name || null,
                "ssn": this.state.ssn || null,
                "gender": this.state.gender || null,
                "address": this.state.address || null,
                "tel": this.state.tel || null,
            }
        }
        const getStaffDiffData = () => {
            switch (this.state.selectedAddStaff) {
                case 'Support Staff':
                    return {
                        "annualSalary": Number(this.state.annualSalary) || null
                    }
                    break;
                case 'Physician':
                    return {
                        "annualSalary": Number(this.state.annualSalary) || null,
                        "specialty": this.state.specialty || null
                    }
                    break;
                case 'Nurse':
                    return {
                        "annualSalary": Number(this.state.annualSalary) || null,
                        "grade": Number(this.state.grade) || null,
                        "year": Number(this.state.year) || null,
                        "surgeryType": {
                            seq: this.state.selectedSurgeryType !== 'default' ? this.state.selectedSurgeryType : null
                        }
                    }
                    break;
                case 'Surgeon':
                    return {
                        "specialty": this.state.specialty || null,
                        "contractType": this.state.contractType || null,
                        "contractYear": Number(this.state.contractYear) || null
                    }
                    break;
                default:
                    break;
            }
        }
        const staffType = this.getMappingStaff(this.state.selectedAddStaff)
        const sendData = Object.assign({}, employeeData, getStaffDiffData())

        fetchApiData(`/${staffType}`, 'post', sendData)
            .then(data => {
                if (data.code === 200) {
                    this.handleClose()
                    if (this.state.selectedStaff === this.state.selectedAddStaff) {
                        fetchApiData(`/${this.state.selectedAddStaff}`, 'GET')
                            .then(({ data }) => {
                                this.setState({ staffList: data })
                            })
                    }

                }
            })
    }
    getMappingStaff(type) {
        switch (type) {
            case 'Support Staff':
                return 'support_staff'
                break;
            case 'Physician':
                return 'physician'
                break;
            case 'Nurse':
                return 'nurse'
                break;
            case 'Surgeon':
                return 'surgeon'
                break;
            default:
                break;
        }
    }
    handleStaffChange(event, index, value) {
        this.setState({ selectedStaff: value })
        const staffType = this.getMappingStaff(value)
        fetchApiData(`/${staffType}`, 'GET')
            .then(({ data }) => {
                this.setState({ staffList: data })
            })
    }
    handleDelStaff(seq) {
        const staffType = this.getMappingStaff(this.state.selectedStaff)
        fetchApiData(`/${staffType}/${seq}`, 'DELETE')
            .then((data) => {
                if(data.code === 200) {
                    fetchApiData(`/${staffType}`, 'GET')
                    .then(({ data }) => {
                        this.setState({ staffList: data })
                    })
                }
            })
    }
    switchStaffForm(type) {
        switch (type) {
            case 'Support Staff':
                return (
                    <InputWrapper>
                        <span>Annual Salary: </span>
                        <input type="tel" onInput={e => this.setState({ annualSalary: e.target.value })} />
                    </InputWrapper>
                )
                break;
            case 'Physician':
                return (
                    <div>
                        <InputWrapper>
                            <span>Annual Salary: </span>
                            <input type="tel" onInput={e => this.setState({ annualSalary: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper>
                            <span>Specialty: </span>
                            <input type="text" onInput={e => this.setState({ specialty: e.target.value })} />
                        </InputWrapper>
                    </div>
                )
                break;
            case 'Nurse':
                return (
                    <div>
                        <InputWrapper>
                            <span>Annual Salary: </span>
                            <input type="tel" onInput={e => this.setState({ annualSalary: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper>
                            <span>Grade: </span>
                            <input type="tel" onInput={e => this.setState({ grade: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper>
                            <span>Surgery Type: </span>
                            <DropDownMenu maxHeight={300} value={this.state.selectedSurgeryType} onChange={(event, index, value) => this.setState({selectedSurgeryType: value})}>
                                <MenuItem value='default' primaryText='Select Surgery Type' disabled />
                                {
                                    this.state.surgeryType.map((element, index) => (
                                        <MenuItem value={element.seq} key={index} primaryText={element.code} />
                                    ))
                                }
                            </DropDownMenu>
                        </InputWrapper>
                        <InputWrapper>
                            <span>Year: </span>
                            <input type="tel" onInput={e => this.setState({ year: e.target.value })} />
                        </InputWrapper>
                    </div>
                )
                break;
            case 'Surgeon':
                return (
                    <div>
                        <InputWrapper>
                            <span>Specialty: </span>
                            <input type="text" onInput={e => this.setState({ annualSalary: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper>
                            <span>Contract Type: </span>
                            <input type="text" onInput={e => this.setState({ contractType: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper>
                            <span>Contract Year: </span>
                            <input type="tel" onInput={e => this.setState({ contractYear: e.target.value })} />
                        </InputWrapper>
                    </div>
                )
                break;
            default:
                return ''
                break;
        }

    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleClose()}
            />,
            <FlatButton
                label="Add staff"
                primary={true}
                onClick={() => this.handleAddStaffBtn()}
            />,
        ];
        return (
            <div className="animated fadeIn">
                <SearchBarWrapper>

                    <DropDownMenu maxHeight={300} value={this.state.selectedStaff} onChange={(event, index, value) => this.handleStaffChange(event, index, value)}>
                        <MenuItem value='default' primaryText='Select Staff Type' disabled />
                        {
                            this.state.StaffType.map((element, index) => (
                                <MenuItem value={element} key={index} primaryText={element} />
                            ))
                        }
                    </DropDownMenu>
                    <RaisedButton label='Add staff' onClick={() => this.handleOpen()} />
                    <Dialog
                        title='Add staff'
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        <InputWrapper>
                            <span>Staff Type:</span>
                            <DropDownMenu maxHeight={300} value={this.state.selectedAddStaff} onChange={(event, index, value) => this.setState({ selectedAddStaff: value })}>
                                <MenuItem value='default' primaryText='Select Staff Type' disabled />
                                {
                                    this.state.StaffType.map((element, index) => (
                                        <MenuItem value={element} key={index} primaryText={element} />
                                    ))
                                }
                            </DropDownMenu>
                        </InputWrapper>

                        <InputWrapper>
                            <span>Name: </span>
                            <input type="text" onInput={e => this.setState({ name: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper>
                            <span>SSN: </span>
                            <input type="text"
                                maxLength={9}
                                onInput={e => this.setState({ ssn: e.target.value })}
                                onKeyPress={(event) => event.charCode >= 48 && event.charCode <= 57}
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <span>Gender: </span>
                            <label>Male: <input type="radio" name="gender" value="M" onChange={e => this.setState({ gender: e.target.value })} /></label>
                            <label>Female: <input type="radio" name="gender" value="F" onChange={e => this.setState({ gender: e.target.value })} /></label>
                        </InputWrapper>
                        <InputWrapper>
                            <span>Address: </span>
                            <input type="text" onInput={e => this.setState({ address: e.target.value })} />
                        </InputWrapper>
                        <InputWrapper>
                            <span>Tel: </span>
                            <input type="tel" onInput={e => this.setState({ tel: e.target.value })} />
                        </InputWrapper>
                        {this.switchStaffForm(this.state.selectedAddStaff)}
                    </Dialog>
                </SearchBarWrapper>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>No</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Gender</TableHeaderColumn>
                            <TableHeaderColumn>Address</TableHeaderColumn>
                            <TableHeaderColumn>Tel</TableHeaderColumn>
                            <TableHeaderColumn>SSN</TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            this.state.staffList.map(element => (
                                <TableRow>
                                    <TableRowColumn>{element.employee.empNo}</TableRowColumn>
                                    <TableRowColumn>{element.employee.name}</TableRowColumn>
                                    <TableRowColumn>{element.employee.gender === 'F' ? 'Female' : 'Male'}</TableRowColumn>
                                    <TableRowColumn>{element.employee.address}</TableRowColumn>
                                    <TableRowColumn>{element.employee.tel}</TableRowColumn>
                                    <TableRowColumn>{element.employee.ssn}</TableRowColumn>
                                    <TableRowColumn>
                                        <RaisedButton label="Delete" onClick={() => this.handleDelStaff(element.seq)}/>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <Link
                                            to={`/staff/${element.seq}`}
                                        >
                                            <RaisedButton label="Detail" secondary={true} />
                                        </Link>
                                    </TableRowColumn>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default Staff;
const SearchBarWrapper = styled.div`
	display: flex;
	margin-bottom: 10px;
	align-items: center;
	padding: 15px;
	background: #fff;
`
const DatePickerWrapper = styled.div`
	display: flex;
	align-items: center;
`
const SelectDoctorWrapepr = styled.div`
	display: flex;
	align-items: center;
`
const SelectPatientWrapepr = styled.div`
    display: flex;
    align-items: center;
`
const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    margin-bottom: 10px;
    padding: 0 5px;
    > span {
        width: 150px;
        display: inline-block;
    }
    > label{
        margin-right: 5px;
    }
`



