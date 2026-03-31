import * as XLSX from "xlsx";

import { DataSheets } from "../types/misc.types";

export const generateExcelFile = (
  dataSheets: DataSheets,
  filename: string = "data.xlsx",
): void => {
  // Create a new workbook
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();

  for (const sheetName in dataSheets) {
    if (Object.prototype.hasOwnProperty.call(dataSheets, sheetName)) {
      const { headers, data } = dataSheets[sheetName];

      // Extract header labels
      const headerLabels = Object.values(headers);

      // Combine headers and data into an array of arrays
      const sheetData: any[][] = [
        headerLabels, // First row: header labels
        ...data.map(
          (row) => Object.keys(headers).map((key) => row[key] || ""), // Match row values by header keys
        ),
      ];

      // Convert array of arrays to a worksheet
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheetData);

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }
  }

  // Write the workbook and trigger download
  const excelData: ArrayBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob: Blob = new Blob([excelData], {
    type: "application/octet-stream",
  });

  const link: HTMLAnchorElement = document.createElement("a");
  const url: string = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateExcelFileV2 = (
  dataSheets: DataSheets,
  filename: string = "data.xlsx",
  spreadHeadlessData: boolean = false,
): void => {
  const combinedData: any[][] = [];
  let isFirstTable = true;

  for (const sheetName in dataSheets) {
    if (Object.prototype.hasOwnProperty.call(dataSheets, sheetName)) {
      const { headers, data } = dataSheets[sheetName];

      // Add title for the table (starting from the second table onward)
      if (!isFirstTable) {
        combinedData.push([sheetName]); // Add title row
        combinedData.push([]); // Add extra space below the title
      }
      isFirstTable = false;

      // Extract header labels
      const headerLabels = Object.values(headers);

      // Combine headers and data into an array of arrays
      const sheetData: any[][] = [
        headerLabels, // First row: header labels
        ...data.map(
          (row) => Object.keys(headers).map((key) => row[key] || ""), // Match row values by header keys
        ),
        // add the rest of the data that doesn't have a header
        ...(spreadHeadlessData
          ? data.map((row) => Object.keys(row).map((key) => row[key] || ""))
          : []),
      ];

      // Add this table's data to the combined data
      combinedData.push(...sheetData);

      // Add multiple empty rows for spacing between tables
      combinedData.push([], [], []); // Adjust the number of empty rows as needed
    }
  }

  // Convert combined data into a worksheet
  const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(combinedData);

  // Create a new workbook and append the worksheet
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Combined Data");

  // Write the workbook and trigger download
  const excelData: ArrayBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob: Blob = new Blob([excelData], {
    type: "application/octet-stream",
  });

  const link: HTMLAnchorElement = document.createElement("a");
  const url: string = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
