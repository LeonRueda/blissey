import {pathOr} from 'ramda'
import ServiceGridCard from '../service/ServiceGridCard'
import TitleGridCard from '../title/TitleGridCard'
import ShiftTypeGridCard from '../shiftType/ShiftTypeGridCard'
import ShiftGridCard from '../shift/ShiftGridCard'
import {EditGridCard, DeleteGridCard} from '../utils'


class GridCards {
  constructor ( GridCards ) {
    this.GridCards = GridCards
  }

  getComponent (modelName, modelAttribute) {
    return pathOr(false, [modelName, modelAttribute], this.GridCards)
  }
}

const modelGridCards = {
  service: ServiceGridCard,
  title: TitleGridCard,
  shift: ShiftGridCard,
  shiftType: ShiftTypeGridCard
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


export default new GridCards(gridCards)
