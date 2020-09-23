import React from 'react';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BtnBuscar = ({ handleBuscar }) => {
   const handleClick = (e) => {
      e.preventDefault();
      handleBuscar();
   };
   return (
      <button onClick={handleClick} className='py-2 px-3 bg-gray-300 h-10 w-12 mt-auto'>
         <FontAwesomeIcon icon={faSearch} className='text-black text-xl' />
      </button>
   );
};
