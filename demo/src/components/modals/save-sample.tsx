import React, { useState } from 'react';
import modals from '../../service/modal-manager';

const SaveSample = ({ cb, name }) => {
  const [input, setInput] = useState(name);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClose = () => {
    modals.close();
  };

  const handleSubmit = () => {
    cb(input);
    handleClose();
  };

  return (
    <div className="modal_container">
      <h1>Save sample</h1>
      <div className="content">
        <input
          value={input}
          onChange={handleChange}
          type="text"
          placeholder="Enter name"
          className="text_input"
        />
      </div>
      <div className="button_container">
        <button className="modal_submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="modal_submit" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SaveSample;
