import React, { useRef, useState, useCallback, useEffect } from "react";
import classNames from "classnames";
import FileItem from "./FileItem";
import CloseButton from "../CloseButton";
import "./_upload.css";
import toast from "react-hot-toast";
import RenderIf from "../RenderIf";
import { v4 as UUID } from "uuid";

const filesToArray = (files: File[]) => Object.keys(files).map((key) => files[key]);

export interface IUploadProps {
  uploadLimit?: number;
  draggable?: boolean;
  disabled?: boolean;
  showList?: boolean;
  multiple?: boolean;
  accept?: string;
  tip?: React.ReactNode | string;
  fileList?: File[];
  children?: React.ReactNode;
  className?: string;
  baseUrlPreview?: string;
  onFileRemove?(deletedFiles: File): void;
  onChange?(updatedFiles: File[], files: File[]): void;
  beforeUpload?(newFiles: File[], files: File[]): boolean | string;
}

const Upload: React.FunctionComponent<IUploadProps> = (props) => {
  const {
    accept = "image/gif, image/jpeg, image/png, image/webp, image/jpg",
    beforeUpload,
    disabled,
    draggable = true,
    fileList = [],
    multiple,
    onChange,
    onFileRemove,
    showList = true,
    tip,
    uploadLimit,
    children,
    className,
    baseUrlPreview,
  } = props;

  const fileInputField = useRef(null);
  const [files, setFiles] = useState(fileList);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setFiles(fileList);
  }, [fileList]);

  useEffect(() => {
    if (!multiple && files.length === 2) {
      setFiles([files[1]]);
    }
  }, [multiple, files]);

  const triggerMessage = (msg?: string) => {
    toast.error(msg || "Upload Failed!", {
      position: "top-center",
    });
  };

  const pushFile = (newFiles: File[], file: File[]) => {
    for (let f of newFiles) {
      //@ts-ignore
      f.tempID = UUID();
      file.push(f);
    }
    return file;
  };

  const addNewFiles = (newFiles: File[]) => {
    let file = [];
    if (typeof uploadLimit === "number" && uploadLimit !== 0) {
      if (Object.keys(file).length >= uploadLimit) {
        if (uploadLimit === 1) {
          file.shift();
          file = pushFile(newFiles, file);
        }

        return filesToArray({ ...file });
      }
    }
    file = pushFile(newFiles, file);
    return filesToArray({ ...file });
  };

  const onNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    let result: boolean | string = true;

    if (beforeUpload) {
      result = beforeUpload(newFiles, files);

      if (result === false) {
        triggerMessage();
        return;
      }

      if (typeof result === "string" && result.length > 0) {
        triggerMessage(result);
        return;
      }
    }

    if (result) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      onChange?.(updatedFiles, files);
    }
  };

  const removeFile = (fileIndex: number) => {
    const deletedFile = files.find((_, index) => index === fileIndex);
    const deletedFileList = files.filter((_, index) => index !== fileIndex);
    setFiles(deletedFileList);
    onFileRemove?.(deletedFile);
  };

  const triggerUpload = (e) => {
    if (!disabled) {
      fileInputField.current?.click();
    }
    e.stopPropagation();
  };

  const renderChildren = () => {
    if (!draggable && !children) {
      return (
        <button
          className="btn btn-primary btn-sm"
          disabled={disabled}
          onClick={(e) => e.preventDefault()}
        >
          Upload
        </button>
      );
    }

    if (draggable && !children) {
      return <span>Choose a file or drag and drop here</span>;
    }

    return children;
  };

  const handleDragLeave = useCallback(() => {
    if (draggable) {
      setDragOver(false);
    }
  }, [draggable]);

  const handleDragOver = useCallback(() => {
    if (draggable && !disabled) {
      setDragOver(true);
    }
  }, [draggable, disabled]);

  const handleDrop = useCallback(() => {
    if (draggable) {
      setDragOver(false);
    }
  }, [draggable]);

  const draggableProp = {
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  };

  const draggableEventFeedbackClass = `border-blue-500`;

  const uploadClass = classNames(
    "upload",
    draggable && `upload-draggable`,
    draggable && !disabled && `hover:border-blue-500`,
    draggable && disabled && "disabled",
    dragOver && draggableEventFeedbackClass,
    className
  );

  const uploadInputClass = classNames("upload-input", draggable && `draggable`);

  return (
    <React.Fragment>
      <div className={uploadClass} {...(draggable ? draggableProp : { onClick: triggerUpload })}>
        <input
          className={uploadInputClass}
          type="file"
          ref={fileInputField}
          onChange={onNewFileUpload}
          disabled={disabled}
          multiple={multiple}
          accept={accept}
          title=""
          value=""
        ></input>
        {renderChildren()}
      </div>
      {tip}
      <RenderIf isTrue={showList}>
        <div className="upload-file-list">
          {files.map((file, index) => (
            <FileItem
              file={file}
              key={
                //@ts-ignore
                (file?.name || (file as string)) + index
              }
              baseUrlPreview={baseUrlPreview}
            >
              <CloseButton onClick={() => removeFile(index)} className="upload-file-remove" />
            </FileItem>
          ))}
        </div>
      </RenderIf>
    </React.Fragment>
  );
};

export default Upload;
