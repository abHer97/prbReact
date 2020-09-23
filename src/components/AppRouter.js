import React from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { NavBar } from './NavBar';
import { Productores } from '../pages/Productores';

export const AppRouter = () => {
   return (
      <Router>
         <div className='flex-grow flex flex-col'>
            <NavBar />
            <div className='flex-grow flex'>
               <Switch>
                  <Route exact path='/' component={Productores} />
                  <Redirect to='/' />
               </Switch>
            </div>
         </div>
      </Router>
   );
};
