import React from 'react'
import {sum, map, propOr} from 'ramda'

const ShiftGridCard = props => {
  const sumBy = by => sum(map(s => parseInt(propOr(0, by, s)), props.value))
  return <span>
    {`Day: ${sumBy('Dia')} Night: ${sumBy('Noche')}`}
  </span>
}

export default ShiftGridCard
