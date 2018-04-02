import {pathOr} from 'ramda'
import ServiceGridCard from '../service/ServiceGridCard'
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
  service: ServiceGridCard
}

const actionsGridCards = {
  edit: EditGridCard,
  delete: DeleteGridCard,
}

const gridCards = {
  building: {
    services: modelGridCards.service,
    edit: actionsGridCards.edit,
    delete: actionsGridCards.delete,
  }
}


export default new GridCards(gridCards)
