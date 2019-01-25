import {render} from 'react-testing-library'
import React from 'react'

import PlanningComponent from './PlanningMainComponent'
import {createStore} from 'redux'
import reducers from '../../../redux/reducers'

import {Provider} from 'react-redux'
import __ from '../../../i18n/messages'

import {esureAllByText} from '../../../../test/utils'

const initialState = {
  planning: {
    collection: [
      {
        id: 'unique',
        name: 'Principal',
        period: {
          "createdAt": "2018-10-08T03:22:46.738Z",
          "updatedAt": "2018-10-08T03:22:46.738Z",
          "name": "Mensual",
          "id": "5bbacd8627b01d0739800e13"
        },
        building: {
          name: 'Edificio Principal'
        },
        services: [
          {
            id: 'service1',
            color: 'red'
          },
          {
            id: 'service2',
            color: 'blue'
          }
        ],
        nurses: [
          {
            id: 'nurse1',
            name: 'nurse one'
          },
          {
            id: 'nurse2',
            name: 'nurse two'
          }
        ]
      }
    ]
  }
}

const store = createStore(reducers, initialState);

describe('PlanningComponent', () => {
  test('shows a list of Plannings', () => {
    const {getByText, getAllByText} = render(
      <Provider store={store}>
        <PlanningComponent  />
      </Provider>
    )

    esureAllByText(getByText, [
      'Principal',
      'Mensual',
      'Edificio Principal',
      'nurse one',
      'nurse two'
    ])

    const services = getAllByText(__('local_hospital'))
    expect(services).not.toBe(undefined)
    expect(services.length).toBe(2)
  })
})
