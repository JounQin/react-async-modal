import React from 'react'

const isString = str => Object.prototype.toString.call(str) === '[object String]'

export default class extends React.PureComponent {
  render() {
    const {props} = this
    const {header, footer} = props

    return <div id={props.id} className="modal in">
      <div className="modal-dialog">
        <div className="modal-content">
          {header ? isString(header) ? <div className="modal-header">
            <button className="close" type="button">×</button>
            <h4 className="modal-title" dangerouslySetInnerHTML={{__html: header}}/>
          </div> : <div className="modal-header">{header}</div> : null}
          <div className="modal-body">
            {props.children}
          </div>
          {footer ? footer === true ? <div className="modal-footer">
            <button className="btn btn-default">{props.cancelText || '取消'}</button>
            <button className="btn btn-primary">{props.confirmText || '确定'}</button>
          </div> : <div className="modal-footer">{footer}</div> : null}
        </div>
      </div>
    </div>
  }
}
