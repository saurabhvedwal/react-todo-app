import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import './Todo.css';
import DatePicker from 'react-datepicker';


const todo = (props) => {

    const disabled = props.todo.disabled ? true : false;
    const saveBtnClass = [
        'btn', 'btn-sm', 'rounded-circle'
    ]
    if (disabled) {
        saveBtnClass.push('btn-primary');
    } else {
        saveBtnClass.push('btn-success');
    }


    return (
        <li className="list-group-item">
            <form className="row d-table">
                <div className="col-md-10 text-left d-table-cell">
                    <textarea className="form-control" style={{ width: '100%' }}
                        value={props.todo.task}
                        disabled={disabled}
                        onChange={(e) => props.editTask(e.target.value, props.todoIndex)}>{props.todo.task}</textarea>
                    <DatePicker className="form-control" name="due_date"
                        value={props.todo.due_date} id={props.todoIndex}
                        onChange={(value, e) => props.dateChange(value, e, props.todoIndex)}
                        minDate={new Date()}
                        disabled={disabled} />

                </div>
                <div className="col-md-2 d-table-cell">
                    <div className="btn-group">
                        <button type="button" className={saveBtnClass.join(" ")}
                            onClick={() => props.editableClick(props.todoIndex)}
                            style={{ margin: '0 5px' }}>
                            <FontAwesomeIcon icon={disabled ? faPencilAlt : faSave} />
                        </button>
                        <button type="button" className="btn btn-sm btn-danger rounded-circle"
                            onClick={() => props.delete(props.todoIndex)} style={{ margin: '0 5px' }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>
                </div>
            </form>
        </li >
    );
}

export default todo;