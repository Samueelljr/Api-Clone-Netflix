import React from "react";
import './Header.css'

export default ({black}) => {
	return (
		<header className={black ? 'black' : ''}>
				<div className="header--logo">
					<img src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" />
				</div>
				<div className="header--perfil">
					<img src="https://i.pinimg.com/474x/b6/77/cd/b677cd1cde292f261166533d6fe75872.jpg" />
				</div>
		</header>
	)
}