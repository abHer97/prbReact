import { useState, useEffect } from 'react';
import httpSource from '../../helpers/httpGet';

let urlProductoresPost = `https://siticl-apis-dev.azurewebsites.net/empresas/prueba/v1/catalogos/productores/`;
export const useFetchPostProductores = (data) => {
	const [state, setstate] = useState({
		ok: false,
		status: 0,
		mensaje: '',
		detalles: '',
		data: {},
		loading: true
	});

	useEffect(() => {
		httpSource(urlProductoresPost, 'POST', data).then((response) => {
			setstate({
				ok: response.ok,
				status: response.status,
				mensaje: response.mensaje,
				detalles: response.detalles,
				data: response.data,
				loading: false
			});
		});
	}, []);

	return state;
};
