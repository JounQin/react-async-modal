import React from 'react'

import Modal from '../lib/Modal'

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.$modal.open({
      component: import('./AsyncModal')
    })
  }

  render() {
    return (
      <div id="app">
        <button onClick={this.handleClick}>Load Async Modal</button>
        <Modal id="modal" />
      </div>
    )
  }
}
