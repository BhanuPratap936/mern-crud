import React, {useState, useEffect} from 'react'
import axios from 'axios'

const EditForm = ({dataId, onUpdate, onClose}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        checkbox: false,
        radio: '',
        dropdown: ''
    })

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async() => {
        try {
            const response = await axios(`http://localhost:5000/api/data/${dataId}`)
            // console.log(response.data.data)
            setFormData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target
        const fieldValue = type === 'checkbox' ? checked : value
        setFormData((prevValue) => ({...prevValue, [name]: fieldValue}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(formData)
        onUpdate(formData)
        onClose()
    }


  return (
    <div>
        <h3>Edit Form Data</h3>
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
        <button type="submit">Update</button>
        <button type='button' onClick={onClose}>Cancel</button>
      </form>
    </div>
  )
}

export default EditForm