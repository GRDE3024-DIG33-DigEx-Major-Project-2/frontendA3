import { useState } from "react";
import ReactDOM from "react-dom/client";

function Signup() {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  }

  return (
    <>
    <h1>Signup</h1>
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>Enter your name:
      <input 
        type="text" 
        name="username" 
        value={inputs.username || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your email:
      <input 
        type="email" 
        name="email" 
        value={inputs.email || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your location:
      <select value={inputs.location || ""} onChange={handleChange}>
        <option value="Sydney">Sydney</option>
        <option value="Balmain">Balmain</option>
        <option value="Surry Hills">Surry Hills</option>
        <option value="Surry Hills">Parramatta</option>
        <option value="Surry Hills">Marrickville</option>
        <option value="Surry Hills">Lane Cove</option>
      </select>
      </label>
      <label>Enter your date of birth:
        <input 
          type="date" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Signup />);

export default Signup;