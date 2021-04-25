import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'


const TodoItem = ({content, deleteTodo, index, editTodo}) =>{

    return(
        <div className="todo-item">
            <div className="todo-title">{content}</div>
            <button className="btn-action edit" onClick={() => editTodo(content,index)} >
                <FontAwesomeIcon icon={faEdit}  />
            </button>
            <button className="btn-action delete" onClick={() => deleteTodo(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        </div>
    )
}

export default TodoItem;