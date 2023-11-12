import * as XLSX from "xlsx";

const exportToExcel = (data, fileName) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

const handleExportToExcel = () => {
  const formattedData = utmUrlHistory.map((url) => {
    const urlObj = new URL(url);
    return {
      URL: urlObj.origin + urlObj.pathname,
      UTM_SOURCE: urlObj.searchParams.get("utm_source") || "",
      UTM_MEDIUM: urlObj.searchParams.get("utm_medium") || "",
      UTM_CAMPAIGN: urlObj.searchParams.get("utm_campaign") || "",
    };
  });

  exportToExcel(formattedData, `UTM_URL_HISTORY_${Date.now()}`);
};

export { handleExportToExcel };
