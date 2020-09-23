import React, { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const BtnNuevo = memo(({ handleNuevo }) => {
   const handleClick = (e) => {
      e.preventDefault();
      handleNuevo();
   };

   return (
      <button
         onClick={handleClick}
         className='w-full py-4 rounded-l-lg bg-green-500 text-white border-2 border-green-700'>
         Nuevo <FontAwesomeIcon icon={faPlus} className='text-white ml-2' />
      </button>
   );
});
