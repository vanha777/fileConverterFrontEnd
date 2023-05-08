import React, { createContext, useState, useContext } from 'react';

//getting files infos from aws





//end.


// Create the context
const FilesStateContext = createContext();

// Create a provider component
export const FilesStateProvider = (props) => {


  //global useState For app.js to set user interraction
  const [filesState, setFilesState] = useState();


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