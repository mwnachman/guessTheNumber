import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import test from 'tape'
import GameConfig from '../../src/components/GameConfig.jsx'

Enzyme.configure({ adapter: new Adapter() });

test('GameConfig', ({test}) => {
  test('renders two inputs & button', assert => {
    const configWrapper = Enzyme.shallow(<GameConfig/>)
    const inputWrapper = configWrapper.find('input')
    const buttonWrapper = configWrapper.find('button')
    assert.true(inputWrapper.length === 2)
    assert.true(buttonWrapper.length === 1)
    assert.end()
  })
})
