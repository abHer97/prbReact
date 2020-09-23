import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const TablaProductores = ({
   dataResponse,
   obtenerDatosDeTabla,
   setEstaAbierta,
   estaAbierta
}) => {
   //    const handleClick = (e) => {
   //       e.preventDefault();
   //       handleDataEliminar;
   //       setEstaAbierta(!estaAbierta);
   //    };
   return (
      <div className='overflow-y-scroll tblProductores border-b border-black relative'>
         <table id='tblProductores' className='my-table'>
            <thead id='tbthProductores' className='text-white'>
               <tr>
                  <th className='hidden'>Id</th>
                  <th className='w-1/6 text-left pl-2 bg-gray-800 sticky top-0 shadow-lg'>
                     Folio
                  </th>
                  <th className='w-3/6 text-left pl-2 bg-gray-800 sticky top-0 shadow-lg'>
                     Productor
                  </th>
                  <th className='hidden'>IdTipo</th>
                  <th className='w-2/6 text-left pl-2 bg-gray-800 sticky top-0 shadow-lg'>
                     Tipo
                  </th>
                  <th className='w-10 text-left bg-gray-800 sticky top-0 shadow-lg cEliminar'></th>
               </tr>
            </thead>
            <tbody id='tblProdBody'>
               {dataResponse.loading ? (
                  <tr>
                     <td
                        className='animate__animated animate__flash animate__infinite text-center'
                        colSpan='5'>
                        Cargando...
                     </td>
                  </tr>
               ) : dataResponse.status === 200 || dataResponse.status === 201 ? (
                  dataResponse.data.map((dato) => {
                     let { folio, id, idTipo, productor, tipo } = dato;
                     return (
                        <tr
                           className='animate__animated animate__fadeIn hover:bg-gray-300'
                           key={id}
                           onClick={() => {
                              obtenerDatosDeTabla({
                                 folio,
                                 id,
                                 idTipo,
                                 productor,
                                 tipo
                              });
                           }}>
                           <td className='hidden'>{id}</td>
                           <td className='p-1 pl-2'>{folio}</td>
                           <td className='p-1 pl-2'>{productor}</td>
                           <td className='hidden'>{idTipo}</td>
                           <td className='p-1 pl-2'>{tipo}</td>
                           <td className='p-1'>
                              <FontAwesomeIcon
                                 onClick={() => {
                                    obtenerDatosDeTabla(dato);
                                    setEstaAbierta(!estaAbierta);
                                 }}
                                 icon={faTrashAlt}
                                 className='text-red-700 text-2xl mt-1'
                              />
                           </td>
                        </tr>
                     );
                  })
               ) : (
                  <tr>
                     <td colSpan='5' className='text-center text-red-700'>
                        {`${dataResponse.mensaje} ${dataResponse.detalles}`}
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};
