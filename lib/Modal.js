import React from 'react'

const isPromise = promise =>
  Object.prototype.toString.call(promise) === '[object Promise]' || promise instanceof Promise

const DEFAULT_OPTIONS = {
  show: true,
  backdrop: true,
  destroy: false
}

export default class extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      modals: [],
      currModalId: null,
      currModal: null
    }
  }

  componentDidMount() {
    Object.defineProperty(React.Component.prototype, '$modal', {
      value: this
    })
  }

  close() {
    return Promise.resolve()
  }

  open(modal) {
    modal.id = modal.id || Date.now()
    return isPromise(modal.component)
      ? modal.component.then(component =>
          this.resolve(Object.assign(modal, {component: component.default || component}))
        )
      : this.resolve(modal)
  }

  getModal(modalId) {
    return this.state.modals.find(m => m.id === modalId)
  }

  resolve(modal) {
    const {id, component, props, options} = modal

    const m = this.getModal(id)
    if (m) {
      component && (m.component = component)
      modal = m
    } else if (!component) {
      return Promise.reject(new ReferenceError('no component passed on initialization'))
    }

    modal.props = {...props}

    const opts = {...DEFAULT_OPTIONS, ...options}
    if (!opts.show) {
      modal.options = opts
      return Promise.resolve()
    }
    const promise = this.state.currModalId === id ? Promise.resolve() : this.close()

    return promise.then(() => {
      modal.options = opts
      m ||
        this.setState({
          modals: [...this.state.modals, modal]
        })
      this.setState({currModal: modal})
    })
  }

  render() {
    return this.state.modals.length ? (
      <div {...this.props}>
        <div className="modal-backdrop in"/>
        {this.state.modals.map(({id, component: ModalItem, props}) => <ModalItem id={id} key={id} {...props} />)}
      </div>
    ) : null
  }
}
