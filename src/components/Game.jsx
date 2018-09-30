import React from 'react'
import PropTypes from 'prop-types'
import Play from './Play.jsx'
import GameConfig from './GameConfig.jsx'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this._initState = {
      lastGuess: '',
      lowerBound: '1',
      upperBound: '10'
    }
    this.changeBounds = this.changeBounds.bind(this)
    this.processGuess = this.processGuess.bind(this)
    this.state = this._initState
  }

  changeBounds(lowerBound, upperBound) {
    this.setState({lowerBound, upperBound})
  }

  processGuess(lastGuess) {
    this.setState({lastGuess})
  }

  render() {
    return (
      <div>
        <Play processGuess={this.processGuess}/>
        <GameConfig lowerBound={this.state.lowerBound}
                    upperBound={this.state.upperBound}
                    changeBounds={this.changeBounds}/>
      </div>
    )
  }
}

export default Game
