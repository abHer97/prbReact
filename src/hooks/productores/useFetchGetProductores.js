import { useState, useEffect } from 'react';
import httpSource from '../../helpers/httpGet';

let urlProductoresGet =
	'https://siticl-apis-dev.azurewebsites.net/empresas/prueba/v1/catalogos/productores/';

export const useFetchGetProductores = () => {
	const [state, setstate] = useState({
		status: 0,
		mensaje: '',
		detalles: '',
		data: {},
		loading: true
	});

	useEffect(() => {
		httpSource(urlProductoresGet, 'GET').then((data) => {
			setstate({
				status: data.status,
				mensaje: data.mensaje,
				detalles: data.detalles,
				data: data.data,
				loading: false
			});
		});
	}, []);

	return state;
};
