import {pathOr} from 'ramda'
import ServiceGridCard from '../service/ServiceGridCard'
import TitleGridCard from '../title/TitleGridCard'
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
  title: TitleGridCard
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
  user: {
    title: modelGridCards.title,
    services: modelGridCards.service,
    ...actionsGridCards
  }
}


export default new GridCards(gridCards)
