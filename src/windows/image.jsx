import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import useWindowStore from '#store/window.js';
import useIsMobile from '../hooks/useIsMobile';

const ImageFile = () => {
  const { windows, closeWindow, openWindow } = useWindowStore();
  const isMobile = useIsMobile();
  const data = windows.imgfile?.data;

  const goBack = () => {
    closeWindow('imgfile');
    openWindow('finder');
  };

  if (!data) return null;

  const src = data.imageUrl || data.image || '';

  return (
    <>
      {isMobile ? (
        <div id="window-header" className="max-md:mt-10 max-md:rounded-none max-md:bg-transparent max-md:px-4 max-md:py-3">
          <button type="button" onClick={goBack} className="text-blue-600 text-sm min-w-16 text-left">
            {'< Go Back'}
          </button>
          <h2 className="flex-1 text-center text-black font-medium">{data.name}</h2>
          <span className="min-w-16" />
        </div>
      ) : (
        <div id="window-header">
          <WindowControls target="imgfile" />
          <h2>{data.name}</h2>
        </div>
      )}

      <div className="preview">
        {src ? <img src={src} alt={data.name} /> : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(ImageFile, 'imgfile');

export default ImageWindow;
