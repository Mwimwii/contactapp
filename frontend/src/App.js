import React, { Component } from 'react';
import Modal from "./components/Modal";
import axios from "axios";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// var date = new Date();
// var timestamp = date.getTime();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        name: "",
        number: "",
        isdone: false,
        // time_started:timestamp,
        // time_completed:timestamp
      },
      todoList: []
    };
  }

  componentDidMount(){
    this.refreshList()
  }

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          DONE
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          UNDONE
        </span>
      </div>
    );
  };
  
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      // eslint-disable-next-line
      item => item.isdone ===  viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2 ${
         this.state.viewCompleted ? "completed-todo": ""
        }`}
        title = {item.number}
        >
        <a href={`https://web.whatsapp.com/send?phone=${item.number}&text"`} target="_blank" rel="noopener noreferrer" >
        {item.name}
        </a>
        </span>
        <span className="dropdown">
        +{item.number}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >{" "}
            Edit{" "}</button> 


          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete {" "}
          </button>
        </span> 
      </li>
      ));
    };
  
  handleSubmit = item => {
    this.toggle();
    if (item.id){
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
        // console.log(item.isdone)
      return;
    }
    axios
      .post("/api/todos/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
      axios
      .delete(`/api/todos/${item.id}`)
      .then(res => this.refreshList());
};
  createItem = () => {
    const item = { name:"", number:"", isdone: false};
    this.setState({ activeItem:item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  

  render(){
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4"> Client app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary"> Add Client</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div> 
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;