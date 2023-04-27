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

export function groupOrdersInDetail(orders) {
  const menu = orders.reduce((ordersObj, order) => {
    if (!ordersObj[order.id]) {
      ordersObj[order.id] = {
        id: order.id,
        total: order.total,
        user_id: order.user_id,
        username: order.username,
        order_items: [],
        created_at: order.created_at,
      };
    }
    const order_item = {
      id: order.product_id,
      name: order.product_name,
      quantity: order.quantity,
      price: order.price,
    };
    ordersObj[order.id].order_items.push(order_item);
    return ordersObj;
  }, {});
  return Object.values(menu);
}
