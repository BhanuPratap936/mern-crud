import React, {useState, useEffect} from 'react'
import axios from 'axios'
import EditForm from './EditForm'

const App = () => {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkbox: false,
    radio: '',
    dropdown: '',
  })
  const [dataId, setDataId] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)

  const handleEdit = (id) => {
    setDataId(id)
    setShowEditForm(true)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    try {
      const response = await axios('http://localhost:5000/api/data')
      // console.log(response.data.data)
      setData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleChange = (e) => {
    // console.log(e)
    const {name, type, value, checked} = e.target
    setFormData((prevData) => ({
      ...prevData, [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/data', formData)
      // console.log(response.data.newData)
      setData((prevData) => [...prevData, response.data.newData])
      setFormData({
        name: '',
        email: '',
        checkbox: false,
        radio: '',
        dropdown: ''
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async(updatedData) => {
    try {
      const {_id: id, name, email, checkbox, radio, dropdown} = updatedData
      // console.log(id)
      const response = await axios.put(`http://localhost:5000/api/data/${id}`, {name, email, checkbox, radio, dropdown})
      // console.log(response)
      setData((prevData) => prevData.map((item) => item._id === id ? {...item, name, email, checkbox, radio, dropdown}: item))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`)
      setData((prevData) => prevData.filter((item) => item._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:
        <input type="text"
        name='name'
        value={formData.name}
        onChange={handleChange}
        />
        </label>
        <br />
        <label>Email: 
        <input type="email"
        name='email'
        value={formData.email}
        onChange={handleChange}
        />
        </label>
        <br />
        <label>Checkbox: 
        <input type="checkbox" 
        name="checkbox" 
        checked={formData.checkbox}
        onChange={handleChange}
        />
        </label>
        <br />
        <label>
          Radio:
          <input type="radio"
          name='radio'
          value="male"
          checked={formData.radio === 'male'}
          onChange={handleChange}
          />
          Male
          <input type="radio" name="radio"
          value='female'
          checked={formData.radio === 'female'}
          onChange={handleChange}
          />
          Female
        </label>
        <br />
        <label>
          Dropdown:
          <select name="dropdown" value={formData.dropdown} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="rust">Rust</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Data: </h2>
        <ul>
          {data.map((item) => {
            return <li key={item._id}>{item.name} -- {item.email} -- {item.checkbox === true ? 'True' : 'False'} -- {item.radio} -- {item.dropdown} ---- <button type='button' onClick={() => handleEdit(item._id)}>Edit</button> <button type='button' onClick={() => handleDelete(item._id)}>Delete</button></li>
            
            

          })}
        </ul>
      {showEditForm && (
        <EditForm dataId={dataId} onUpdate={handleUpdate} onClose={() => setShowEditForm(false)} />
      )}
    </div>
  )
}

export default App