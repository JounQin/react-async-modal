import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import App from './App'

const renderApp = App => {
  const temp = document.createElement('div')

  render(
    process.env.NODE_ENV === 'production' ? (
      <App />
    ) : (
      <AppContainer>
        <App />
      </AppContainer>
    ),
    temp
  )

  const app = document.getElementById('app')
  app.parentNode.replaceChild(temp.children[0], app)
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./App', () => renderApp(App))
}
