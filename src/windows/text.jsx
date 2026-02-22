import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import WindowControls from '#components/WindowControls';
import useWindowStore from '#store/window.js';
import useIsMobile from '../hooks/useIsMobile';

const Text = () => {
  const { windows, closeWindow, openWindow } = useWindowStore();
  const isMobile = useIsMobile();
  const data = windows.txtfile?.data;

  const goBack = () => {
    closeWindow('txtfile');
    openWindow('finder');
  };

  if (!data) return null;

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
          <WindowControls target="txtfile" />
          <h2>{data.name}</h2>
        </div>
      )}

      <div className="text-file content">
        {data.image || data.imageUrl ? (
          <div className="mb-4">
            <img src={data.image || data.imageUrl} alt={data.name} />
          </div>
        ) : null}

        {data.subtitle ? <p className="subtitle">{data.subtitle}</p> : null}

        {Array.isArray(data.description) && (
          <div className="space-y-3">
            {data.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
