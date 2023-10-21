import { UseInterceptors, applyDecorators } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { fileFilter, fileNamer } from "src/files/common/utils";

interface UploadImageProps {
  destination: string;
}

export function UploadImage(props: UploadImageProps) {
  const { destination } = props;

  return applyDecorators(
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    }),
    UseInterceptors(
      FileInterceptor("file", {
        fileFilter: fileFilter,
        storage: diskStorage({
          destination: `./static/${destination}`,
          filename: fileNamer,
        }),
      })
    )
  );
}
