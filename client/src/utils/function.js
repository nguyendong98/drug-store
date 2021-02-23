export const getTotalPrice = (cart) => {
    let total = 0;
    for (const item of cart) {
        total += item.qty * item.price;
    }
    return total;
}
export const getInventory = (data, id) => {
    let qty = 0;
    const now = new Date().toISOString();
    const dataProduct = data.filter(val => val['idProduct']['_id'] === id);
    if (dataProduct && dataProduct.length > 0) {
        for (const item of dataProduct) {
            if (item['expiryDate'] >= now) {
                qty += item['qty'];
            }
        }
    }
    return qty;
}
