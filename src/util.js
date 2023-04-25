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

export function groupCategories(categories) {
  const menu = categories.reduce(
    ({ categoriesObj, hash }, category) => {
      if (!categoriesObj[category.id] && !hash[category.id]) {
        categoriesObj[category.id] = {
          id: category.id,
          name: category.name,
        };
        hash[category.id] = true;
        if (category.child_id) {
          categoriesObj[category.id].categories = [];
        }
      }
      if (category.child_id) {
        const child = {
          id: category.child_id,
          name: category.child_name,
        };
        categoriesObj[category.id].categories.push(child);
        hash[child.id] = true;
      }
      return { categoriesObj, hash };
    },
    { categoriesObj: {}, hash: {} }
  );
  return Object.values(menu.categoriesObj);
}
