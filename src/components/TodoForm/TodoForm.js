import React from 'react';
import DatePicker from 'react-datepicker';


const TodoForm = (props) => {
    return (
        <form className="bg-dark form-horizontal p-3" onSubmit={(e) => props.add(e)}>
            <div className="form-group text-left">
                <label className="control-label text-white">Add New Task</label>
                <textarea className="form-control" name="new_task"
                    value={props.content.task}
                    onChange={(e) => props.addTask(e.target.value)}></textarea>
            </div>
            <div className="form-group text-left">
                <label className="control-label text-white">Due Date</label>
                <DatePicker className="form-control" name="new_due_date"
                    value={props.content.due_date} minDate={new Date()}
                    onChange={(value, e) => props.addDate(value, e)} />
            </div>
            <button className="btn btn-primary">Save</button>
        </form>
    );
};

export default TodoForm;