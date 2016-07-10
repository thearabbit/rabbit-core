import roundTo from 'round-to';

export default round2 = function (value, precision = 2, type = 'general') {
    let amount;

    switch (type) {
        case 'up':
            amount = roundTo.up(value, precision);
            break;
        case 'down':
            amount = roundTo.down(value, precision);
            break;
        default:
            amount = roundTo(value, precision);
    }

    return amount;
}
