import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Event_Form from './Event_Form/Event_Form'
import Volunteer_History from './Volunteer_History/Volunteer_History'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       {/*<Event_Form/>*/}
       <Volunteer_History/>

      </div>
     
    </>
  )
}

export default App
