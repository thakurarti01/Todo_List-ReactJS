import { useEffect, useState } from "react"

export default function Todolist(){

    function getStoredTodos(){
        let data = localStorage.getItem("todos")
        let json = JSON.parse(data)
        if(json){
            return json
        }
        return[]
    }

    const [todos, setTodos] = useState(getStoredTodos())
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])
    

    function handleSubmit(event){
        event.preventDefault()

        let task = event.target.task.value //here the task(target.task) is from form i/p field which is needed to be targeted.

        if(!task){
            alert("Please provide a valid task")
            return
        }

        setTodos([...todos, {task: task, completed: false}])

        event.target.reset()//this will reset the add task bar
    }

    function changeTaskStatus(index){
        let newtodos = [...todos]
        newtodos[index].completed = !newtodos[index].completed
        setTodos(newtodos)
    }

    function deleteTask(index){
        let newtodos = [...todos]
        newtodos.splice(index, 1) //splice(index-> means what we  eed to delete, 1->means number of items we need to delete)
        setTodos(newtodos)
    }
    return(
        <div className="container my-5">
            <div className="mx-auto rounded border p-4" style={{width: "600px", backgroundColor: "#08618d"}}>
                <h2 className="text-white text-center mb-5">My Todo List</h2>

                <form className="d-flex"onSubmit={handleSubmit}>
        <input className="form-control me-2" placeholder="New Task" name="task"/>
        <button className="btn btn-outline-light" type="submit">Add</button>
      </form>

      {
        todos.map((todo, index) => {
            return(
                <div key={index} className="rounded mt-4 p-2 d-flex"style={{backgroundColor: todo.completed?"#87FC68":"LightGray"}}>
                    

                    <div className="me-auto">
                        {todo.task}
                    </div>

                    <div>
                    <i className={"h5 me-2 " + (todo.completed?"bi bi-check-square":"bi bi-square")}
                    style={{cursor: "pointer"}} onClick={()=>changeTaskStatus(index)}></i>
                    <i className="bi bi-trash-fill text-danger h5"
                    style={{cursor: "pointer"}} onClick={()=>deleteTask(index)}></i>
                    </div>
                </div>

            )
        })
      }
            </div>
        </div>
    )
}