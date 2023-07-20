import { useEffect, useState } from 'react'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { selectNotes, setActiveNote } from './features/note/noteSlice'

function App() {
  const notes = useSelector(selectNotes)
  const dispatch = useDispatch()
  useEffect(() => {
    if (notes.length > 0) {
      dispatch(setActiveNote(notes[0].id))
    }
  }, [])
  useEffect(() => {
    // localStorageにノートを保存
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])
  return (
    <div className="App">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
