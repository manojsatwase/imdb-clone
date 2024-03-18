const { default: mongoose } = require("mongoose");
const Genres = require("../models/genreModel");


exports.createAndUpdateGenreController = async (req, res) => {
  try {
    const { name,id } = req.body;
    let genreStatus = "";

    if(!mongoose.Types.ObjectId.isValid(id)){
      // If ID is not valid, create a new genre
      const newGenre = await Genres.create({name});
      await newGenre.save();
      genreStatus = "New genre created successfully"
    }else{
      const genre = await Genres.findById(id);

      if(!genre){
        return res.status(404).json({
          success:false,
          message:"genra not found"
        })
      }
      genre.name = name || genre.name;
      await genre.save();
      genreStatus = "Genre Updated Successfully"
    }

    res.status(201).json({ 
      success: true,
      message: genreStatus,
      genre: name 
    });
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message
    });
  }
}


exports.createGenreController = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Check if the genre already exists
      const existingGenre = await Genres.findOne({ name });
      if (existingGenre) {
        return res.status(400).json({ 
            success:false,
            message: "Genre already exists"
         });
      }
  
      // Create a new genre
      const newGenre = await Genres.create({ name });
      await newGenre.save();
  
      res.status(201).json({ 
        success: true,
        message: "Genre created successfully",
        genre: name 
      });
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: error.message
      });
    }
}


exports.updateGenres = async (req, res) => {
  try {
    const genre = await Genres.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ 
        success: false,
         message: 'Genre not found'
       });
    }

    genre.name = req.body.name || genre.name;
    await genre.save();

    return res.status(200).json({
      success: true,
      message: 'Updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteGenra = async (req, res) => {
  try {
    const genre = await Genres.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: 'Genre not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAllGenres = async(req,res) => {
    try {
        const genres = await Genres.find({});
       
        const allGenres = genres.map(genre => genre.name);
        return res.status(200).json({
            success:true,
            allGenres
        })
     } catch (error) {
        res.status(500).json({ 
            success:false,
            message: error.message
          });
    }
}

