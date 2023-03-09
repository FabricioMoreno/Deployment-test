import { useEffect, useState } from "react";
import "./App.css";
import "./loading-animation.css"

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const usersUI = users.map(user=>{
    return(
      <div key={user._id}>
        {user.name}
      </div>
    )
  })

  useEffect(() => {
    const getAllUsers = async()=>{
      let allUsers = await fetch("/api/v1/users")
      allUsers = await allUsers.json()
      setIsLoading(false)
      setUsers(allUsers.allUsers)
    }

    getAllUsers()
    
  }, [])
  

  return (
    <div>
      <header>
        <h1>Deployment Test </h1>
      </header>
      <div>
        <h2>Users connected: {users.length}</h2>
        {isLoading?<div id="loading"></div>: usersUI}

      </div>
    </div>      
  );
}

export default App;
