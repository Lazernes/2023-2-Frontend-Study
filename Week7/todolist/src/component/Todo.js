import "./Todo.css";
import TodoItem from "./TodoItem";

const Todo = ({todo, onUpdate, onDelete}) => {
  return (
    <div className="Todo">
      <h1>Todo</h1>
      <div className="Todo_list">
        {todo.map( (it) => (
          <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>

  )
}
export default Todo;