import React from 'react';
import { MenuProvider } from './context/menu-context';
import Home from './views/home';

function App() {
	return (
		<MenuProvider>
			<Home />
		</MenuProvider>
	);
}

export default App;
