import React, { useState } from 'react';
import modals from '../../service/modal-manager';

const LoadSample = ({ list = [], cb }) => {
  const [selected, setSelected] = useState('');
  const [listState, setListState] = useState(list);

  const handleChange = (e) => {
    setSelected(e.target.name);
  };

  const handleClose = () => {
    modals.close();
  };

  const handleSubmit = () => {
    const design = list.find((item) => item.name === selected)?.design;

    cb(design, selected);
    handleClose();
  };

  const handleRemove = (name) => {
    console.log('remove', name);

    const newList = listState.filter((item) => item.name !== name);
    setListState(newList);
    localStorage.setItem('savedDesign', JSON.stringify(newList));
  };

  return (
    <div className="modal_container">
      <h1>Choose sample</h1>
      <div className="modal_content">
        <div>
          {listState.map((item, index) => (
            <div className="input_wrapper" key={index}>
              <div className="input_container">
                <input
                  checked={selected === item?.name}
                  onChange={handleChange}
                  type="radio"
                  name={item.name}
                  id={`sample_${index}`}
                />
                <label htmlFor={`sample_${index}`}>{item?.name}</label>
              </div>
              <button
                onClick={() => {
                  handleRemove(item.name);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="button_container">
        <button
          className="modal_submit"
          onClick={handleSubmit}
          disabled={selected === ''}
        >
          Submit
        </button>
        <button className="modal_submit" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoadSample;
