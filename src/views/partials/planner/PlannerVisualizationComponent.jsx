import React, {Component} from 'react'
import {CalendarRostering, NurseRostering} from '../../../ui/roster'
import {path} from 'ramda'
import firebaseService from '../../../service/firebase/firebase-service'
import {setPlannerState} from '../../../redux/action-creators/planner'
import {connect} from 'react-redux'
import {getPlanner} from '../../../selectors/planner'
import {ButtonNew} from '../../../ui/button'


const getPlannerId = path(['match', 'params','id'])
const getBestSolution = path(['planner', 'BestSolution'])

class PlannerVisualizationComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showRoster: true,
      showNurseRostering: false
    }
  }

  componentDidMount () {
    firebaseService.initPlannerChannel(
      getPlannerId(this.props),
      this.props.setPlannerState
    )
  }

  render () {
    return <main className='page-main-content'>
      <PlannerVisualizationToolbar
        bestSolution={getBestSolution(this.props)}
        showNurseRostering={() => this.setState({showNurseRostering: true, showRoster: false})}
        showCalendarRostering={() => this.setState({showNurseRostering: false, showRoster: true})}/>
      {this.state.showRoster && <CalendarRostering {...this.props} plannerId={getPlannerId(this.props)} />}
      {this.state.showNurseRostering && <NurseRostering {...this.props} plannerId={getPlannerId(this.props)} />}
    </main>
  }
}

const PlannerVisualizationToolbar = props => (
  <div>
    {props.bestSolution && <span>This is our most optimal solution</span>}
    <ButtonNew type={'medium'} classes={'pull-right'} onClick={props.showNurseRostering}>Nurses View</ButtonNew>
    <ButtonNew type={'medium'} classes={'pull-right'} onClick={props.showCalendarRostering}>Calendar View</ButtonNew>
  </div>
)

const mapActions = {
  setPlannerState
}

const mapStateToProps = (state, ownProps) => ({
  planner: getPlanner(getPlannerId(ownProps), state)
})

export default connect(mapStateToProps, mapActions)(PlannerVisualizationComponent)

