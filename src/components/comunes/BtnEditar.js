import React, { memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export const BtnEditar = memo(({ handleEditar }) => {
   const handleClick = (e) => {
      e.preventDefault();
      handleEditar();
   };
   return (
      <button
         onClick={handleClick}
         className='w-full py-4 rounded-l-lg bg-blue-500 text-white border-2 border-blue-700'>
         Editar <FontAwesomeIcon icon={faPen} className='text-white ml-2' />
      </button>
   );
});
