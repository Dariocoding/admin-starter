import * as React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { IModalProps } from "./interfaces";

const container = document.getElementById("portal-modal");

const Modal: React.FC<IModalProps> = (props) => {
  const { showModal, onClose, size, title, id } = props;

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
    // eslint-disable-next-line
  }, []);

  let maxWidth: string;

  if (size === "sm") {
    maxWidth = "max-w-md";
  } else if (size === "md") {
    maxWidth = "max-w-2xl";
  } else if (size === "lg") {
    maxWidth = "max-w-4xl";
  } else if (size === "xl") {
    maxWidth = "max-w-6xl";
  } else {
    maxWidth = "max-w-lg";
  }

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <React.Fragment>
      <div
        id={id}
        className="justify-center items-center flex overflow-hidden fixed inset-0 z-[1000] outline-none focus:outline-none"
      >
        <div
          className={`px-4 w-full py-6 mx-auto h-full ${maxWidth} flex lg:items-start items-center`}
        >
          <div className="border-0 rounded-lg shadow-lg flex flex-col max-h-[100vh] w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              {typeof title === "string" ? (
                <h3 className="text-lg md:text-2xl font-semibold">{title}</h3>
              ) : (
                title
              )}
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-85 float-right text-lg leading-none font-semibold outline-none focus:outline-none"
                onClick={onClose}
              >
                <span>
                  <FaTimes />
                </span>
              </button>
            </div>
            <div className="relative sm:p-6 p-4 flex-auto text-lg">{props.children}</div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>,
    container
  );
};

export default Modal;
