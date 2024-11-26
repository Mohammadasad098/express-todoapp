import express from "express";
import { addTodo , getAllTodos , getTodoWithId , deleteTodo , editTodo } from "../controllers/todos.controllers.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/allTodos", getAllTodos);
router.get("/todo/:id", getTodoWithId);
router.delete("/todo/:id", deleteTodo);
router.put("/todo/:id", editTodo);


export default router;