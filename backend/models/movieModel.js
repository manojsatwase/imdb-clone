const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        require:["name should not be empty",true]
    },
    img:{
        type:String,
        require:true
    },
    year:{
        type:Number,
        require:true
    },
    genre:{
        // array of string
        type:[String],
        require:true
    },
    rating:{
        type:Number,
        require:true
    }
})


module.exports = mongoose.model("movie",movieSchema);