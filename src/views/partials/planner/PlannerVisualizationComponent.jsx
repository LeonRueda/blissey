import React, {Component} from 'react'
import Roster from '../../../ui/roster'
import {path} from 'ramda'
import firebaseService from '../../../service/firebase/firebase-service'
import {setPlannerState} from '../../../redux/action-creators/planner'
import {connect} from 'react-redux'


const getPlannerId = path(['match', 'params','id'])

class PlannerVisualizationComponent extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    firebaseService.initPlannerChannel(
      getPlannerId(this.props),
      this.props.setPlannerState
    )
  }

  render () {
    return <main className='page-main-content'>
      <Roster {...this.props} plannerId={getPlannerId(this.props)} />
    </main>
  }
}

const mapActions = {
  setPlannerState
}

export default connect(null, mapActions)(PlannerVisualizationComponent)

