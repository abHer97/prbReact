import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

import '../index.css';
import '../styles/mystyle.css';

export const Btn = ({ handleAction, tipoBoton }) => {
	const handleClick = (e) => {
		e.preventDefault();
		handleAction();
	};
	return (
		<>
			{tipoBoton === 'buscar' ? (
				<button onClick={handleClick} className="py-2 px-3 bg-gray-300 h-10 w-12 mt-auto">
					<FontAwesomeIcon icon={faSearch} className="text-black text-xl" />
				</button>
			) : tipoBoton === 'editar' ? (
				<button onClick={handleClick} className="bg-blue-500 w-full py-4 text-white">
					Editar <FontAwesomeIcon icon={faPen} className="text-white ml-2" />
				</button>
			) : tipoBoton === 'eliminarPequeño' ? (
				<button onClick={handleClick}>
					<FontAwesomeIcon icon={faTrashAlt} className="text-red-700 text-2xl mt-1" />
				</button>
			) : tipoBoton === 'eliminar' ? (
				<button onClick={handleClick} className="bg-red-700 w-full py-4 text-white">
					Eliminar
					<FontAwesomeIcon icon={faTrashAlt} className="text-white ml-2" />
				</button>
			) : (
				<button onClick={handleClick} className="bg-green-500 w-full py-4 text-white">
					Nuevo <FontAwesomeIcon icon={faPlus} className="text-white ml-2" />
				</button>
			)}
		</>
	);
};
