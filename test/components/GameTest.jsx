import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import test from 'tape'
import sinon from 'sinon'
import Game from '../../src/components/Game.jsx'
import Play from '../../src/components/Play.jsx'

Enzyme.configure({ adapter: new Adapter() });

test('Game', ({test}) => {
  test('component rendering', assert => {
    const gameWrapper = Enzyme.shallow(<Game/>)
    const wrapperDiv = gameWrapper.find('.container')
    const playWrapper = gameWrapper.find('Play')
    const configWrapper = gameWrapper.find('GameConfig')
    assert.true(wrapperDiv.length === 1, 'there is one Game div')
    assert.true(playWrapper.length === 1,
      'one Play component is rendered')
    assert.true(configWrapper.length === 1,
      'one GameConfig component is rendered')
    assert.end()
  })

  test('initial winning number set', assert => {
    const gameWrapper = Enzyme.shallow(<Game/>)
    const winningNumber = gameWrapper.state().winningNumber
    const setWinningNumberSpy = sinon.spy(
      gameWrapper.instance(), 'setWinningNumber')
    const setStateSpy = sinon.spy(gameWrapper.instance(), 'setState')
    
    gameWrapper.instance().componentDidMount()
    
    assert.true(setWinningNumberSpy.calledOnce,
      'setWinningNumber is called upon mounting')
    assert.true(setStateSpy.calledOnce,
      'setState is called')
    assert.true(winningNumber >= 1 && winningNumber <= 10,
      'winning number is set between initial bounds')
    assert.end()
  })

  test('when guess is too low', assert => {
    const gameWrapper = Enzyme.shallow(<Game/>)
    const processGuessSpy = sinon.spy(
      gameWrapper.instance(), 'processGuess')
    const setStatusMessageSpy = sinon.spy(
      gameWrapper.instance(), 'setStatusMessage')
    const originalStatusMessage = gameWrapper.state().statusMessage
    const playWrapper = Enzyme.shallow(
      <Play processGuess={processGuessSpy}/>)
    
    assert.true(originalStatusMessage === '',
      'there is not status message prior to guess')
    
    playWrapper.setState({guess: '5', winningNumber: '8'})
    playWrapper.instance().submitGuess()
    
    assert.true(setStatusMessageSpy.calledOnce, 'set status called')
    assert.true(setStatusMessageSpy.calledWith('5'),
      'setStatusMessage is called with the guess')
    
    const newStatusMessage = gameWrapper.state().statusMessage
    assert.equal(newStatusMessage, 'Nope. Higher.',
      'the correct status message is put into state')
    assert.end()
  })
})
