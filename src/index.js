import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import {Stats} from './Stats'


ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/stats' component={Stats} />
        </div>
    </BrowserRouter>, document.getElementById('root')
);

registerServiceWorker();
