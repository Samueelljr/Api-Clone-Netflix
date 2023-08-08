import React, { useEffect, useState } from "react";
import './App.css'

import TmdbAPI from "./TmdbAPI";

import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

	const [movieList, setMovieList] = useState([]);
	const [featuredData, setFeaturedData] = useState(null);
	const [blackHeader, setBlackHeader] = useState();

	useEffect(() => {
		const loadAll = async () => {
			// Pegando os elementos da lista completa
			let list = await TmdbAPI.getHomeList();
			setMovieList(list);

			// Pegando o Featured
			let originals = list.filter(i=>i.slug === 'originals');
			let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
			let chosen = originals[0].items.results[randomChosen];
			let chosenInfo = await TmdbAPI.getMovieInfo(chosen.id, 'tv');
			setFeaturedData(chosenInfo);
		}
		
		loadAll();
	}, []);

	useEffect (()=> {
		const scrollListener = () => {
			if (window.scrollY > 10 ) {
				setBlackHeader(true);
			} else {
				setBlackHeader(false);
			}
		}

		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		}
	}, []);

	return (
		<div className="page">
			
			<Header black={blackHeader} />

			{featuredData && 
				<FeaturedMovie  item={featuredData}/>
			}

			<section className="lists">
				{movieList.map((item, key) => (
					<MovieRow key={key} title={item.title} items={item.items} />
				))}
			</section>
			<footer>
				<p>Desenvolvimento por Herbert Nordson</p>
				<p>Direitos reservados a Netflix</p>
				<p>Conteúdo cedido por TMDB</p>
			</footer> 
			{movieList.length <= 0 && 
				<div className="loading">
					<img src="https://www.corvetteforum.com/forums/attachments/off-topic/48024333d1475661585-will-disney-buy-netflix-4f155204-7266-486d-88a5-2018ff11f947.gif" />
				</div>
			}
		</div>
	);
}