import React from 'react'
import star from "../../assets/star.png"
import "./Table.css";

const Table = ({movies}) => {
 if(!movies) return <div>Loading...</div>
   return (
    <div>
        <div className="heading">
            <p className="title_tab">Title</p>
            <p className="title_tab">Genre</p>
            <p className="title_tab">Rating</p>
        </div>
        {movies?.map(movie => (
            <div className="movie" key={movie._id}>
                <div className="title_container">
                    <img src={movie?.img} loading='lazy' alt='movie' className="movie_img" />
                    <p className="movie_title">
                        {movie.name} {movie.year}
                    </p>
                </div>
                <div className='genre_container'>
                    {movie.genre.map((genre,index)=>(
                      <p key={genre} className='movie_genre'>
                        {genre}
                        {/* if it's not a last element else we dont add slash for genre*/}
                        {index !== movie.genre.length -1 && "/"}
                      </p> 
                    ))}
                </div>
                <div className='rating_container'>
                    <img 
                    src={star}
                    alt='star'
                    className='star_img'
                    />
                   <p className='movie_rating'> {movie.rating}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Table