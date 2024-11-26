import mongoose from "mongoose";
import Todos from "../models/todos.models.js";


const addTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "title or description required",
    });
    return;
  }

  const todo = Todos.create({
    title,
    description,
  });
  res.status(201).json({
    message: "user added to database successfully",
  });
};



const getAllTodos = async (req, res) => {
  const todos = await Todos.find({});
  res.status(200).json({
    todos: todos,
  });
};

const getTodoWithId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid Id" });
  }

  const todo = await Todos.findById(id);
  if (!todo) {
    res.status(404).json({
      message: "no todo found!",
    });
    return;
  }

  res.status(200).json(todo);
};



const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid id" });
  }

  const todo = await Todos.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(404).json({ error: "No Todo found" });
  }
  res.status(200).json({
    message: "todo deleted successfully",
    todo,
  });
};




const editTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  try {
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "No Todo found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong", details: error.message });
  }
};

export { addTodo , getAllTodos , getTodoWithId , deleteTodo , editTodo };