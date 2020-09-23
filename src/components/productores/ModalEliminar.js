import React from 'react';

import Modal from 'react-modal';

Modal.setAppElement('#root');

export const ModalEliminar = ({
   estaAbierta,
   dataProductores,
   deleteProductores,
   setEstaAbierta
}) => {
   const handleClickEliminar = (e) => {
      e.preventDefault();
      deleteProductores(dataProductores.id);
   };

   const handleClickCancelar = (e) => {
      e.preventDefault();
      setEstaAbierta(!estaAbierta);
   };

   return (
      <Modal isOpen={estaAbierta} className='modal'>
         <h2 className='text-3xl text-center'>Eliminar productor</h2>
         <hr />
         <p className='my-4'>
            ¿Seguro que desea eliminar al productor{' '}
            <span className='italic font-bold'>{dataProductores.productor}</span> de tipo{' '}
            <span className='italic font-bold'>{dataProductores.tipo}</span>?
         </p>
         <div className='flex flex-row-reverse'>
            <button
               onClick={handleClickEliminar}
               className='w-32 py-2 rounded-lg bg-red-500 text-white border-2 border-red-700 ml-2'>
               Eliminar
            </button>
            <button
               onClick={handleClickCancelar}
               className='w-32 py-2 rounded-lg bg-gray-300 border-2 border-gray-500'>
               Cancelar
            </button>
         </div>
      </Modal>
   );
};
