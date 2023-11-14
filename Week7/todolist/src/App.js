import { useRef, useState } from 'react';
import './App.css';
import Inputfield from './component/Inputfield';
import Todo from "./component/Todo";
import Done from './component/Done';


function App() {
  const idRef = useRef(3);

  const [todo, setTodo] = useState([]);

  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
    };
    setTodo([newItem, ...todo]);
    idRef.current +=1;
  };

  const onUpdate = (targetId) => {
    setTodo(
      todo.map(
        (it) => {
          if (it.id === targetId) {
            return {
              ...it,
              isDone: !it.isDone,
            };
          } else {
            return it;
          }  
        } // it.id === targetId ? {...it, isDone: !it.Done } : it
      )
    );
  }; // 체크박스를 누르면 isDone: true

  const onDelete =(targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId))
  } // 삭제를 누르면 Delete

  return (
    <div className='App'>
      <Inputfield onCreate={onCreate}/>
      <section>
        <Todo todo={todo} onUpdate={onUpdate} onDelete={onDelete} isDone={false}/>
      </section>
      <section>
        <Done todo={todo} onUpdate={onUpdate} onDelete={onDelete} isDone={true}/>
      </section>
    </div>
  );
}

export default App;
