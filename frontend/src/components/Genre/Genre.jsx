import React from 'react'

import "./Genre.css";

const Genre = ({genres,filterGenre,setFilterGenre}) => {

  const onChange = ({currentTarget:input}) => {
    if(input.checked){
        const state = [...filterGenre,input.value];
        setFilterGenre(state);
    }else{
      // remove the filter value from it uncheck
       const state = filterGenre.filter(val => val !== input.value);
       setFilterGenre(state);
    }
  }
  return (
    <div>
        <h1 className='heading'>Filter By Genre</h1>
        {genres.map(genre => (
            <div className='genre' key={genre}>
                <input
                 className='genre_input'
                 type='checkbox'
                 value={genre}
                 onChange={onChange}
                 id={genre}
                 />
                 <label ForHtml={genre} className='genre_label'>{genre}</label>
            </div>
        ))}
    </div>
  )
}

export default Genre