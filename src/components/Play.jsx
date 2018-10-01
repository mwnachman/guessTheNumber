import React from 'react'
import PropTypes from 'prop-types'

class Play extends React.Component {
  constructor(props) {
    super(props)
    this._initState = {
      guess: ''
    }
    this.resetState = this.resetState.bind(this)
    this.changeGuess = this.changeGuess.bind(this)
    this.submitGuess = this.submitGuess.bind(this)
    this.state = this._initState
  }

  resetState() {
    this.setState(this._initState)
  }

  changeGuess({target: {value}}) {
    this.setState({guess: value})
  }

  submitGuess() {
    this.props.processGuess(this.state.guess)
    this.resetState()
  }

  render() {
    const {
      lowerBound,
      upperBound,
      lastGuess,
      statusMessage
    } = this.props
    return (
      <div className="form-section">
        <h1>Play!</h1>
        <div>
          Guess a number between {lowerBound} and {upperBound}.
        </div>
        {lastGuess &&
          <div>Last guess: {lastGuess}</div>
        }
        <div>{statusMessage}</div>
        <div>
          Guess:
          <input onChange={this.changeGuess}
                 value={this.state.guess}/>
        </div>
        <button onClick={this.submitGuess}>Make Guess</button>
      </div>
    )
  }
}
Play.propTypes = {
  lowerBound: PropTypes.string,
  upperBound: PropTypes.string,
  lastGuess: PropTypes.string,
  processGuess: PropTypes.func,
  statusMessage: PropTypes.string
}

export default Play
