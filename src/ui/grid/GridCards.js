import {pathOr} from 'ramda'
import ServiceGridCard from '../service/ServiceGridCard'
import TitleGridCard from '../title/TitleGridCard'
import ShiftTypeGridCard from '../shiftType/ShiftTypeGridCard'
import ShiftGridCard from '../shift/ShiftGridCard'
import BuildingGridCard from '../building/BuildingGridCard'
import UserGridCard from '../user/UserGridCard'
import TimeLapseGridCard from '../time-lapse/TimeLapseGridCard'
import {EditGridCard, DeleteGridCard} from '../utils'
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

const actionsGridCards = {
  edit: EditGridCard,
  delete: DeleteGridCard,
}

const gridCards = {
  building: {
    services: modelGridCards.service,
    ...actionsGridCards,
  },
  service: {
    ...actionsGridCards
  },
  title: {
    ...actionsGridCards
  },
  planner: {
    building: modelGridCards.building,
    nurses: modelGridCards.user,
    services: modelGridCards.service,
    timeLapse: modelGridCards.timeLapse,
    ...actionsGridCards
  },
  shift: {
    shiftType: modelGridCards.shiftType,
    service: modelGridCards.service,
    ...actionsGridCards
  },
  shiftType: {
    ...actionsGridCards
  },
  user: {
    title: modelGridCards.title,
    services: modelGridCards.service,
    ...actionsGridCards
  },
  assignShiftbyService: {
    shifts: modelGridCards.shift,
    ...actionsGridCards
  }
}

const tableCards = {
  planner: BuildingTableCard
}


export default new GridCards(gridCards, tableCards)
