import './App.css';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setQuery] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const [sortData, setSortData] = useState("")


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filteredUser()
  },[searchQuery])

  const fetchData = async () => {
    setError(null)
    setIsLoading(true)
    try{
      const response =  await axios.get(`https://jsonplaceholder.typicode.com/users`)
      const data = await response.data
      console.log(data);
      setUsers(data)
      setAllUsers(data)

    }catch(err){
      setError(err)
    }finally{
      setIsLoading(false)
    }
  }

  const filteredUser = () => {
    const newUser = allUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setUsers(newUser)
  }

  const handleSortChange = (event) => {
    const selectedValue = event.target.value
    setSortData(selectedValue) 
    console.log(selectedValue);
    if(selectedValue === "asc"){
      const newUser = allUsers.sort((a, b) => a.username.localeCompare(b.username))
      setUsers(newUser)
    }else if(selectedValue === "dec"){
      const newUser = allUsers.sort((a, b) => b.username.localeCompare(a.username))
      setUsers(newUser)
    }else{
      setUsers(allUsers)
    }
  }

  return (
    <div className="App">
      <h1>Sort Functionality</h1>
      {error && <p>{error.message}</p>}
      {isLoading && <p>Loading . . .</p>}
      <div className='select-option'>
        <select className='select-menu' value={sortData} onChange={handleSortChange}>
          <option value='sort' hidden>Sort by</option>
          <option value='asc'>asc</option>
          <option value='dec'>dec</option>
        </select>
      </div>
      <div className='table-data'>
      <table>
        <tbody style={{border:"black", borderWidth: "1"}}>
        <tr>
          <th>Sl no.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Website</th>
          <th>Address</th>
        </tr>
      {users.map((user) => 
          <tr key={user.id}>
            <td>{user.id }</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.website}</td>
            <td>{user.address.street}</td>
          </tr>
        
      )}
        </tbody>
      </table>

      </div>
    </div>
  );
}

export default App;
