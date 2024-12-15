const mongoose = require("mongoose")


const todotSchema = new mongoose.Schema({
   title:{
    type:String,
    require:true
   }

})

const todo = mongoose.model("todo", todotSchema)

module.exports = todo