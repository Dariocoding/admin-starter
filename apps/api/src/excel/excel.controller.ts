import { Controller, Post, Body, Res, Query } from "@nestjs/common";
import { ExcelService } from "./excel.service";
import * as ExcelJS from "exceljs";
import { Style } from "exceljs";
import { Response } from "express";
import { GenerarExcelType } from "@teslo/interfaces";
import { ExcelParamsDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { stringToSlug } from "src/common/utils";

@Controller("excel")
@ApiTags("Export Service")
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post()
  async generarExcel(
    @Res() res: Response,
    @Body() body: GenerarExcelType,
    @Query() query: ExcelParamsDto
  ) {
    const { csv } = query;

    res.set({
      "Content-Disposition": "attachment; filename=myfilename.csv",
      "Content-Type": `application/csv`,
    });

    const workbook = new ExcelJS.Workbook();
    if (!csv) {
      workbook.calcProperties.fullCalcOnLoad = true;
    }

    const sheet = csv ? workbook.addWorksheet() : workbook.addWorksheet(body.name.substring(0, 30));
    //@ts-ignore
    const style: Style = {
      font: { name: "Yu Gothic", bold: true },
      alignment: {
        horizontal: "center",
        vertical: "middle",
        wrapText: true,
        shrinkToFit: true,
      },
    };

    sheet.columns = body.columns.map((b) => ({
      ...b,
      key: stringToSlug(b.header),
      width: csv ? null : b.width ? b.width : 15,
      style: csv ? null : style,
    }));

    let row = 3;
    body.data.forEach((p) => {
      sheet.insertRow(row, p || "");
      if (!csv) {
        sheet.getRow(row).font = { bold: false, name: "Arial", size: 9 };
      }
      row++;
    });

    if (csv) {
      return workbook.csv.write(res, { encoding: "UTF-8" });
    }

    return workbook.xlsx.write(res);
  }
}
