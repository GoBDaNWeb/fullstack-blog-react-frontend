// * react
import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'

// * axios 
import axios from '../axios'

// * styles/MUI
import "../styles/modules/addComment/index.css";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export default function AddComment()  {
	const [comment, setComment] = useState('')
	const {id} = useParams()

	const onSubmit = async () => {
		axios.post(`/add-comment/${id}`, {text: comment})
		setComment('')
	}

	return (
		<>
			<div className='addComment'>
				<div className='form'>
					<TextField
						label="Написать комментарий"
						variant="outlined"
						maxRows={10}
						value={comment}
						onChange={e => setComment(e.target.value)}
						multiline
						fullWidth
					/>
					<Button 
						onClick={() => onSubmit()}
						variant="contained"
					>
						Отправить
					</Button>
				</div>
			</div>
		</>
	);
};
