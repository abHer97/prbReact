import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faClipboard,
   faUser,
   faInfoCircle,
   faTrashAlt,
   faPlus,
   faSearch,
   faEraser,
   faPen
} from '@fortawesome/free-solid-svg-icons';

import httpSource from '../helpers/httpGet';

let url =
   'https://siticl-apis-dev.azurewebsites.net/empresas/prueba/v1/catalogos/productores/';

Modal.setAppElement('#root');

export const Content = () => {
   const [dataResponse, setdataResponse] = useState({
      status: 0,
      mensaje: '',
      detalles: '',
      data: {},
      loading: true
   });

   const [productores, setProductores] = useState({
      folio: '',
      id: '',
      idTipo: '',
      productor: '',
      tipo: ''
   });

   const [editar, setEditar] = useState(false);
   const [actualizar, setActualizar] = useState(false);
   const [estaAbierta, setEstaAbierta] = useState(false);
   const [idTipo, setIdTipo] = useState('');

   const getProductores = () => {
      httpSource(url, 'GET').then((resp) => {
         setdataResponse({
            status: resp.status,
            mensaje: resp.mensaje,
            detalles: resp.detalles,
            data: resp.data,
            loading: false
         });
      });
   };

   const postProductores = (data) => {
      httpSource(url, 'POST', data).then((resp) => {
         if (resp.status === 201) {
            setActualizar(!actualizar);
            handleLimpiar();
         } else {
            setdataResponse((prevState) => ({
               ...prevState,
               status: resp.status,
               mensaje: resp.mensaje,
               detalles: resp.detalles
            }));
         }
      });
   };

   const putProductores = (idProductor, data) => {
      httpSource(`${url}/${idProductor}`, 'PUT', data).then((resp) => {
         if (resp.status === 200) {
            // setActualizar(!actualizar);
            handleLimpiar();
         } else {
            setdataResponse((prevState) => ({
               ...prevState,
               status: resp.status,
               mensaje: resp.mensaje,
               detalles: resp.detalles
            }));
         }
      });
   };

   const deleteProductores = (idProductor) => {
      httpSource(`${url}/${idProductor}`, 'DELETE', {}).then((resp) => {
         console.log(resp);
         if (resp.status === 200) {
            setEstaAbierta(!estaAbierta);
            handleLimpiar();
         } else {
            setdataResponse((prevState) => ({
               ...prevState,
               status: resp.status,
               mensaje: resp.mensaje,
               detalles: resp.detalles
            }));
         }
      });
   };

   useEffect(() => {
      getProductores();
   }, [actualizar]);

   function obtenerDatosDeTabla(datos) {
      console.log(datos);
      setProductores(datos);
      setIdTipo(datos.idTipo);
      setEditar(true);
   }

   function obtenerDatos() {
      return {
         folio: productores.folio,
         productor: productores.productor,
         idTipo: idTipo
      };
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setProductores((prevState) => ({
         ...prevState,
         [name]: value
      }));
   };

   const handleChangeSelect = (e) => {
      setIdTipo(e.target.value);
   };

   const handleLimpiar = (e) => {
      e && e.preventDefault();
      setProductores({
         folio: '',
         id: '',
         idTipo: '',
         productor: '',
         tipo: ''
      });
      setEditar(false);
      setIdTipo('');
      setActualizar(!actualizar);
   };

   const handleBuscar = (e) => {
      e.preventDefault();
      setdataResponse({
         status: 0,
         mensaje: '',
         detalles: '',
         data: {},
         loading: false
      });
   };

   const handleNuevo = (e) => {
      e.preventDefault();
      const data = obtenerDatos();
      postProductores(data);
   };

   const handleEditar = (e) => {
      e.preventDefault();
      const data = obtenerDatos();
      putProductores(productores.id, data);
   };

   const handleEjecutarModal = () => {
      setEstaAbierta(!estaAbierta);
   };

   const handleDataEliminar = (datos) => {
      obtenerDatosDeTabla(datos);
      setEstaAbierta(!estaAbierta);
   };

   const handleEliminar = (e) => {
      e.preventDefault();
      deleteProductores(productores.id);
   };

   return (
      <main className='container flex-grow mx-auto bg-white rounded-t flex'>
         <aside className='w-2/6 px-6 py-4'>
            <form>
               <div className='w-full mb-4 relative'>
                  <label className='text-sm text-gray-500'>Folio:</label>
                  <input
                     id='txtFolio'
                     name='folio'
                     value={productores.folio}
                     onChange={handleChange}
                     className='w-full h-8 pl-8 border-b border-gray-500'
                  />
                  <FontAwesomeIcon
                     className='input-prefix text-gray-600'
                     icon={faClipboard}
                  />
               </div>
               <div className='w-full my-8 relative'>
                  <label className='text-sm text-gray-500'>Productor:</label>
                  <input
                     id='txtProductor'
                     name='productor'
                     value={productores.productor}
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
                     <option value='48FE2712-D019-4861-AB18-95B882F3B54E'>
                        PROVEEDOR
                     </option>
                     <option value='4AE9C33F-1359-4174-8F6E-D36A2AB48B7A'>RANCHO</option>
                  </select>
                  <FontAwesomeIcon
                     className='input-prefix text-gray-600'
                     icon={faInfoCircle}
                  />
               </div>
               {editar ? (
                  <button
                     onClick={handleEditar}
                     className='w-1/2 py-4 rounded-l-lg bg-blue-500 text-white border-2 border-blue-700'>
                     Editar <FontAwesomeIcon icon={faPen} className='text-white ml-2' />
                  </button>
               ) : (
                  <button
                     onClick={handleNuevo}
                     className='w-1/2 py-4 rounded-l-lg bg-green-500 text-white border-2 border-green-700'>
                     Nuevo <FontAwesomeIcon icon={faPlus} className='text-white ml-2' />
                  </button>
               )}
               <button
                  onClick={handleLimpiar}
                  className='w-1/2 py-4 rounded-r-lg text-orange-800 border-2 border-orange-800'>
                  Limpiar
                  <FontAwesomeIcon icon={faEraser} className='text-orange-800 ml-2' />
               </button>
            </form>
         </aside>
         <article className='w-4/6 px-6 py-4'>
            <h2 className='text-center text-3xl'>Lista de productores</h2>
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
               <button
                  onClick={handleBuscar}
                  className='py-2 px-3 bg-gray-300 h-10 w-12 mt-auto'>
                  <FontAwesomeIcon icon={faSearch} className='text-black text-xl' />
               </button>
            </div>
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
                                          handleDataEliminar(dato);
                                          handleEjecutarModal();
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
         </article>
         <Modal isOpen={estaAbierta} className='modal'>
            <h2 className='text-3xl text-center'>Eliminar productor</h2>
            <hr />
            <p className='my-4'>
               ¿Seguro que desea eliminar al productor{' '}
               <span className='italic font-bold'>{productores.productor}</span> de tipo{' '}
               <span className='italic font-bold'>{productores.tipo}</span>?
            </p>
            <div className='flex flex-row-reverse'>
               <button
                  onClick={handleEliminar}
                  className='w-32 py-2 rounded-lg bg-red-500 text-white border-2 border-red-700 ml-2'>
                  Eliminar
               </button>
               <button
                  onClick={handleEjecutarModal}
                  className='w-32 py-2 rounded-lg bg-gray-300 border-2 border-gray-500'>
                  Cancelar
               </button>
            </div>
         </Modal>
      </main>
   );
};
