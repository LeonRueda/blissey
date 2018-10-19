import {pathOr} from 'ramda'
import ServiceGridCard from '../service/ServiceGridCard'
import TitleGridCard from '../title/TitleGridCard'
import ShiftTypeGridCard from '../shiftType/ShiftTypeGridCard'
import ShiftGridCard from '../shift/ShiftGridCard'
import BuildingGridCard from '../building/BuildingGridCard'
import UserGridCard from '../user/UserGridCard'
import TimeLapseGridCard from '../time-lapse/TimeLapseGridCard'
import {EditGridCard, DeleteGridCard, UpdateGridCard} from '../utils'
import BuildingTableCard from '../planner/PlannerTableCardContainer'


class GridCards {
  constructor ( GridCards, TableCards ) {
    this.GridCards = GridCards
    this.TableCards = TableCards
  }

  getComponent (modelName, modelAttribute) {
    return pathOr(false, [modelName, modelAttribute], this.GridCards)
  }

  getTableComponent (modelName) {
    return pathOr(false, [modelName], this.TableCards)
  }
}

const modelGridCards = {
  service: ServiceGridCard,
  title: TitleGridCard,
  shift: ShiftGridCard,
  shiftType: ShiftTypeGridCard,
  building: BuildingGridCard,
  user: UserGridCard,
  timeLapse: TimeLapseGridCard
}

const defaultActionsGridCards = {
  edit: EditGridCard,
  delete: DeleteGridCard,
}

const plannerActionsGridCards = {
  update: UpdateGridCard,
  ...defaultActionsGridCards
}

const gridCards = {
  building: {
    services: modelGridCards.service,
    ...defaultActionsGridCards,
  },
  service: {
    ...defaultActionsGridCards
  },
  title: {
    ...defaultActionsGridCards
  },
  period: {
    ...defaultActionsGridCards
  },
  planning: {
    ...defaultActionsGridCards
  },
  planner: {
    building: modelGridCards.building,
    nurseType: modelGridCards.title,
    nurses: modelGridCards.user,
    services: modelGridCards.service,
    timeLapse: modelGridCards.timeLapse,
    ...plannerActionsGridCards
  },
  shift: {
    shiftType: modelGridCards.shiftType,
    service: modelGridCards.service,
    ...defaultActionsGridCards
  },
  shiftType: {
    ...defaultActionsGridCards
  },
  user: {
    title: modelGridCards.title,
    services: modelGridCards.service,
    ...defaultActionsGridCards
  },
  assignShiftbyService: {
    shifts: modelGridCards.shift,
    ...defaultActionsGridCards
  }
}

const tableCards = {
  planner: BuildingTableCard
}


export default new GridCards(gridCards, tableCards)
