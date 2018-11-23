import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './container/login'
import AuthRoute from './component/authRoute'
import Dashboard from './component/dashboard'
import Register from './container/register'
import Bossinfo from './container/bossinfo'
import Geniusinfo from './container/geniusinfo'
import Chat from './container/chat'
import reducers from './reducer'
import './config'
import './index.css'



const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/bossinfo' component={Bossinfo}></Route>
          <Route path='/geniusinfo' component={Geniusinfo}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
