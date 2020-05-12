const style = {color: 'blue',size:40};
const headStyle = {color:'brown' ,weight:'bold',size:50};
const inputStyle = {color:'black'};
const button = {color:'black',background:'yellow'};

function Task(props) {
    console.log(props.dueDate.toLocaleString())
    return <li style= {style}>{props.name},{props.dueDate == null ? "Invalid Date" : props.dueDate.toLocaleString().slice(0,9)}
    <input type = "submit" style={button} value = "Delete Task"onClick = {() => {props.onDeleteTask(props.id)}}/>
    </li>
}
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list
        };
        this.deletionHandling = this.deletionHandling.bind(this);
        this.AdditionHandling = this.AdditionHandling.bind(this);
    }


    deletionHandling(id) {
        let list = this.state.list;
        this.state.list = this.state.list.filter(task => {
            if (task.id != id)
                return task;


        })
        this.setState({
            list: this.state.list
        })
    }


    AdditionHandling(task) {
        this.state.list.push(task);
        this.setState({
            list: this.state.list
        })
    }
    render() {
        return ( <div>
        <h1 style={headStyle}> Ira's TODO List </h1>
        <ol> {this.state.list.map((t) =>
        <Task key = {t.id} name = {t.name} dueDate = {t.dueDate} onDeleteTask = {this.deletionHandling} id = {t.id}/>)
        }
        </ol> <TaskNameForm onAddTask = {this.AdditionHandling}/>
        </div>
        );
    }
}


class TaskNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            'date': null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        const taskList = this.props.taskList;
        // create a task object
        event.preventDefault();
        const task = {
            id: Date.now(),
            name: this.state.value,
            dueDate: this.state.date
        };
        // add the task object to the task list
        this.props.onAddTask(task);
    }


    handleChange(event) {
        // code to set the state of the component
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return ( <form onSubmit = {
                this.handleSubmit}>
            <input style={inputStyle} type = "text" onChange = {this.handleChange}/>
            <input style={inputStyle} type = "date" onChange = {() => {this.setState({date: new Date(event.target.value)})}}/>
            <input style={inputStyle} type = "submit"value = "Add to my list"/>
            </form>
        );
    }
}


ReactDOM.render( <TodoList list = {[]}/>,
    document.getElementById('root')
);