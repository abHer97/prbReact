import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';

import { BtnEditar } from '../comunes/BtnEditar';
import { BtnLimpiar } from '../comunes/BtnLimpiar';
import { BtnNuevo } from '../comunes/BtnNuevo';

export const FormProductores = ({
   dataProductores,
   handleChange,
   handleChangeSelect,
   handleEditar,
   handleLimpiar,
   handleNuevo,
   idTipo,
   editar
}) => {
   return (
      <form>
         <div className='w-full my-8 relative'>
            <label className='text-sm text-gray-500'>Folio:</label>
            <input
               id='txtFolio'
               name='folio'
               value={dataProductores.folio}
               onChange={handleChange}
               className='w-full h-8 pl-8 border-b border-gray-500'
            />
            <FontAwesomeIcon className='input-prefix text-gray-600' icon={faClipboard} />
         </div>
         <div className='w-full my-8 relative'>
            <label className='text-sm text-gray-500'>Productor:</label>
            <input
               id='txtProductor'
               name='productor'
               value={dataProductores.productor}
               onChange={handleChange}
               className='w-full h-8 pl-8 border-b border-gray-500 rounded-t-md'
            />
            <FontAwesomeIcon className='input-prefix text-gray-600' icon={faUser} />
         </div>
         <div className='w-full my-8 relative'>
            <label className='text-sm text-gray-500'>Tipo:</label>
            <select
               name='tipo'
               value={idTipo.toUpperCase()}
               onChange={handleChangeSelect}
               className='w-full h-8 pl-8 border-b border-gray-500'>
               <option disabled value=''>
                  -- Seleccionar ---
               </option>
               <option value='48FE2712-D019-4861-AB18-95B882F3B54E'>PROVEEDOR</option>
               <option value='4AE9C33F-1359-4174-8F6E-D36A2AB48B7A'>RANCHO</option>
            </select>
            <FontAwesomeIcon className='input-prefix text-gray-600' icon={faInfoCircle} />
         </div>
         <div className='flex rounded-lg overflow-hidden'>
            {editar ? (
               <BtnEditar handleEditar={handleEditar} />
            ) : (
               <BtnNuevo handleNuevo={handleNuevo} />
            )}
            <BtnLimpiar handleLimpiar={handleLimpiar} />
         </div>
      </form>
   );
};
