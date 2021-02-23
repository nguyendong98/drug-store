import moment from "moment";

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

export const getDateOfISOWeek = (w, y) => {
    // calculate start date - end date
    let ISOweekStart = null;
    let ISOweekEnd = null;
    if (!y) {
        y = moment().year();

    }    if (!w) {
        w = moment().week();
    }
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    ISOweekStart = simple;
    if (dow <= 4) {
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    }
    else {
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    }
    ISOweekEnd = new Date(y, ISOweekStart.getMonth(), ISOweekStart.getDate() + 6);
    return {ISOweekStart, ISOweekEnd};
}

export const countShiftNumber = (arr, id_acc, status) => {
    switch (status) {
        case 1:
            return arr.filter(val => val.idStaff._id === id_acc).length;
        case 2:
            return arr.filter(val => val.idStaff._id === id_acc && val.completed).length;
        case 3:
            return arr.filter(val => val.idStaff._id === id_acc && !val.completed).length;
        default:
            return arr.filter(val => val.idStaff._id === id_acc).length;
    }
}

export const transMinute = (data) => {
    switch (data) {
        case 5:
            return 1/12;
        case 10:
            return 1/6;
        case 15:
            return 0.25;
        case 20:
            return 1/3;
        case 25:
            return 5/12;
        case 30:
            return 0.5;
        case 35:
            return 7/12;
        case 40:
            return 2/3;
        case 45:
            return 0.75;
        case 50:
            return 5/6;
        case 55:
            return 11/12;
        default:

            return 0;

    }
}
export const transHour = (data) => {
    if (data) {
        const trans = data.split(':');
        return Number(trans[0]) + Number(transMinute(Number(trans[1])));
    }

}
export const countHourNumber = (arr, id_acc) => {

    let hourNumber = 0;
    if (arr && arr.length > 0) {
        const arrFilter = arr.filter(val => val.idStaff._id === id_acc && val.completed);
        for (const item of arrFilter) {
            if (item.idWorkShift) {
                hourNumber += transHour(item.idWorkShift.endTime) - transHour(item.idWorkShift.startTime);
            }
        }
    }
    return hourNumber;
}
export const checkTimeToWork = (arr) => {
    let check = false;
    for (const item of arr) {
        if ( moment(new Date()).format('LT') >= item.idWorkShift.startTime &&
            moment(new Date()).format('LT') <= item.idWorkShift.endTime) {
            check = true;
        }
    }
    return check;
}
