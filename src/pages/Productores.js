import React, { useState, useEffect, useCallback } from 'react';

import httpSource from '../helpers/httpGet';
import { urlProductores } from '../helpers/urls';
import { FormProductores } from '../components/productores/FormProductores';
import { TituloPrincipal } from '../components/comunes/TituloPrincipal';
import { BuscarProductor } from '../components/comunes/BuscarProductor';
import { TablaProductores } from '../components/productores/TablaProductores';
import { ModalEliminar } from '../components/productores/ModalEliminar';

export const Productores = () => {
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
      httpSource(urlProductores, 'GET').then((resp) => {
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
      httpSource(urlProductores, 'POST', data).then((resp) => {
         if (resp.status === 201) {
            setActualizar(!actualizar);
            handleLimpiar();
         } else {
            setdataResponse({
               ...dataResponse,
               status: resp.status,
               mensaje: resp.mensaje,
               detalles: resp.detalles
            });
         }
      });
   };

   const putProductores = (idProductor, data) => {
      httpSource(`${urlProductores}/${idProductor}`, 'PUT', data).then((resp) => {
         if (resp.status === 200) {
            // setActualizar(!actualizar);
            handleLimpiar();
         } else {
            setdataResponse({
               ...dataResponse,
               status: resp.status,
               mensaje: resp.mensaje,
               detalles: resp.detalles
            });
         }
      });
   };

   const deleteProductores = (idProductor) => {
      httpSource(`${urlProductores}/${idProductor}`, 'DELETE', {}).then((resp) => {
         if (resp.status === 200) {
            setEstaAbierta(!estaAbierta);
            handleLimpiar();
         } else {
            setdataResponse({
               ...dataResponse,
               status: resp.status,
               mensaje: resp.mensaje,
               detalles: resp.detalles
            });
         }
      });
   };

   useEffect(() => {
      getProductores();
   }, [actualizar]);

   function obtenerDatosDeTabla(datos) {
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
      setProductores({
         ...productores,
         [name]: value
      });
   };

   const handleChangeSelect = (e) => {
      setIdTipo(e.target.value);
   };

   const handleLimpiar = useCallback(() => {
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
   }, [setProductores, setEditar, setIdTipo, setActualizar]);

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

   const handleNuevo = () => {
      const data = obtenerDatos();
      postProductores(data);
   };

   const handleEditar = useCallback(() => {
      const data = obtenerDatos();
      putProductores(productores.id, data);
   }, [putProductores]);

   return (
      <main className='container flex-grow mx-auto bg-white rounded-t flex'>
         <aside className='w-2/6 px-6 py-4'>
            <FormProductores
               dataProductores={productores}
               editar={editar}
               idTipo={idTipo}
               handleChange={handleChange}
               handleChangeSelect={handleChangeSelect}
               handleEditar={handleEditar}
               handleNuevo={handleNuevo}
               handleLimpiar={handleLimpiar}
            />
         </aside>
         <article className='w-4/6 px-6 py-4'>
            <TituloPrincipal titulo='Lista de productores' />
            <BuscarProductor handleBuscar={handleBuscar} />
            <TablaProductores
               dataResponse={dataResponse}
               obtenerDatosDeTabla={obtenerDatosDeTabla}
               setEstaAbierta={setEstaAbierta}
               estaAbierta={estaAbierta}
            />
         </article>
         <ModalEliminar
            dataProductores={productores}
            estaAbierta={estaAbierta}
            deleteProductores={deleteProductores}
            setEstaAbierta={setEstaAbierta}
         />
      </main>
   );
};
