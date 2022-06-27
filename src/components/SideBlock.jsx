// * react
import React from "react";

// * styles/MUI
import "../styles/modules/sideBlock/index.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function SideBlock({ title, children }) {
	return (
		<Paper elevation={1} classes={{ root: 'sideBlock' }}>
			<Typography 
				variant="h6" 
				classes={{ root: 'title' }}
			>
				{title}
			</Typography>
			{children}
		</Paper>
	);
};
