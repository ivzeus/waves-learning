import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Input } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Input />
        </p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </header>
    </div>
  )
}

export default App
