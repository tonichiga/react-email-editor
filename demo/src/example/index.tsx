import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import packageJson from '../../../package.json';

import EmailEditor from '../../../src';
import { EditorRef } from '../../../src/types';
import sample from './sample.json';
import modals, { modalAction } from '../service/modal-manager';
import '../assets/styles.scss';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 70px;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;

const Example = () => {
  const emailEditorRef = useRef<EditorRef | null>(null);
  const [preview, setPreview] = useState(false);
  const [designName, setDesignName] = useState('');

  const ejectDesign = () => {
    const sampleList = localStorage.getItem('savedDesign');
    let parsedSampleList = [];
    if (sampleList) parsedSampleList = JSON.parse(sampleList);

    return parsedSampleList;
  };

  const handleSaveDesign = (list, name, openAlert = true) => {
    console.log('saveDesign', name);
    openAlert &&
      alert('Design JSON has been logged in your developer console.');
    localStorage.setItem('savedDesign', JSON.stringify(list.reverse()));
    setDesignName(name);
    modals.close();
  };

  const quickSave = () => {
    emailEditorRef.current?.editor?.saveDesign((design) => {
      let parsedSampleList = ejectDesign();
      const date = new Date();
      const humanFormat = `Quick save ${date.toLocaleString()}`;
      let name = humanFormat;

      const designIndex = parsedSampleList.findIndex(
        (el) => el.name === designName
      );

      if (designIndex !== -1) {
        parsedSampleList[designIndex].design = design;
        name = designName;
      } else {
        const payload = {
          name: humanFormat,
          design,
        };

        parsedSampleList.push(payload);
      }

      handleSaveDesign(parsedSampleList, name, false);
    });
  };

  const saveDesign = () => {
    emailEditorRef.current?.editor?.saveDesign((design) => {
      const handleSaveName = (name) => {
        let parsedSampleList = ejectDesign();

        const designIndex = parsedSampleList.findIndex(
          (el) => el.name === name
        );

        if (designIndex !== -1) {
          parsedSampleList[designIndex].design = design;
        } else {
          const payload = {
            name,
            design,
          };

          parsedSampleList.push(payload);
        }

        handleSaveDesign(parsedSampleList, name);
      };

      modals.call(modalAction.SAVE, { cb: handleSaveName, name: designName });
    });
  };

  const exportHtml = () => {
    emailEditorRef.current?.editor?.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };

  const exportFromLocalStorage = () => {
    const loadDesign = (design, name) => {
      emailEditorRef.current?.editor?.loadDesign(design);
      setDesignName(name);
      console.log(name);
    };

    const savedDesign = localStorage.getItem('savedDesign');
    let parsedSavedDesign = [];
    if (savedDesign) parsedSavedDesign = JSON.parse(savedDesign);

    modals.call(modalAction.LOAD, { list: parsedSavedDesign, cb: loadDesign });
  };

  const exportFromSample = () => {
    emailEditorRef.current?.editor?.loadDesign(sample);
  };

  const togglePreview = () => {
    if (preview) {
      emailEditorRef.current?.editor?.hidePreview();
      setPreview(false);
    } else {
      emailEditorRef.current?.editor?.showPreview('desktop');
      setPreview(true);
    }
  };

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onReady = () => {
    emailEditorRef.current?.editor?.addEventListener(
      'design:loaded',
      onDesignLoad
    );
  };

  const quickSaveDesign = () => {
    quickSave();
  };

  return (
    <Container>
      <Bar>
        <h1>React Email Editor v{packageJson.version} (Demo)</h1>

        <button onClick={togglePreview}>
          {preview ? 'Hide' : 'Show'} Preview
        </button>
        <button onClick={quickSaveDesign}>Quick Save</button>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={exportFromLocalStorage}>From LocalStorage</button>
        <button onClick={exportFromSample}>Export Sample</button>
      </Bar>

      <React.StrictMode>
        <EmailEditor ref={emailEditorRef} onReady={onReady} />
      </React.StrictMode>
    </Container>
  );
};

export default Example;
