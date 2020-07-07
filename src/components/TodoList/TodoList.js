import React from 'react';
import Todo from '../Todo/Todo';

const todoList = (props) => {
    const todos = props.todos;
    const todoList = Object.keys(todos).map((key, index) => {
        return (
            <Todo key={key} todo={todos[key]}
                editableClick={props.editable}
                todoIndex={key}
                dateChange={props.dateChange}
                editTask={props.editTaskHandler}
                update={props.updateHandler}
                delete={props.deleteHandler}
            ></Todo>
        );
    });

    return (
        <ul className="list-group" style={{ maxHeight: '500px', overflowY: 'autp', marginTop: '16px' }}>
            {todoList}
        </ul>
    );
}

export default todoList;