// * react
import React from 'react';

// * styles/MUI
import '../styles/modules/userInfo/index.css';

const UserInfo: React.FC<Record<string, string>> = ({ avatarUrl, fullName, additionalText }) => {
	return (
		<div className='userInfo'>
			<img 
				className='avatar' 
				src={avatarUrl || '/noavatar.png'} 
				alt={fullName} 
			/>
			<div className='userDetails'>
				<span className='userName'>
					{fullName}
				</span>
				<span className='additional'>
					{additionalText}
				</span>
			</div>
		</div>
	);
};

export default UserInfo