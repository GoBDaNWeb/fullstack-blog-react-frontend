// * react
import React from "react";
import {ISideBlockProps} from './types'

// * styles/MUI
import "@styles/modules/sideBlock/index.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const SideBlock: React.FC<ISideBlockProps> = ({ title, children }) => {
	return (
		<Paper 
            elevation={1} 
            classes={{ root: 'sideBlock' }}
        >
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