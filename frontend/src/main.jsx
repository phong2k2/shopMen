import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import  { persistor, store } from './redux/store.js'
import GlobalStyle from '@/components/GlobalStyles'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </PersistGate>
      </Provider>,
)
