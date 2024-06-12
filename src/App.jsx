import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Event_Form from './Event_Form/Event_Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <Event_Form/>
      </div>
     
    </>
  )
}

export default App
