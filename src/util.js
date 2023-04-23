export function getFormData(formDataElement) {
  const formData = new FormData(formDataElement);
  const dataArray = [...formData];
  const input_data = Object.fromEntries(dataArray);
  return input_data;
}

export function formatCurrency(amount) {
  const config = { style: "currency", currency: "VND" };
  const formatter = new Intl.NumberFormat("vi-VN", config);
  const formatted = formatter.format(amount).replace(/\u00A0/g, ""); // remove non-breaking space characters
  return formatted;
}

export function initArray(size) {
  return Array(parseInt(size)).fill(0);
}
