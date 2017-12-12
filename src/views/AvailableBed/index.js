import React, { Component } from 'react';
import AvailableBedBoard from '../../components/AvailableBedBoard'
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
class AvailableBed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            availableBed: [],
        };
    }
    componentDidMount() {
        fetchApiData('inpatient/available_bed', 'get')
            .then( ({data}) => {
                this.setState({ availableBed: data })
            })
    }
    render() {
        return (
            <div className="animated fadeIn">
                <AvailableBedBoard data={this.state.availableBed}/>
            </div>
        )
    }
}

export default AvailableBed;
const DialogContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`
const AvailableBtn = styled.button`
    padding: 5px 10px;
`