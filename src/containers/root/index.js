import React from 'react'
import { Provider } from 'redux-bundler-react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@components/theme/create-theme'
import App from '@containers/app'

const Root = (store) => (
  <Provider store={store}>
    <ThemeProvider theme={{ primaryColor: '#00A854' }}>
      <App />
    </ThemeProvider>
  </Provider>
);
export default Root
