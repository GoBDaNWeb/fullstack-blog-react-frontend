// * react
import React, {useState} from "react";
import {useParams} from 'react-router-dom'

// * axios 
import axios from '../../../../axios'

// * styles/MUI
import "@styles/modules/addComment/index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AddComment: React.FC = () => {
	const [comment, setComment] = useState<string>('')
	const {id} = useParams()

	const onSubmit = async (): Promise<void> => {
		axios.post(`/comments/add-comment/${id}`, {text: comment})
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

export default AddComment