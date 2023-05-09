import React, {  } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default function Test(props) {
  const files = props.files;
  return (
    <>
      <Document
        file={files}
      >
        <Page pageLayout='oneColumn' width={200} pageNumber={1} />
      </Document>
    </>
  );
}