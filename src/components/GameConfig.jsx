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
    this.props.changeBounds(this.state.lowerBound, this.state.upperBound)
  }

  changeLowerBound({target: {value}}) {
    this.setState({lowerBound: value})
  }

  changeUpperBound({target: {value}}) {
    this.setState({upperBound: value})
  }

  render() {
    const { lowerBound, upperBound } = this.props
    return (
      <div>
        <h3>Game Config</h3>
        <div>
          Lower bound:
          <input onChange={this.changeLowerBound} value={this.state.lowerBound}/>
        </div>
        <div>
          Upper bound:
          <input onChange={this.changeUpperBound} value={this.state.upperBound}/>
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
