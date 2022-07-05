// * react
import React from "react";

// * styles/MUI
import "../styles/modules/sideBlock/index.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type SideBlockProps = {
	title: string,
	children: React.ReactNode
}

const SideBlock: React.FC<SideBlockProps> = ({ title, children }) => {
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

export default SideBlock