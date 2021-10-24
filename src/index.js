import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import Main from './Components/Main'
import store from './store/index'  //importing store under the store folder

//set the store; start routing from the homepage
ReactDOM.render(
    <Provider store={store}>
     <Router>
         <Main />
     </Router>
    </Provider>,
    document.getElementById('root')
) 