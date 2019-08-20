import React from 'react'
import { getBattleResults } from '../utils/api'

export default class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }
  componentDidMount() {
    const { playerOneUserName, playerTwoUserName } = this.props;
    getBattleResults([playerOneUserName, playerTwoUserName])
      .then((battleResults) => {
        this.setState({
          winner: battleResults[0],
          loser: battleResults[1],
          error: null,
          loading: false,
        })
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        })
      })
  }
  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}