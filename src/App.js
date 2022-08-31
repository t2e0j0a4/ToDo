import './App.css';
import React , {useState , useEffect} from 'react';

import Alert from './Alert.jsx';
import Todo from './Todo.jsx';

function App() {
  const localstorage = () => {
    let list = localStorage.getItem('list')
    if (list){
      return JSON.parse(list)
    }
    return [];
  }
  const [input, setInput] = useState('')
  const [list, setList] = useState(localstorage())
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({show : false , msg : '' , type : ''})

  useEffect(() => {
      localStorage.setItem('list',JSON.stringify(list))
  }, [list])
  

  const makeAlert = (show = false , msg = '' , type = '') => {
    setAlert({show,msg,type});
  }

  const remove = (id) => {
    let modifiedList = list.filter((item) => item.id !== id);
    setList(modifiedList)
    makeAlert(true,'Item Removed','danger');
  }

  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id)
    setEdit(true);
    setEditId(id);
    setInput(editItem.todoTitle);
  }

  const clearAll = () => {
    setList([]);
    makeAlert(true,'All Clear','danger');
  }

  const todoSubmit = (e) => {
    e.preventDefault();
    if (!input){
      makeAlert(true,'Empty Field','danger')
    }
    else if(input && edit){
      setList(list.map((item)=>{
        if (item.id === editId){
          return {...item,todoTitle:input}
        }
        return item; 
      }))
      setInput('');
      setEdit(false);
      setEditId(null);
      makeAlert(true,'Item Edited','success');
    }
    else {
      const newTodo = {id : new Date().getTime().toString() , todoTitle : input}
      setList([...list , newTodo]);
      setInput('');
      makeAlert(true,'Item Added','success');
    }
  }

  return (
    <div className="todoApp">
      <div className="showingAlert">
        {alert.show && <Alert {...alert} removeAlertFnc={makeAlert} list={list}/>}
      </div>
      <h1 id="todoHead">Todo's List</h1>
      <form id="formPage" onSubmit={todoSubmit}>
        <input type="text" name="Todo Input" id="todoTitle" className="title" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Todo's Name"/>
        <button type="submit">{edit ? 'Edit' : 'Add'}</button>
        {list.length > 0 && <button type="button" onClick={clearAll}>Clear All</button>}
      </form>
      <div className="todoList">
        {list.length > 0 && (
          <>
            <Todo list={list} removeItem={remove} editItem={editItem}/>
            
          </>
        )}
      </div>
    </div>
  );
}

export default App;
