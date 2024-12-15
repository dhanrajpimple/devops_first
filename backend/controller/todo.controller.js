
const todo = require("../models/TodoSchema")

const addTodo = async(req, res)=>{
    console.log(req.body)
    try {
        const {title} = req.body
      const newTodo = new todo({ title });
      await newTodo.save();
      res.status(200).json({ message: "Todo added successfully" });
    } catch (error) {
        res.status(500).json({message:"error adding todo"})
        
    }
}

const getTood = async(req, res)=>{
    try {
        const data = await todo.find()
        res.status(200).json(data)
    } catch (error) {

        res.status(500).json({message:"error while fetching todo"})
        
    }
}

const deletetodo = async (req, res)=>{
    try {
        const {id} = req.body;
        await todo.findOneAndDelete({_id:id})
        res.status(200).json({message:'successfully delete the data'})
    } catch (error) {
    res.status(500).json({messag:'error while deleteing the '})
    }
}

module.exports ={ addTodo, getTood, deletetodo}