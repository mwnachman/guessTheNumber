import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import test from 'tape'
import sinon from 'sinon'
import Play from '../../src/components/Play.jsx'

Enzyme.configure({ adapter: new Adapter() });

test('Play', ({test}) => {
  test('renders input & button', assert => {
    const playWrapper = Enzyme.shallow(<Play/>)
    const inputWrapper = playWrapper.find('input')
    const buttonWrapper = playWrapper.find('button')
    assert.true(inputWrapper.length === 1,
      'one input should render')
    assert.true(buttonWrapper.length === 1,
      'one button should render')
    assert.end()
  })

  test('user makes guess', assert => {
    const guess = '5'
    const processGuessSpy = sinon.spy()

    const playWrapper = Enzyme.shallow(
      <Play processGuess={processGuessSpy}/>)
    const resetStateSpy = sinon.spy(
      playWrapper.instance(), 'resetState')

    playWrapper.setState({guess})
    playWrapper.instance().submitGuess()

    assert.true(processGuessSpy.calledOnce,
      'processGuess called once')
    assert.true(processGuessSpy.calledWith('5'),
      'processGuess prop called with guess')
    assert.true(resetStateSpy.calledOnce,
      'resetState is called once')

    const newGuessState = playWrapper.state().guess
    assert.true(newGuessState === '',
      'guess is set back to empty string')
    assert.end()
  })
})
