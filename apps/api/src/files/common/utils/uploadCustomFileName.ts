import * as path from "path";
import * as sharp from "sharp";
import * as fs from "fs";

const staticFiles = path.join(__dirname, "..", "..", "..", "..", "static");

interface UploadCustomFileNameProps {
  name: string;
  extension?: keyof sharp.FormatEnum;
  filename: string;
  location: string;
}

export const uploadCustomFileName = async (props: UploadCustomFileNameProps) => {
  const { name, extension = "png", filename, location } = props;
  const pathCustomFile = path.join(staticFiles, location, name);
  const pathFilename = path.join(staticFiles, location, filename);
  let query = sharp(pathFilename);
  query = query.toFormat(extension).png({ quality: 80 });
  await query.toFile(pathCustomFile);
  deleteFile(pathFilename);
};

const deleteFile = (pathDelete: string) => {
  if (fs.existsSync(pathDelete)) fs.unlink(pathDelete, () => {});
};
