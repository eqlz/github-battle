import React from 'react'
import { getBattleResults } from '../utils/api'

export default class Results extends React.Component {
  componentDidMount() {
    const { playerOneUserName, playerTwoUserName } = this.props;
    getBattleResults([playerOneUserName, playerTwoUserName])
      .then((battleResults) => {
        console.log('battle results: ', battleResults);
      })
  }
  render() {
    return (
      <div>
        Results
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}