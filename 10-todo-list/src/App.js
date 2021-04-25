import {useState, useEffect} from 'react'
import TodoItem from './components/todoItem';

const ACTION_DELETE = 0;
const ACTION_ADD = 1;
const ACTION_UPDATE = 2;

function App() {
  const [inputVal, setInputVal] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [actionMessage, setActionMessage] = useState("");
  const [classAction, setClassAction] = useState("notShow");

  const handleOnChange = (e) =>{
    setInputVal(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(inputVal === ""){
      alert("No value")
    }else{
      let copyArr = todoList.slice();
      if(isEdit){
        copyArr[editIndex] = inputVal;
        setActionMessage("Item Updated");
        setClassAction("msg-update");
      }else{
        copyArr.push(inputVal);
        setActionMessage("Item Added To The List");
        setClassAction("msg-add");
      }
      setTodoList(copyArr);
      setInputVal("");
      setIsEdit(false);
    }
  }

  const deleteTodo = (index) =>{
    let copyArr = todoList.slice();
    copyArr.splice(index, 1);
    setTodoList(copyArr);
    setActionMessage("Item Removed")
    setClassAction("msg-delete");
  }

  const editTodo = (content,index) =>{
    setIsEdit(true);
    setInputVal(content);
    setEditIndex(index);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setNewClassAction = () =>{
    let currentClass = classAction;
    if(currentClass != "notShow"){
      currentClass = "notShow"
    }
    setClassAction(currentClass);
    setActionMessage("");
  }

  useEffect(() => {
    var interval = setInterval(setNewClassAction,2000)
    return () => {
      clearInterval(interval);
    }
  }, [classAction,setNewClassAction])


  
  return (

    <div className="App">
        <div className="todo-container">
          <div className={"action-message " + classAction}>{actionMessage}</div>
          <h1>Todo list</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputVal} onChange={handleOnChange} placeholder="e.g. shopping" />
            <button className="btn-form">Submit</button>
          </form>
          <div className="todo-list">
          {
            todoList.map((todo,index) => <TodoItem key={index} content={todo} deleteTodo={deleteTodo} editTodo={editTodo} index={index}/>)
          }
          </div>
        </div>
    </div>
  );
}

export default App;
