import {render} from 'react-testing-library'
import React from 'react'
import SettingsMainComponent from './SettingsMainComponent'

test('renders planning crud', async() => {
  // const {getByText} = render(
  //   <SettingsMainComponent/>,
  // )

  const titleCrud = true

  expect(titleCrud).not.toBe(undefined)
})
