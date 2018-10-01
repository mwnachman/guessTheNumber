import React from 'react'
import PropTypes from 'prop-types'
import { generateRandomNumber } from '../utils/utils'
import Play from './Play.jsx'
import GameConfig from './GameConfig.jsx'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this._initState = {
      lastGuess: '',
      lowerBound: '1',
      upperBound: '10',
      statusMessage: ''
    }
    this.setWinningNumber = this.setWinningNumber.bind(this)
    this.changeBounds = this.changeBounds.bind(this)
    this.processGuess = this.processGuess.bind(this)
    this.setStatusMessage = this.setStatusMessage.bind(this)
    this.state = this._initState
  }

  componentDidMount() {
    // Set the initial winning number
    this.setWinningNumber()
  }

  setWinningNumber() {
    const lower = parseInt(this.state.lowerBound)
    const upper = parseInt(this.state.upperBound)
    const winningNumber = generateRandomNumber(lower, upper)
    this.setState({winningNumber, lastGuess: '', statusMessage: ''})
  }

  changeBounds(lowerBound, upperBound) {
    // Change the upper & lower boundaries
    // Then reset the winning number within the new bounds
    this.setState({lowerBound, upperBound},
      () => this.setWinningNumber())
  }

  processGuess(lastGuess) {
    const status = this.setStatusMessage(lastGuess)
    this.setState({lastGuess})
  }

  setStatusMessage(lastGuess) {
    const guess = Number(lastGuess)
    const { winningNumber, lowerBound, upperBound } = this.state
    const withinBounds = guess >= lowerBound && guess <= upperBound
    let statusMessage
    if (guess === winningNumber) {
      statusMessage = 'You got it!'
    } else if (guess > winningNumber && withinBounds) {
      statusMessage = 'Nope. Lower'
    } else if (guess < winningNumber && withinBounds) {
      statusMessage = 'Nope. Higher.'
    } else {
      // Catchall for out of range, non-number entries, etc.
      statusMessage = 'What are you doing???'
    }
    this.setState({statusMessage})
  }

  render() {
    const {
      lowerBound,
      upperBound,
      lastGuess,
      statusMessage
    } = this.state
    return (
      <div className="container">
        <Play processGuess={this.processGuess}
              lowerBound={lowerBound}
              upperBound={upperBound}
              lastGuess={lastGuess}
              statusMessage={statusMessage}/>
        <GameConfig lowerBound={lowerBound}
                    upperBound={upperBound}
                    changeBounds={this.changeBounds}/>
      </div>
    )
  }
}

export default Game
