import React from 'react'

import ModalItem from '../lib/ModalItem'

export default class extends React.PureComponent {
  render() {
    return (
      <ModalItem header="I'm title" footer={true}>
        Async Modal
      </ModalItem>
    )
  }
}
