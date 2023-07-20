import React from 'react'
import './Main.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectActiveNote,
  selectNotes,
  sortNote,
  updateNote,
} from '../features/note/noteSlice'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const Main = () => {
  const notes = useSelector(selectNotes)
  const activeNoteID = useSelector(selectActiveNote)

  const activeNote = notes.find((note) => note.id === activeNoteID)

  const dispatch = useDispatch()
  const editNote = (prop, value) => {
    dispatch(updateNote({ prop, value }))
    dispatch(sortNote())
  }

  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          value={activeNote.title}
          onChange={(e) => {
            editNote('title', e.target.value)
          }}
        />
        <textarea
          id="content"
          placeholder="ノートの内容を記入"
          value={activeNote.content}
          onChange={(e) => {
            editNote('content', e.target.value)
          }}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Main
