import React, { useEffect, useState } from 'react';
import "./style.css"
import { GoZoomIn } from "react-icons/go";
import { GoZoomOut } from "react-icons/go";

const ZoomButtons = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const zoomOut = () => {
    setZoomLevel(zoomLevel - 0.1);
  };

  document.body.style.zoom = zoomLevel;


  return (
    <div  className="zoom">
      <button onClick={zoomIn}><GoZoomIn /></button>
      <button onClick={zoomOut}><GoZoomOut /></button>
    </div>
  );
};

export default ZoomButtons;
