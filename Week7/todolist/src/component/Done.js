import "./Done.css";
import DoneItem from "./DoneItem";

function Done({todo, onUpdate, onDelete}) {
  return (
    <div className="Done">
      <h1>Done</h1>
      <div className="Done_list">
          {todo.map( (it) => (
            <DoneItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
        ))}
      </div>
    </div>

  )
}
export default Done;