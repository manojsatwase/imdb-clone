const Movie = require("../models/movieModel")
const Genre = require("../models/genreModel");
const { json } = require("express");

exports.createMoviesController = async (req,res) => {
    try {
        const {name,img,year,genre,rating} = req.body;
        const movie = await Movie.create({
            name,img,year,genre,rating
        })
        
        await movie.save();
        return res.status(201).json({
            success:true,
            message:"genra has created successfully",
            movie,
        })

    } catch (error) {
        res.json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.deleteMoviesController = async(req,res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);

        if(!movie){
            return res.status(404).json({
                success:false,
                message:"movie not found"
            })
        }
        await movie.deleteOne();
        return res.status(200).json({
            success:true,
            message:"movie delete successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateMovieController = async(req,res) => {
    try {
        const {name,img,year,genre,rating} = req.body;
        const movie = await Movie.findById(req.params.movieId);
        if(!movie){
            return res.status(404).json({
                success:false,
                message:"movie not found"
            })
        }
    
        movie.name = name || movie.name;
        movie.img = img || movie.img;
        movie.year = year || movie.year;
        movie.genre = genre || movie.name;
        movie.rating = rating || movie.rating

        await movie.save();

        return res.status(200).json({
            success:false,
            message:"updated successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
}

exports.getMoviesController = async (req,res) => {
  try {
    const page = parseInt(req.query.page) -1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    const genres = await Genre.find({})
    const genreOptions = genres.map(genre=>genre.name);

    // if genre is all then we assign all genre
    genre === "All" 
    ? genre = [...genreOptions]
    : genre = req.query.genre.split(",");

    // sort
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    // sortBy
    const sortBy = {}; // why we need this because we also allow user to sort
     // rating and year in asending or decending order
   
     // if sort length is greater than 1 its means user has specified which order he want
     // so assign sort order to be sort of index 1 here
 
     if(sort[1]){
       // sort = [ 'year', 'desc' ]
        sortBy[sort[0]] = sort[1];
     }else{
        sortBy[sort[0]] = "asc";  // default sort will be ascending order 
     }

     // search movie   
     // options is i which means casesensitive match all latter doesn't matter is capital or small                          
     const movies = await Movie.find({name:{$regex:search,$options:"i"}})
           .where("genre")
           .in([...genre])
            .sort(sortBy)  // first page 0 * 5 = 0 ,second page  1* 5 =5 skip
            .skip(page * limit) // here we need to specify how many documents we want to skip 
            .limit(limit)
    
    // but in order to show how many pages we have we need to do the same query without limit
    const total = await Movie.countDocuments({
        genre:{$in:[...genre]},
        name:{$regex:search,$options:"i"}
    })

    const response = {
        success:true,
        total,
        page : page + 1,
        limit,
        genres:genreOptions,
        movies
    }

   res.status(200).json(response);

  } catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
  }
}