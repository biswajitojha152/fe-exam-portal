import * as XLSX from "sheetjs-style";

const exportToExcel = (jsonData, fileName) => {
  if (!jsonData || jsonData.length === 0) return;

  const headers = Object.keys(jsonData[0]);
  const data = jsonData.map((item) => Object.values(item));

  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

  const headerStyle = {
    fill: { fgColor: { rgb: "D3D3D3" } },
    font: { bold: true, color: { rgb: "000000" } },
    // alignment: { horizontal: "center" },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } },
    },
  };

  headers.forEach((_, index) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
    ws[cellRef].s = headerStyle;
  });

  const colWidths = new Array(headers.length).fill(0);
  data.forEach((row) => {
    row.forEach((cell, index) => {
      const cellLength = String(cell).length;
      colWidths[index] = Math.max(colWidths[index], cellLength);
    });
  });

  headers.forEach((header, index) => {
    const headerLength = String(header).length;
    colWidths[index] = Math.max(colWidths[index], headerLength);
  });

  const colWidthsArr = colWidths.map((width) => ({ wch: width + 2 }));

  ws["!cols"] = colWidthsArr;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export default exportToExcel;
