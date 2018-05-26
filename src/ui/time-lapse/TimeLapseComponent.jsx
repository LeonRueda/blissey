import React, {Component} from 'react'
import {defaultTo, pathOr} from "ramda";
import Picker from 'react-datepicker'
import moment from "moment";
import 'react-datepicker/dist/react-datepicker.css';

class TimeLapseComponent extends Component{
  constructor( props ) {
    super( props )
    this.state = {
      value: {
        startDate: moment(),
        endDate: moment()
      }
    }
  }

  updateValue ( {startDate, endDate} ) {
    const newValue = {
      startDate: defaultTo(getStartDate(this.state), startDate),
      endDate: defaultTo(getEndDate(this.state), endDate)
    }
    this.props.onSelect(newValue)
    this.setState({
      value: newValue
    })
  }
  render () {
    return <div className='row'>
      <div className="col">
        <DatePicker value={getStartDate(this.state)}
                    onChange={evt => this.updateValue({startDate: evt})}
                    name={this.props.name}
                    placeholder='Start Day' />
      </div>
      <div className="col">
        <DatePicker value={getEndDate(this.state)}
                    onChange={evt => this.updateValue({endDate: evt})}
                    name={this.props.name}
                    placeholder='End Day' />
      </div>
    </div>
  }
}

export default TimeLapseComponent

const DatePicker = props => <div>
  <span><strong>{props.placeholder}</strong></span>
  <Picker
    selected={moment(props.value.toISOString())}
    onChange={props.onChange}
    className='np-input text-input'
  />
</div>

const getStartDate = pathOr('', ['value', 'startDate'])
const getEndDate = pathOr('', ['value', 'endDate'])
