import React from 'react';

import { NavLink } from 'react-router-dom';

import '../styles/index.css';
import '../index.css';

export const NavBar = () => {
   const activeCssClass =
      'bg-gray-300 text-green-500 border-gray-300 border-l border-t border-r rounded-t';
   return (
      <nav className='bg-green-500 px-4 pt-4 mb-10'>
         <div className='container mx-auto flex'>
            <a className='mr-6 font-semibold text-xl tracking-tight text-white'>Inicio</a>
            <ul className='flex'>
               <li className='-mb-px mr-1'>
                  <NavLink
                     exact
                     to='/'
                     activeClassName={activeCssClass}
                     className='inline-block py-2 px-4 text-white hover:text-green-800 font-semibold'>
                     Productores
                  </NavLink>
               </li>
               <li className='mr-1'>
                  <a className='inline-block py-2 px-4 text-white hover:text-green-800 font-semibold'>
                     Camiones
                  </a>
               </li>
               <li className='mr-1'>
                  <a className='inline-block py-2 px-4 text-white hover:text-green-800 font-semibold'>
                     Ranchos
                  </a>
               </li>
               <li className='mr-1'>
                  <a className='inline-block py-2 px-4 text-white hover:text-green-800 font-semibold'>
                     Fruta
                  </a>
               </li>
            </ul>
         </div>
      </nav>
   );
};
