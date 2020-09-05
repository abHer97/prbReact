import React from 'react';
import '../styles/index.css';
import '../index.css';

export const NavBar = () => {
	return (
		<nav className="bg-green-500 px-4 pt-4 mb-6">
			<div className="container mx-auto flex">
				<a className="mr-6 font-semibold text-xl tracking-tight text-white">Inicio</a>
				<ul className="flex">
					<li className="-mb-px mr-1">
						<a className="bg-gray-300 inline-block border-l border-gray-300 border-t border-r rounded-t py-2 px-4 text-green-500 font-semibold">
							Productores
						</a>
					</li>
					<li className="mr-1">
						<a className="inline-block py-2 px-4 text-white hover:text-green-800 font-semibold">
							Camiones
						</a>
					</li>
					<li className="mr-1">
						<a className="inline-block py-2 px-4 text-white hover:text-green-800 font-semibold">
							Ranchos
						</a>
					</li>
					<li className="mr-1">
						<a className="inline-block py-2 px-4 text-white hover:text-green-800 font-semibold">
							Fruta
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};
