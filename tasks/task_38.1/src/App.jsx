import { useState } from "react"
import Button from "./components/Button"
import Input from "./components/Input"
import "./index.css"

function App() {
  const [value, setValue] = useState("")

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = () => {
    console.log("Button clicked, value:", value)
    alert(`Button clicked, value: ${value}`)
  }

  return (
    <div className="app">
      <h1>Task 38.1 — React props & events</h1>

      <Input
        placeholder="Введи текст..."
        type="text"
        onChange={handleChange}
      />

      <p>Ти ввів: {value}</p>

      <Button
        text="Натисни мене"
        type="button"
        onClick={handleClick}
      />
    </div>
  )
}

export default App