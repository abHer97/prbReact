const headers = new Headers({
	Authorization: 'Bearer ' + localStorage.Token,
	'Content-Type': 'application/json; charset=utf-8'
});

async function httpSource(url, httpVerb, data = false) {
	let miInit = {};

	if (data) {
		miInit = { method: httpVerb, headers: headers, body: JSON.stringify(data) };
	} else {
		miInit = { method: httpVerb, headers: headers };
	}

	let response = await fetch(url, miInit).then(async (response) => {
		const { status } = response;
		if (status === 200 || status === 201) {
			const datos = await response.json();
			console.log(data);
			if (!data) {
				const { mensaje, productores: data } = datos;
				const productores = data.map((dato) => {
					return {
						folio: dato.folio,
						id: dato.id,
						idTipo: dato.idTipo,
						productor: dato.productor,
						tipo: dato.tipo
					};
				});
				return {
					status: status,
					mensaje: mensaje,
					detalles: '',
					data: productores
				};
			} else {
				const { mensaje, detalles } = datos;
				return {
					status: status,
					mensaje: mensaje,
					detalles: detalles ? detalles : '',
					data: {}
				};
			}
		} else {
			let resp = {
				status: status,
				mensaje: '',
				detalles: '',
				data: {}
			};
			switch (status) {
				case 400:
					resp.mensaje = 'Campos requeridos vacios';
					break;
				case 401:
					resp.mensaje = 'No cuentas con permisos para realizar esta acción';
					break;
				case 404:
					resp.mensaje = 'Recursos no encontrados, parametros inválidos';
					break;
				case 500:
					resp.mensaje =
						'Error interno del servidor, Favor de comunicarse con el area de soporte info@siticl.com';
					break;
				default:
					resp.mensaje = 'Ha ocurrido un error, intente de nuevo más tarde';
					break;
			}
			return resp;
		}
	});
	return response;
}

export default httpSource;
