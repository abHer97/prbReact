import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { BtnBuscar } from './BtnBuscar';

export const BuscarProductor = ({ handleBuscar }) => {
   return (
      <div className='w-2/4 mb-4 flex'>
         <div className='w-5/6 relative'>
            <label className='text-sm text-gray-500'>Busque un productor</label>
            <input
               id='txtProductorBuscar'
               name='productor'
               className='w-full h-8 pl-8 border-b border-gray-500 rounded-t-md inline-block'
            />
            <FontAwesomeIcon className='input-prefix text-gray-600' icon={faUser} />
         </div>
         <BtnBuscar handleBuscar={handleBuscar} />
      </div>
   );
};
