import { createContext } from "react";
import  { TODOContext } from "./ToDoContext";


const todosContext = createContext<TODOContext | null>(null)

export default todosContext;