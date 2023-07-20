import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const initialState = {
  notes: JSON.parse(localStorage.getItem('notes')) ?? [],
  activeNote: false,
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state) => {
      const newNote = {
        id: uuid(),
        title: '新規ノート',
        content: '',
        modDate: Date.now(),
      }
      state.notes = [newNote, ...state.notes]
      state.activeNote = newNote.id
    },
    deleteNote: (state, action) => {
      console.log('delete', action.payload)
      state.notes = state.notes.filter((note) => note.id !== action.payload)
    },
    updateNote: (state, action) => {
      const { prop, value } = action.payload
      const activeNote = state.notes.find(
        (note) => note.id === state.activeNote,
      )
      activeNote[prop] = value
      activeNote.modDate = Date.now()
    },
    sortNote: (state) => {
      state.notes.sort((a, b) => b.modDate - a.modDate)
    },
    setActiveNote: (state, action) => {
      state.activeNote = action.payload
    },
  },
})

export const { addNote, deleteNote, updateNote, sortNote, setActiveNote } =
  noteSlice.actions

export const selectNotes = (state) => state.note.notes
export const selectActiveNote = (state) => state.note.activeNote

export default noteSlice.reducer
