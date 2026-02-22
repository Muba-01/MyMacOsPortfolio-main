import { WindowControls } from '#components';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window.js';
import { Download } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


const Resume = () => {
  const { windows, closeWindow } = useWindowStore();
  const [numPages, setNumPages] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [workerDisabled, setWorkerDisabled] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const visiblePageWidth = 400;
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : visiblePageWidth);
  const isOpen = windows.resume?.isOpen;
  const isMobile = viewportWidth < 768;
  const pageWidth = isMobile ? viewportWidth : visiblePageWidth;

  useEffect(() => {
    const onChange = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onChange);
    return () => window.removeEventListener('resize', onChange);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setNumPages(null);
    setLoadError(false);
    setWorkerDisabled(false);
    setRenderKey((prev) => prev + 1);
  }, [isOpen]);

  return (
  <>
    {isMobile ? (
      <div id='window-header' className="max-md:mt-10 max-md:rounded-none max-md:bg-transparent max-md:border-b-0 max-md:px-4 max-md:py-3">
        <button
          type="button"
          onClick={() => closeWindow('resume')}
          className="text-blue-600 text-sm min-w-16 text-left"
        >
          {'< Go Back'}
        </button>
        <h2 className="flex-1 text-center text-black font-medium">Resume</h2>
        <span className="min-w-16" />
      </div>
    ) : (
      <div id='window-header'>
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a href="/files/resume.pdf"
        download
        className="cursor-pointer"
        title="Download Resume"
        >
          <Download className="icon" />

        </a>

      </div>
    )}

    {
      
    }

    {isOpen && (
      <div className="h-[85vh] w-screen overflow-y-auto box-border py-1 md:w-105 md:max-w-[90vw] md:p-2">
      <Document
        key={`${renderKey}-${workerDisabled ? 'no-worker' : 'with-worker'}`}
        file={{ url: '/files/resume.pdf' }}
        loading={<p className="text-sm text-center py-4">Loading resume...</p>}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(e) => {
          console.error('PDF load error', e);
          setLoadError(true);
          if (!workerDisabled) setWorkerDisabled(true);
        }}
      >
        {!loadError && numPages && Array.from(new Array(numPages), (el, index) => (
          <div key={`page_wrap_${index + 1}`} style={{ marginBottom: isMobile ? '0.125rem' : '1rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: `${pageWidth}px`, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={Math.round(pageWidth)}
                renderTextLayer
                renderAnnotationLayer
              />
            </div>
          </div>
        ))}
      </Document>
      </div>
    )}

    {loadError && (
      <div className="pdf-fallback">
        <p>Could not render PDF with react-pdf — showing browser fallback.</p>
        <iframe
          src="/files/resume.pdf"
          title="Resume PDF"
          style={{ width: '100%', height: '85vh', border: 'none' }}
        />
      </div>
    )}


  </>
  );
    
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;