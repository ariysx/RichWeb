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
    const removeButton = document.getElementById('removeButton');

    const addButtonClick$ = fromEvent(addButton, 'click');
    const removeAllButtonClick$ = fromEvent(removeAllButton, 'click');
    const removeByColourButtonClick$ = fromEvent(removeByColourButton, 'click');

    const addButtonSubscription = addButtonClick$.subscribe(() => {
      const note = {
        id: id,
        text: inputRef.current.value,
        color: document.querySelector('input[name="color"]:checked').value,
        parent: parseInt(document.querySelector('input[name="parent"]')?.value) ?? null,
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

    const removeSubscription = fromEvent(removeButton, 'click').subscribe(() => {
      const noteId = parseInt(prompt('Enter note id to remove'));

      if (isNaN(noteId)) {
        alert('Invalid id');
        return;
      }

      const note = notes.find(note => note.id === noteId);

      if (!note) {
        alert('Note not found');
        return;
      }

      // remove note and all children
      const removeNoteAndChildren = (note) => {
        setNotes(notes.filter(n => n.id !== note.id));
        notes.filter(n => n.parent === note.id).forEach(removeNoteAndChildren);
      };

      removeNoteAndChildren(note);
    });

    subscriptions.current = [
      addButtonSubscription,
      removeAllSubscription,
      removeByColourSubscription,
      removeSubscription,
    ];

    return () => {
      subscriptions.current.forEach(subscription => subscription.unsubscribe());
    };
  }, [id, notes]);

  return (
    <div className="App">
      <h2>Problem set 3</h2>
        <p>
          Use a parent property in a note class to manage related notes, which is null for
          top-level notes, and use subscriptions to ensure that deletion of a parent deletes
          child notes. They should not be contained within the parent note’s DOM element,
          where deletion of the parent would intrinsically remove the child notes.
        </p>
      <div className="input">
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter note"
        />
        <input type="number" placeholder="Enter parent id" name="parent"/>
        <button id="addButton">Add</button>
        <button id="removeAll">Remove All Todo</button>
        <button id="removeByColour">Remove All By Colour</button>
          <button id="removeButton">
            Remove
          </button>

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
            style={{ backgroundColor: `rgba(${
              note.color === 'red' ? '255, 0, 0' : note.color === 'green' ? '0, 255, 0' : '0, 0, 255'
            }, 0.5)`,
            padding: '10px',
            border: '1px solid black',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {note.text}
            <br />
            <br />
            {JSON.stringify(note)}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
