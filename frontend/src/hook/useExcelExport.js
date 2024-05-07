import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

const defaultOptions = {
  name: "Export",
  data: [
    [new Date("2019-07-20"), 70.1],
    [new Date("2019-07-21"), 70.6],
    [new Date("2019-07-22"), 70.1],
  ],
  tableOptions: {
    name: "TableExport",
    ref: "A1",
    style: {
      theme: "TableStyleLight3",
      showRowStripes: true,
    },
    columns: [
      { name: "ID", filterButton: true },
      { name: "Product Name", filterButton: true },
      { name: "Quantity", filterButton: true },
      { name: "Total Price", filterButton: true },
    ],
  },
};

export const useExcelExport = () => {
  const generate = (data, workbookOptions, tableOptions) => {
    const configuration = { ...defaultOptions.tableOptions, ...tableOptions };

    var workbook = new Workbook();
    var sheet = workbook.addWorksheet(workbookOptions.name);

    var col = sheet.getColumn(2);
    col.outlineLevel = 1;

    sheet.addTable({
      name: configuration.name,
      ref: configuration.ref,
      headerRow: configuration.headerRow,
      totalsRow: configuration.totalsRow,
      style: configuration.style,
      columns: configuration.columns,
      rows: data,
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${workbookOptions.name}.xlsx`);
    });
  };

  return {
    generate,
  };
};
