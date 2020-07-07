import React from 'react';
import TodoController from '../../containers/TodoController/TodoController';


const todoPanel = (props) => {
    const style = {
        padding: '5px 50px',
    };
    return (
        <div className={props.classes}>
            <h1 className="padd" style={{marginTop: '16px'}}>Todos</h1>
            <div className="col-md-12" style={style}>
                <TodoController/>
            </div>
        </div>
    );
};

export default todoPanel;