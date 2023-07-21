import React, { useEffect, useRef } from "react";

export const useOutsideClick = (handleClose, listenCapturing = true) => {
  const windowElRef = useRef();

  useEffect(() => {
    function handleClick(event) {
      if (windowElRef.current && !windowElRef.current.contains(event.target))
        handleClose();
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handleClose, listenCapturing]);

  return windowElRef;
};
