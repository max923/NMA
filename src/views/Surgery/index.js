import React, { Component } from 'react';
import SurgeryBoard from '../../components/SurgeryBoard'
import styled from 'styled-components'
import axios from 'axios'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import fetchApiData from '../../model/Api'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
class Surgery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            dateTime: null,
            surgeon: [],
            patient: [],
            room: [],
            surgeonSeq: null,
            patientSeq: null,
            roomSeq: null,
            surgeryTypeSeq: null,
            startDate: null,
            endDate: null,
            availableRoom: [],
            availableSurgeon: [],
            availablePatient: [],
            surgeryType: [],
            availableRoomSeq: null,
            availableSurgeonSeq: null,
            availablePatientSeq: null,
            schdules:[]
        };
    }
    componentDidMount() {
        fetchApiData('/surgeon', 'get')
            .then(({ data }) => {
                this.setState({ surgeon: data })
            })

        fetchApiData('/patient', 'get')
            .then(({ data }) => {
                this.setState({ patient: data })
            })

        fetchApiData('/surgery/room', 'get')
            .then(({ data }) => {
                this.setState({ room: data })
            })
    }
    handleOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false });
    }
    handleSearchBtn() {
        
        fetchApiData(`/surgery/schedule?${this.state.surgeonSeq ? `surgeonSeq=${this.state.surgeonSeq}`:'' }${this.state.roomSeq ? `&roomSeq=${this.state.roomSeq}`:''}${this.state.dateTime? `&date=${this.state.dateTime.format('YYYY-MM-DD')}`:''}`, 'get')
            .then(({ data }) => {
                this.setState({schdules:data})
            })
    }
    handleReservationBtn() {
        const startDate = this.state.startDate
        const endDate = this.state.endDate
        const startDateFormate = startDate.format('YYYY-MM-DD HH:mm:ss')
        const endDateFormate = endDate.format('YYYY-MM-DD HH:mm:ss')
        fetchApiData(`/surgery/schedule`, 'post', {
            "patientSeq": this.state.availablePatientSeq,
            "startDatetime": startDateFormate,
            "endDatetime": endDateFormate,
            "surgeonSeq": this.state.availableSurgeonSeq,
            "roomSeq": this.state.availableRoomSeq,
            "surgeryTypeSeq": this.state.surgeryTypeSeq,
        })
        .then((data) => {
            if(data.code === 200) this.handleClose()
        })
    }
    componentDidUpdate() {
        const startDate = this.state.startDate
        const endDate = this.state.endDate
        const isSurgeryDone = this.state.isSurgeryDone
        if (startDate && endDate) {
            const startDateFormate = startDate.format('YYYY-MM-DD HH:mm:ss')
            const endDateFormate = endDate.format('YYYY-MM-DD HH:mm:ss')
            if(`${startDateFormate}/${endDateFormate}` !== this.state.memoryDate){
                Promise.all([
                    fetchApiData(`/surgery/available_room?startDatetime=${startDateFormate}&endDatetime=${endDateFormate}`, 'get'),
                    fetchApiData(`/surgery/available_surgeon?startDatetime=${startDateFormate}&endDatetime=${endDateFormate}`, 'get'),
                    fetchApiData(`/surgery/available_patient?startDatetime=${startDateFormate}&endDatetime=${endDateFormate}`, 'get'),
                    fetchApiData(`/surgery/type`, 'get'),
                ]).then(res => {
                    this.setState({
                        availableRoom: res[0].data,
                        availableSurgeon: res[1].data,
                        availablePatient: res[2].data,
                        surgeryType: res[3].data,
                        memoryDate: `${startDateFormate}/${endDateFormate}`
                    })
                })
            }
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
                label="Reservation"
                primary={true}
                onClick={() => this.handleReservationBtn()}
            />,
        ];
        return (
            <div className="animated fadeIn">
                <RaisedButton label='Reservation' onClick={() => this.handleOpen()} />
                <Dialog
                    title='Reservation surgery'
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <ItemWrapper>
                        <span>Start Date: </span>
                        <DatePicker
                            showTimeSelect
                            dateFormat="YYYY-MM-DD HH:mm:ss"
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={(date) => this.setState({ startDate: date })}
                        />
                        <span>End Date: </span>
                        <DatePicker
                            showTimeSelect
                            dateFormat="YYYY-MM-DD HH:mm:ss"
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={(date) => this.setState({ endDate: date })}
                        />
                    </ItemWrapper>
                    <ItemWrapper>
                        <span>Available Room: </span>
                        <DropDownMenu
                            maxHeight={300}
                            value={this.state.availableRoomSeq}
                            style={{ minWidth: '150px' }}
                            onChange={(event, index, value) => this.setState({ availableRoomSeq: value })}
                        >
                            {
                                this.state.availableRoom.map((element, index) => (
                                    <MenuItem value={element.seq} key={index} primaryText={element.roomNum} />
                                ))
                            }
                        </DropDownMenu>
                    </ItemWrapper>
                    <ItemWrapper>
                        <span>Surgeon: </span>
                        <DropDownMenu
                            maxHeight={300}
                            value={this.state.availableSurgeonSeq}
                            style={{ minWidth: '150px' }}
                            onChange={(event, index, value) => this.setState({ availableSurgeonSeq: value })}
                        >
                            {
                                this.state.availableSurgeon.map((element, index) => (
                                    <MenuItem value={element.seq} key={index} primaryText={element.employee.name} />
                                ))
                            }
                        </DropDownMenu>
                    </ItemWrapper>
                    <ItemWrapper>
                        <span>Patient: </span>
                        <DropDownMenu
                            maxHeight={300}
                            value={this.state.availablePatientSeq}
                            style={{ minWidth: '150px' }}
                            onChange={(event, index, value) => this.setState({ availablePatientSeq: value })}
                        >
                            {
                                this.state.availablePatient.map((element, index) => (
                                    <MenuItem value={element.seq} key={index} primaryText={element.name} />
                                ))
                            }
                        </DropDownMenu>
                    </ItemWrapper>
                    <ItemWrapper>
                        <span>SurgeryType: </span>
                        <DropDownMenu
                            maxHeight={300}
                            value={this.state.surgeryTypeSeq}
                            style={{ minWidth: '150px' }}
                            onChange={(event, index, value) => this.setState({ surgeryTypeSeq: value })}
                        >
                            {
                                this.state.surgeryType.map((element, index) => (
                                    <MenuItem value={element.seq} key={index} primaryText={element.code} />
                                ))
                            }
                        </DropDownMenu>
                    </ItemWrapper>
                </Dialog>
                <SearchWrapper>
                    <ItemWrapper>
                        <span>Date: </span>
                        <DatePicker
                            dateFormat="YYYY-MM-DD"
                            onChange={(date) => this.setState({ dateTime: date })}
                            selected={this.state.dateTime} />
                    </ItemWrapper>
                    <ItemWrapper>
                        <span>Room: </span>
                        <DropDownMenu
                            maxHeight={300}
                            value={this.state.roomSeq}
                            style={{ minWidth: '150px' }}
                            onChange={(event, index, value) => this.setState({ roomSeq: value })}
                        >
                            {
                                this.state.room.map((element, index) => (
                                    <MenuItem value={element.seq} key={index} primaryText={element.roomNum} />
                                ))
                            }
                        </DropDownMenu>
                    </ItemWrapper>
                    <ItemWrapper>
                        <span>Surgeon: </span>
                        <DropDownMenu
                            maxHeight={300}
                            value={this.state.surgeonSeq}
                            style={{ minWidth: '150px' }}
                            onChange={(event, index, value) => this.setState({ surgeonSeq: value })}
                        >
                            {
                                this.state.surgeon.map((element, index) => (
                                    <MenuItem value={element.seq} key={index} primaryText={element.employee.name} />
                                ))
                            }
                        </DropDownMenu>
                    </ItemWrapper>
                    <ItemWrapper>
                        <span>Patient: </span>
                        <DropDownMenu
                            maxHeight={300}
                            value={this.state.patientSeq}
                            style={{ minWidth: '150px' }}
                            onChange={(event, index, value) => this.setState({ patientSeq: value })}
                        >
                            {
                                this.state.patient.map((element, index) => (
                                    <MenuItem value={element.seq} key={index} primaryText={element.name} />
                                ))
                            }
                        </DropDownMenu>
                    </ItemWrapper>
                    <ItemWrapper>
                        <RaisedButton label="Search" secondary={true} onClick={() => this.handleSearchBtn()} style={{ marginLeft: '10px' }} />
                    </ItemWrapper>
                </SearchWrapper>
                <SurgeryBoard data={this.state.schdules}/>
            </div>
        )
    }
}

export default Surgery;
const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 5px;
`
const SearchWrapper = styled.div`
    display: flex;
	padding: 15px;
	background: #fff;
`