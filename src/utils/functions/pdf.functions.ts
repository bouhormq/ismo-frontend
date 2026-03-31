export const generatePDF = async (
  blob: Blob,
  fileName: string,
  view?: boolean,
) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  if (view) link.target = "_blank";
  else link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Delay revoke to let browser finish the download
  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};
