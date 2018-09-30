import React from 'react'
import PropTypes from 'prop-types'

class GameConfig extends React.Component {
  constructor(props) {
    super(props)
    this._initState = {
      lowerBound: this.props.lowerBound,
      upperBound: this.props.upperBound
    }
    this.reset = this.reset.bind(this)
    this.changeLowerBound = this.changeLowerBound.bind(this)
    this.changeUpperBound = this.changeUpperBound.bind(this)
    this.state = this._initState
  }

  reset() {
    const { lowerBound, upperBound } = this.state
    this.props.changeBounds(lowerBound, upperBound)
  }

  changeLowerBound({target: {value}}) {
    this.setState({lowerBound: value})
  }

  changeUpperBound({target: {value}}) {
    this.setState({upperBound: value})
  }

  render() {
    const { lowerBound, upperBound } = this.state
    return (
      <div className="form-section">
        <h3>Game Config</h3>
        <div>
          Lower bound:
          <input onChange={this.changeLowerBound}
                 value={lowerBound}/>
        </div>
        <div>
          Upper bound:
          <input onChange={this.changeUpperBound}
                 value={upperBound}/>
        </div>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}
GameConfig.propTypes = {
  lowerBound: PropTypes.string,
  upperBound: PropTypes.string,
  changeBounds: PropTypes.func
}

export default GameConfig
