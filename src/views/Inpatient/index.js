import React, { Component } from 'react';
import InpatientBoard from '../../components/InpatientBoard'
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
class Inpatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            inpatientData: [],
        };
    }
    handleOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false });
    };
    fetchInpatient () {
        fetchApiData('/inpatient', 'get')
        .then(({data}) => {
            this.setState({ inpatientData: data })
        })
    }
    componentDidMount() {
        this.fetchInpatient()
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Link
                    to={`/inpatient/available`}
                >
                    <AvailableBtn>Available bed</AvailableBtn>
                </Link>
                <InpatientBoard data={this.state.inpatientData} refresh={() => this.fetchInpatient()}/>
            </div>
        )
    }
}

export default Inpatient;
const DialogContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const AvailableBtn = styled.button`
    padding: 5px 10px;
`