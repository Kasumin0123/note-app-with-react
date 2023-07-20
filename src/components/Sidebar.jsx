import React from 'react'
import './Sidebar.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNote,
  deleteNote,
  selectActiveNote,
  selectNotes,
  setActiveNote,
} from '../features/note/noteSlice'

const Sidebar = () => {
  const dispatch = useDispatch()
  const notes = useSelector(selectNotes)
  const activeNote = useSelector(selectActiveNote)
  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button
          onClick={() => {
            dispatch(addNote())
          }}
        >
          追加
        </button>
      </div>
      <div className="app-sidebar-notes">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`app-sidebar-note ${note.id === activeNote && 'active'}`}
            onClick={() => dispatch(setActiveNote(note.id))}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button
                onClick={() => {
                  dispatch(deleteNote(note.id))
                }}
              >
                削除
              </button>
            </div>
            <div>
              <p>{note.content}</p>
              <small>
                最後の修正日:
                {new Date(note.modDate).toLocaleDateString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
