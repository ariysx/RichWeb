import React, { useEffect, useRef } from 'react';
import { fromEvent } from 'rxjs';

function App() {
  const [id, setId] = React.useState(0);
  const [notes, setNotes] = React.useState([]);
  const inputRef = useRef(null);
  const subscriptions = useRef([]);

  useEffect(() => {
    const addButton = document.getElementById('addButton');
    const removeAllButton = document.getElementById('removeAll');
    const removeByColourButton = document.getElementById('removeByColour');
    const editButtons = document.querySelectorAll('.editButton');
    const removeButtons = document.querySelectorAll('.removeButton');

    const addButtonClick$ = fromEvent(addButton, 'click');
    const removeAllButtonClick$ = fromEvent(removeAllButton, 'click');
    const removeByColourButtonClick$ = fromEvent(removeByColourButton, 'click');

    const addButtonSubscription = addButtonClick$.subscribe(() => {
      const note = {
        id: id,
        text: inputRef.current.value,
        color: document.querySelector('input[name="color"]:checked').value,
      };

      setId(id + 1);
      setNotes([...notes, note]);
    });

    const removeAllSubscription = removeAllButtonClick$.subscribe(() => {
      setNotes([]);
    });

    const removeByColourSubscription = removeByColourButtonClick$.subscribe(() => {
      const color = document.querySelector('input[name="color"]:checked').value;
      setNotes(notes.filter(note => note.color !== color));
    });

    const removeSubscription = fromEvent(removeButtons, 'click').subscribe((event) => {
      const noteId = parseInt(event.target.id);

      if (isNaN(noteId)) {
        alert('Invalid id');
        return;
      }

      const note = notes.find(note => note.id === noteId);

      if (!note) {
        alert('Note not found');
        return;
      }
      setNotes(notes.filter(note => note.id !== noteId && note.parent !== noteId));
    });


    const editSubscription = fromEvent(editButtons, 'click').subscribe((event) => {
      const noteId = parseInt(event.target.id);

      if (isNaN(noteId)) {
        alert('Invalid id');
        return;
      }

      const note = notes.find(note => note.id === noteId);

      if (!note) {
        alert('Note not found');
        return;
      }

      const newText = prompt('Enter new text', note.text);

      if (!newText) {
        alert('Invalid text');
        return;
      }

      setNotes(notes.map(note => {
        if (note.id === noteId) {
          return {
            ...note,
            text: newText,
          };
        }

        return note;
      }));
    });

    subscriptions.current = [
      addButtonSubscription,
      removeAllSubscription,
      removeByColourSubscription,
      removeSubscription,
      editSubscription,
    ];

    return () => {
      subscriptions.current.forEach(subscription => subscription.unsubscribe());
    };
  }, [id, notes]);

  return (
    <div className="App">
      <h2>Problem set 1</h2>
        <p>
          Convert your notes application from worksheet 1 to use RxJS streams to handle the
          mouse events instead of the method you originally used (most likely event handlers)
        </p>
      <div className="input">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter note"
        />
        <button id="addButton">Add</button>
        <button id="removeAll">Remove All Todo</button>
        <button id="removeByColour">Remove All By Colour</button>

        <div className="color">
          <input
            type="radio"
            id="red"
            name="color"
            value="red"
            defaultChecked
          />
          <label htmlFor="red">Red</label>
          <input
            type="radio"
            id="green"
            name="color"
            value="green"
          />
          <label htmlFor="green">Green</label>
          <input
            type="radio"
            id="blue"
            name="color"
            value="blue"
          />
          <label htmlFor="blue">Blue</label>
        </div>

        {notes.map((note) => (
          <div
            key={note.id}
            className="note"
            style={{ backgroundColor: note.color }}
          >
            {note.text}
            <button id={note.id} className="removeButton">Delete</button>
            <button id={note.id} className="editButton">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
