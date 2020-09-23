import React, { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

export const BtnLimpiar = memo(({ handleLimpiar }) => {
   const handleClick = (e) => {
      e.preventDefault();
      handleLimpiar();
   };
   return (
      <button
         onClick={handleClick}
         className='w-full py-4 rounded-r-lg text-orange-800 border-2 border-orange-800'>
         Limpiar <FontAwesomeIcon icon={faEraser} className='text-orange-800 ml-2' />
      </button>
   );
});
