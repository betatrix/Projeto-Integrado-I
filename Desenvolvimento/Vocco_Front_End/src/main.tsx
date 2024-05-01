import React from 'react'
import GlobalStyle from './styles/globalStyles'
import ReactDOM from 'react-dom/client'
import App from './app'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    < App />
  </React.StrictMode>,
)







// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import Login from './containers/Login'
// import GlobalStyle from './styles/globalStyles'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <GlobalStyle />
//     <Login />
//   </React.StrictMode>,
// )

