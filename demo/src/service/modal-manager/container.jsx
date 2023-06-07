import React, { useEffect, useRef, useState } from 'react';
import modals from '.';
import './container.scss';
import Manager from './Manager';
import Modals from './modal-list';

const Container = () => {
  const [modalData, setModalData] = useState([]);
  const [modalNames, setModalNames] = useState([]);
  const modalRef = useRef([]);

  useEffect(() => {
    const handleOpenModal = (name, data) => {
      setModalData((prev) => [...prev, data]);
      setModalNames((prev) => [...prev, name]);
    };

    const handleCloseModal = (indexes) => {
      if (indexes.length !== 0) {
        indexes.forEach((i) => {
          setModalData((prev) => prev.filter((_, index) => index !== i));
          setModalNames((prev) => prev.filter((_, index) => index !== i));
        });
        return;
      }

      setModalData([]);
      setModalNames([]);
    };

    Manager.addChangeListener('change', handleOpenModal);
    Manager.addChangeListener('close', handleCloseModal);
    return () => {
      Manager.removeChangeListener('change', handleOpenModal);
      Manager.removeChangeListener('close', handleCloseModal);
    };
  }, []);

  const activeModals = modalNames.map((name) => {
    const Component = Modals[name];
    return Component;
  });

  const handleCloseModal = (index, e) => {
    if (
      modalRef.current[index] &&
      !modalRef.current[index].contains(e.target)
    ) {
      modals.close(index);
    }
  };

  const refReducer = (index, value) => {
    modalRef.current[index] = value;
  };

  return (
    <>
      {activeModals.length !== 0 &&
        activeModals.map((Component, i) => {
          const Modal = Component;

          return (
            <div
              key={i}
              className={'backdrop'}
              onClick={(e) => {
                handleCloseModal(i, e);
              }}
            >
              <div
                ref={(ref) => {
                  refReducer(i, ref);
                }}
              >
                <Modal key={i} {...modalData[i]} />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Container;
