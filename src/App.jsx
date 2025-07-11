import { useState } from "react";
import './App.css';

function TodoForm({ listHandler }) {
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("normal");

  return <div className="rounded-container">
    <h2>Add Todo</h2>
    <label htmlFor="todoContent">Todo: </label>
    <input type="text" id="todoContent" onChange={(event) => setNewTodo(event.target.value)}/>
    <select defaultValue={"normal"} onChange={(event) => setPriority(event.target.value)}>
      <option value="normal">Normal</option>
      <option value="high">High</option>
    </select>
    <button type="button" className="btn btn-primary" onClick={() => {
        listHandler(newTodo, priority)
        document.getElementById('todoContent').value="";
      } 
    }>Add</button>
  </div>
}

function TodoItem({item, listHandler}) {
  return <li 
    className="list-group-item d-flex justify-content-between align-items-center"
    onClick={() => listHandler(item.id)}
    style={item.completed ? {textDecorationLine: 'line-through'} : {}}>
    {item.content} 
    {item.priority === "high" ? 
      <span className="badge bg-danger rounded-pill">High</span> 
      : ""
    }
  </li>
}

function TodoList({list, listHandler}) {
  const [showCompleted, setShowCompleted] = useState(true);
  let listToShow = showCompleted ? list : list.filter(({completed}) => !completed);

  const handleFilter = (role) => {
    if (role === "showCompleted") {
      setShowCompleted(true);
    } else {
      setShowCompleted(false);
    }
  };

  return <div className="rounded-container">
    <h1>Your Todos</h1>
    {(!list || list.length === 0) && "You have nothing to do! 🎉"}

    {(list && list.length > 0) && 
    <>
      <FilterButton 
        active={showCompleted} 
        role="showCompleted"
        handleClick={handleFilter}>
        Show Completed
      </FilterButton>
      <FilterButton 
        active={!showCompleted} 
        role="hideCompleted"
        handleClick={handleFilter}>
        Hide Completed
      </FilterButton>

      <ul className="list-group">
        {listToShow.map((item, i) => 
          <TodoItem 
            key={i}
            id={i}
            item={item}
            listHandler={listHandler}
          />
        )}
      </ul>
    </> 
    }
  </div>
}

function FilterButton({active, role, handleClick, children}) {
  const buttonClass = active ? "btn btn-primary active" : "btn btn-primary";

  return <button 
    type="button" 
    className={buttonClass} 
    style={{margin: '4px'}}
    onClick={() => handleClick(role)}>
    {children}
  </button>
}

let ITEM_NUM = -1;

function App () {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo, priority) => {
    setTodoList([...todoList, {
      id: ++ITEM_NUM,
      content: newTodo,
      priority: priority,
      completed: false
    }]);
  };

  const toggleCompletion = (id) => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  }

  return <div className="container">
    <TodoList list={todoList} listHandler={toggleCompletion} />
    <TodoForm listHandler={addTodo} />
  </div>
  
}

export default App;
