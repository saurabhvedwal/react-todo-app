import React, { Component } from 'react';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoList from '../../components/TodoList/TodoList';
import api from '../../axios-api';
import { exportDefaultSpecifier } from '@babel/types';


class TodoController extends Component {
    state = {
        todos: {},
        form: {
            due_date: '',
            task: ''
        },
        formValid: true,
        errorMsg: 'Error',
        successMsg: '',
        success: false
    }

    render() {
        return (
            <React.Fragment>
                <TodoForm add={this.addNewTodoHandler} addDate={this.addDateHandler} addTask={this.addTaskHandler} content={this.state.form} />
                {this.state.formValid ? null : <div className="alert alert-danger text-left">{this.state.errorMsg}</div>}
                {this.state.success ? <div className="alert alert-success" style={{ marginTop: '5px' }}>{this.state.successMsg}</div> : null}
                <TodoList todos={this.state.todos}
                    editable={this.todoEditToggleHandler}
                    dateChange={this.dateChangeHandler}
                    editTaskHandler={this.editTaskHandler}
                    updateHandler={this.updateTodoHandler}
                    deleteHandler={this.deleteTodoHandler}
                />
            </React.Fragment>
        );
    }

    async componentDidMount() {
        api.get('/todos.json')
            .then((resp) => {
                if (resp.status == 200) {
                    const todos = { ...resp.data };
                    const modResp = Object.keys(todos);
                    modResp.map((key, index) => {
                        todos[key]['disabled'] = true;
                        return todos[key];
                    });
                    this.setState({ todos: todos });
                }
            });
    }

    todoEditToggleHandler = (index) => {
        const todos = { ...this.state.todos };
        if (todos[index]['disabled']) {
            todos[index]['disabled'] = !todos[index]['disabled'];
            this.setState((prevState, props) => {
                return { todos: todos }
            });
        } else {
            this.updateTodoHandler(index);
        }
    }

    dateChangeHandler = (date, e, index) => {
        this.setState((prevState, props) => {
            const todos = { ...prevState.todos };
            const dateStr = this.formatDate(date);
            todos[index]['due_date'] = dateStr;
            return { todos: todos }
        });
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;
        return [year, month, day].join('-');
    }

    validationCheck(todo, index) {
        if (todo.task.trim() == '') {
            this.setState({ formValid: false, errorMsg: 'Please fill task field' });
            console.log('Not Valid');
            return false;
        } else if (todo.due_date.trim() == '') {
            this.setState({ formValid: false, errorMsg: 'Please fill due date field' });
            console.log('Not Valid');
            return false;
        } else {
            this.setState({ formValid: true });
            console.log('Valid');
            return true;

        }
    }

    addNewTodoHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const form = e.target;
        const formData = new FormData(form);
        const newId = this.state.todos.length + 1;
        const addTodo = {
            id: newId,
            task: formData.get('new_task'),
            due_date: formData.get('new_due_date')
        };
        if (!this.validationCheck(addTodo)) {
            return false;
        }
        const autoIndex = this.state.todos.length + 1;
        const apiUrl = '/todos.json';

        api.post(apiUrl, addTodo)
            .then((resp) => {
                if (resp.status == 200) {
                    this.setState((prevState, props) => {
                        const todos = { ...prevState.todos };
                        addTodo['disabled'] = true;
                        addTodo['id'] = autoIndex;
                        todos[resp.data.name] = addTodo;
                        return {
                            todos: todos, form: {
                                due_date: '',
                                task: ''
                            },
                            success: true,
                            successMsg: 'Added Successfully!'
                        };
                    });
                }
                setTimeout(() => {
                    this.setState({ success: false, successMsg: '' });
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addTaskHandler = (val) => {
        this.setState((prevState, props) => {
            return {
                form: {
                    task: val,
                    due_date: prevState.form.due_date
                }
            };
        });
    }

    addDateHandler = (date, e) => {
        const dateStr = this.formatDate(date);
        this.setState((prevState, props) => {
            return {
                form: {
                    task: prevState.form.task,
                    due_date: dateStr
                }
            };
        });
    }

    editTaskHandler = (val, index) => {
        this.setState((prevState, props) => {
            const todos = { ...prevState.todos };
            todos[index] = {
                id: prevState.todos[index].id,
                task: val,
                due_date: prevState.todos[index].due_date,
                disabled: prevState.todos[index].disabled
            }
            return {
                todos: todos
            };
        });
    }

    updateTodoHandler = (index) => {
        const apiUrl = '/todos/' + index + '.json';
        const editTask = this.state.todos[index];
        if (!this.validationCheck(editTask, index)) {
            return false;
        }
        delete editTask['disabled'];
        api.put(apiUrl, editTask)
            .then((resp) => {
                if (resp.status == 200) {
                    this.setState((prevState, props) => {
                        const todos = { ...prevState.todos };
                        todos[index]['disabled'] = true;
                        return {
                            todos: todos,
                            success: true,
                            successMsg: 'Updated Successfully!'
                        };
                    });
                    setTimeout(() => {
                        this.setState({ success: false, successMsg: '' });
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteTodoHandler = (index) => {
        const apiUrl = '/todos/' + index + '.json';
        api.delete(apiUrl)
            .then((resp) => {
                console.log(resp);
                if (resp.status == 200) {
                    this.setState((prevState, props) => {
                        const todos = { ...prevState.todos };
                        delete todos[index];
                        return {
                            todos: todos,
                            success: true,
                            successMsg: 'Updated Deleted!'
                        };
                    });
                    setTimeout(() => {
                        this.setState({ success: false, successMsg: '' });
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

export default TodoController;