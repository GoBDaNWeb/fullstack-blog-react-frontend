// * react
import React from "react";

// * axios 
import axios from 'axios'

// * styles/MUI
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

// * components
import SideBlock from "./SideBlock";

export default function CommentsBlock({ comments, children, isLoading = true }) {
	return (
		<SideBlock title="Комментарии">
			<List>
			{
				(isLoading 
					? [...Array(5)] 
					: comments).map((comment, index) => (
						<React.Fragment key={index}>
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
								{isLoading ? (
									<Skeleton 
										variant="circular" 
										width={40} 
										height={40} 
									/>
								) : (
									<Avatar 
										alt={comment.author.fullName} 
										src={comment.author.avatarUrl} 
									/>
								)}
								</ListItemAvatar>
								{isLoading ? (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<Skeleton 
										variant="text" 
										height={25} 
										width={120} 
									/>
									<Skeleton 
										variant="text" 
										height={18} 
										width={230} 
									/>
								</div>
								) : (
								<ListItemText
									primary={comment.author.fullName}
									secondary={comment.text}
								/>
								)}
							</ListItem>
							<Divider variant="inset" component="li" />
						</React.Fragment>
					))
			}
			</List>
			{children}
		</SideBlock>
	);
};
