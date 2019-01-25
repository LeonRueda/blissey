import {forEach} from 'ramda'
import __ from '../src/i18n/messages'

export const esureAllByText = (getByText, texts) => forEach(ensureByText(getByText), texts)

const ensureByText = getByText => text => {
  const element = getByText(__(text))
  expect(element).not.toBe(undefined)
}
