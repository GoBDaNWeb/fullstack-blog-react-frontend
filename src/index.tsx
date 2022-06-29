// * react
import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter} from 'react-router-dom'

// * redux
import {store} from './redux/store'
import {Provider} from 'react-redux'

// * styles
import "./styles/index.scss";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

// * components
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	</>
);
