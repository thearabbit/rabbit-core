// Round KHR Currency
roundKhr = function (amount) {
    var amountVal = math.round(amount / 100) * 100;

    return amountVal;
};