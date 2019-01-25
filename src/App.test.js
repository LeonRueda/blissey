import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-testing-library'
import App from './App';
import __ from './i18n'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
})

test('renders planning crud', async() => {
  const {getByText} = render(
    <App  />,
  )
  const DashboardButton = getByText(__('Dashboard'))
  const PlannersButton = getByText(__('Planners'))
  const OnButton = getByText(__('On Going Planners'))
  const ShiftsButton = getByText(__('Shifts'))
  const BuildingsButton = getByText(__('Buildings'))
  const ServicesButton = getByText(__('Services'))
  const UsersButton = getByText(__('Users'))
  const RulesButton = getByText(__('Rules'))
  const SettingsButton = getByText(__('Settings'))

  expect(DashboardButton).not.toBe(undefined)
  expect(PlannersButton).not.toBe(undefined)
  expect(OnButton).not.toBe(undefined)
  expect(ShiftsButton).not.toBe(undefined)
  expect(BuildingsButton).not.toBe(undefined)
  expect(ServicesButton).not.toBe(undefined)
  expect(UsersButton).not.toBe(undefined)
  expect(RulesButton).not.toBe(undefined)
  expect(SettingsButton).not.toBe(undefined)
});
