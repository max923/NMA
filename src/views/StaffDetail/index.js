import React, { Component } from 'react';
import styled from 'styled-components'
import request from 'axios'
import RaisedButton from 'material-ui/RaisedButton';
import fetchApiData from '../../model/Api'
import DialogModal from '../../components/DialogModal'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import _ from 'lodash'
class StaffDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surgeonData: {},
            seq: props.match.params.seq,
            type: props.match.params.type
        }
    }
    componentDidMount() {
        fetchApiData(`/${this.state.type}/${this.state.seq}`, 'GET')
            .then(({ data }) => {
                this.setState({ surgeonData: data })
            })
        console.log()
    }
    mappingTitle(title) {
        switch (title) {
            case 'specialty':
                return 'Specialty'
                break;
            case 'contractType':
                return 'Contract Type'
                break;
            case 'contractYear':
                return 'Contract Year'
                break;
            case 'empNo':
                return 'Emp No'
                break;
            case 'ssn':
                return 'SSN'
                break;
            case 'name':
                return 'Name'
                break;
            case 'gender':
                return 'Gender'
                break;
            case 'address':
                return 'Address'
                break;
            case 'tel':
                return 'Tel'
                break;
            case 'code':
                return 'Code'
                break;
            case 'category':
                return 'Category'
                break;
            case 'specialNeeds':
                return 'Special Needs'
                break;
            case 'anatomicalLocation':
                return 'Anatomical Location'
                break;
                case 'annualSalary':
                return 'Annual Salary'
                break;
                case 'grade':
                return 'Grade'
                break;
                case 'year':
                return 'Year'
                break;
            default:
                return title
                break;
        }
    }
    render() {
        const data = this.state.surgeonData
        if (data === {}) return <div>Loading</div>
        return (
            <div className="animated fadeIn">
                <ItemsWrapepr>
                    {
                        Object.keys(data).map((key, index) => {
                            if (key === 'seq') return ''
                            if (key === 'employee') {
                                const empData = data[key]
                                return Object.keys(empData).map(empKey => {
                                    if (empKey === 'seq' || empKey === 'staffType' || empKey === 'disable') {
                                        return ''
                                    }
                                    else if (empKey === 'gender') {
                                        return <Item><span>{this.mappingTitle(empKey)}: </span>{empData[empKey] === 'F' ? 'Female' : 'Male'}</Item>
                                    }
                                    return <Item><span>{this.mappingTitle(empKey)}: </span>{empData[empKey]}</Item>
                                })
                            } else if (key === 'surgeryType') {
                                const surgeryData = data[key]
                                return Object.keys(surgeryData).map(surgeryKey => {
                                    if (surgeryKey === 'seq' || surgeryKey === 'staffType' || surgeryKey === 'disable') {
                                        return ''
                                    }
                                    else if (surgeryKey === 'gender') {
                                        return <Item><span>{this.mappingTitle(surgeryKey)}: </span>{surgeryData[surgeryKey] === 'F' ? 'Female' : 'Male'}</Item>
                                    }
                                    return <Item><span>{this.mappingTitle(surgeryKey)}: </span>{surgeryData[surgeryKey]}</Item>
                                })
                            }
                            else {
                                return <Item><span>{this.mappingTitle(key)}: </span>{data[key]}</Item>
                            }
                        })
                    }
                </ItemsWrapepr>
            </div>
        )
    }
}

export default StaffDetail;
const ItemsWrapepr = styled.ul`
	display: flex;
	flex-wrap: wrap;
	background: #fff;
    padding: 15px 15px 15px 50px;
    margin: 0;
`
const Item = styled.li`
	width: 50%;
	margin: 10px 0;
	font-size: 15px;
`
const BtnWrapper = styled.div`
	display: flex;
`
const PrimaryDoctorItemWrapper = styled.ul`
	display: flex;
	flex-wrap: wrap;
`
const PrimaryDoctorItem = styled.li`
	width: 33%;
	margin: 5px 0;
`
const Title = styled.p`
	margin-bottom: 10
`

