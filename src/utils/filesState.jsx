import React, { createContext, useState, useContext } from 'react';

//getting files infos from aws





//end.


// Create the context
const FilesStateContext = createContext();

// Create a provider component
export const FilesStateProvider = (props) => {


  //global useState For app.js to set user interraction
  const [filesState, setFilesState] = useState([
    {
      key: 'result1683353759611.pdf',
      lastModified: '2023-05-06T06:16:01.000Z',
      size: 1661971,
      previewUrl: 'https://imgconverter.s3.amazonaws.com/result1683353759611.pdf'
    },
    {
      key: 'result1683353581343.pdf',
      lastModified: '2023-05-06T06:13:03.000Z',
      size: 1391475,
      previewUrl: 'https://imgconverter.s3.amazonaws.com/result1683353581343.pdf'
    },

  ]);


  const updateFilesState = (newData) => {
    setFilesState(newData);
  };

  const [filesSelected, setFilesSelected] = useState([]);
  const updateFilesSelected = (newData) => {
    setFilesSelected(newData);
  };

  return (
    <FilesStateContext.Provider value={{
      filesState,
      updateFilesState,
      filesSelected,
      updateFilesSelected

    }}>
      {props.children}
    </FilesStateContext.Provider>
  );
};


export const useFilesState = () => {
  return useContext(FilesStateContext);
}