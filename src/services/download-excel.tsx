export async function downloadExcel(endpoint, filters) {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/export/${endpoint}?${queryString}`, {
      method: 'GET',
    });

    const blob = await response.blob();

    const fileName = 'report.xlsx';

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to download Excel file:', error);
  }
}
