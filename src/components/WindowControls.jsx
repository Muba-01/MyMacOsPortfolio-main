import React from 'react';
import useWindowStore from '#store/window.js';
const WindowControls = ({ target }) => {
  const { closeWindow, toggleMaximize } = useWindowStore();
  
  return (
  <div id="window-controls">
    <div className="close" onClick={() => closeWindow(target)} />
    <div className="minimize hidden md:block" onClick={() => toggleMaximize(target)} />
    <div className="maximize hidden md:block" onClick={() => toggleMaximize(target)} />
 </div>
  );
};

export default WindowControls;