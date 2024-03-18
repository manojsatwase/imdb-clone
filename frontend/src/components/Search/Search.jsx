import React from 'react'
import "./Search.css"

const Search = ({ setSearch }) => {
	return (
		<input
			type="text"
			className="search"
			placeholder="Search"
			onChange={({target:{value}}) => setSearch(value)}
		/>
	);
};

export default Search;;