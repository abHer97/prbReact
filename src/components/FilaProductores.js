import React from 'react';
import { Btn } from './Btn';

export const FilaProductores = ({ id, folio, productor, idTipo, tipo, handleAction }) => {
	return (
		<tr className="animate__animated animate__fadeIn">
			<td className="hidden">{id}</td>
			<td className="p-1">{folio}</td>
			<td className="p-1">{productor}</td>
			<td className="hidden">{idTipo}</td>
			<td className="p-1">{tipo}</td>
			<td className="p-1">{<Btn onClick={handleAction} tipoBoton="eliminarPequeño" />}</td>
		</tr>
	);
};
