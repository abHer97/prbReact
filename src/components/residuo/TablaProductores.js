import React, { useState } from 'react';
import { useFetchGetProductores } from '../hooks/productores/useFetchGetProductores';
// import { Btn } from './Btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const TablaProductores = () => {
   const [productores, setProductores] = useState({
      folio: 0,
      id: 0,
      idTipo: '',
      productor: '',
      tipo: ''
   });
   const [idProductor, setIdProductor] = useState(0);
   const { ok, status, mensaje, data, loading } = useFetchGetProductores();
   function obtenerDatosProductor(datos) {
      setProductores(datos);
      console.log(productores);
      console.log(datos);
   }

   function obtenerIdProductor(id) {
      setIdProductor(id);
      console.log(idProductor);
   }

   return (
      <div className='overflow-y-scroll tblProductores border-b border-black relative'>
         <table id='tblProductores' className='my-table'>
            <thead id='tbthProductores' className='text-white'>
               <tr>
                  <th className='hidden'>Id</th>
                  <th className='w-1/6 text-left pl-2 bg-gray-800 sticky top-0 shadow-lg z-10'>
                     Folio
                  </th>
                  <th className='w-3/6 text-left pl-2 bg-gray-800 sticky top-0 shadow-lg z-10'>
                     Productor
                  </th>
                  <th className='hidden'>IdTipo</th>
                  <th className='w-2/6 text-left pl-2 bg-gray-800 sticky top-0 shadow-lg z-10'>
                     Tipo
                  </th>
                  <th className='w-10 text-left bg-gray-800 sticky top-0 shadow-lg z-10 cEliminar'></th>
               </tr>
            </thead>
            <tbody id='tblProdBody'>
               {loading ? (
                  <tr>
                     <td
                        className='animate__animated animate__flash animate__infinite text-center'
                        colSpan='5'>
                        Cargando...
                     </td>
                  </tr>
               ) : status === 200 ? (
                  data.map((dato) => {
                     // id, folio, productor, idTipo, tipo, handleAction
                     let { folio, id, idTipo, productor, tipo } = dato;
                     return (
                        <tr
                           className='animate__animated animate__fadeIn hover:bg-gray-300'
                           key={id}
                           onClick={() => {
                              obtenerDatosProductor({
                                 folio,
                                 id,
                                 idTipo,
                                 productor,
                                 tipo
                              });
                           }}>
                           <td className='hidden'>{id}</td>
                           <td className='p-1'>{folio}</td>
                           <td className='p-1'>{productor}</td>
                           <td className='hidden'>{idTipo}</td>
                           <td className='p-1'>{tipo}</td>
                           <td className='p-1'>
                              <button
                                 onClick={() => {
                                    obtenerIdProductor(id);
                                 }}>
                                 <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className='text-red-700 text-2xl mt-1'
                                 />
                              </button>
                           </td>
                        </tr>
                     );
                  })
               ) : (
                  <tr>
                     <td colSpan='5' className='text-center text-red-700'>
                        Se ha producido un error {status}
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};
