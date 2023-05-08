import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5.js';
import pdfFile from './test.pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export default function Test(props) {
  const files = props.files;
  return (
    <>
      <Document
        file={files}
      >
        <Page pageLayout='oneColumn' width='200' pageNumber={1} />
      </Document>
    </>
  );
}