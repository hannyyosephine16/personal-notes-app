import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNote } from '../utils/local-data';

function AddNotePage({ onBackToHome }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  
  const onBodyInputHandler = (event) => {
    setBody(event.target.innerHTML);
  };
  
  const onSubmitHandler = () => {
    console.log('Adding note with title:', title);
    addNote({
      title,
      body
    });
    
    onBackToHome();
  };
  
  return (
    <div className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          placeholder="Note title"
          value={title}
          onChange={onTitleChangeHandler}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Write your note here..."
          contentEditable
          onInput={onBodyInputHandler}
        />
      </div>
      <div className="add-new-page__action">
        <button 
          className="action" 
          onClick={onSubmitHandler}
          title="Save Note"
        >
          ➕
        </button>
      </div>
    </div>
  );
}

AddNotePage.propTypes = {
  onBackToHome: PropTypes.func.isRequired
};

export default AddNotePage;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { addNote } from '../utils/local-data';

// function AddNotePage({ onBackToHome }) {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
  
//   const onTitleChangeHandler = (event) => {
//     setTitle(event.target.value);
//   };
  
//   const onBodyInputHandler = (event) => {
//     setBody(event.target.innerHTML);
//   };
  
//   const onSubmitHandler = () => {
//     addNote({
//       title,
//       body
//     });
    
//     onBackToHome();
//   };
  
//   return (
//     <div className="add-new-page">
//       <div className="add-new-page__input">
//         <input
//           className="add-new-page__input__title"
//           placeholder="Note title"
//           value={title}
//           onChange={onTitleChangeHandler}
//         />
//         <div
//           className="add-new-page__input__body"
//           data-placeholder="Write your note here..."
//           contentEditable
//           onInput={onBodyInputHandler}
//         />
//       </div>
//       <div className="add-new-page__action">
//         <button 
//           className="action" 
//           onClick={onSubmitHandler}
//           title="Save Note"
//         >
//           ➕
//         </button>
//       </div>
//     </div>
//   );
// }

// AddNotePage.propTypes = {
//   onBackToHome: PropTypes.func.isRequired
// };

// export default AddNotePage;
