import { VscFilePdf, VscFileZip, VscFile } from "react-icons/vsc";
import RenderIf from "../RenderIf";

const BYTE = 1000;
const getKB = (bytes) => Math.round(bytes / BYTE);

interface IFileIconProps {
  children?: React.ReactNode;
}

const FileIcon: React.FunctionComponent<IFileIconProps> = ({ children }) => {
  return <span className="text-4xl">{children}</span>;
};

interface IFileItemProps {
  children?: React.ReactNode;
  baseUrlPreview?: string;
  file: File | string;
}

const FileItem: React.FunctionComponent<IFileItemProps> = (props) => {
  const { file, children, baseUrlPreview = "" } = props;
  const isUrlFile = typeof file === "string";
  const name = isUrlFile ? file : file.name;
  const size = isUrlFile ? null : file.size;

  return (
    <div className="upload-file">
      <div className="flex">
        <div className="upload-file-thumbnail">
          {renderThumbnail({ isUrlFile, baseUrlPreview, file })}
        </div>
        <div className="upload-file-info">
          <p className="upload-file-name">{name}</p>
          <RenderIf isTrue={size}>
            <span className="upload-file-size">{getKB(size)} kb</span>
          </RenderIf>
        </div>
      </div>
      {children}
    </div>
  );
};

export default FileItem;

interface IRenderTumbnailProps {
  baseUrlPreview?: string;
  file: File | string;
  isUrlFile: boolean;
}

const renderThumbnail = (props: IRenderTumbnailProps) => {
  const { isUrlFile, baseUrlPreview, file } = props;
  if (isUrlFile) {
    const url = baseUrlPreview + "/" + file;
    return <img src={url} alt={""} className="upload-file-image" />;
  }

  if (!isUrlFile) {
    const { type } = file as File;
    const isImageFile = type.split("/")[0] === "image";

    if (isImageFile) {
      return (
        <img
          className="upload-file-image"
          src={URL.createObjectURL(file as File)}
          alt={`file preview ${name}`}
        />
      );
    }

    if (type === "application/zip") {
      return (
        <FileIcon>
          <VscFileZip />
        </FileIcon>
      );
    }

    if (type === "application/pdf") {
      return (
        <FileIcon>
          <VscFilePdf />
        </FileIcon>
      );
    }

    return (
      <FileIcon>
        <VscFile />
      </FileIcon>
    );
  }
};
