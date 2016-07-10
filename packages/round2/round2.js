import {check, Match} from 'meteor/check';
import roundTo from 'round-to';

export const round2 = function (value, precision, type = null) {
    // Check
    check(value, Number);
    check(precision, Match.Integer);
    check(type, Match.OneOf(null, String));

    let amount;

    switch (type) {
        case 'up':
            amount = roundTo.up(value, precision);
            break;
        case 'down':
            amount = roundTo.down(value, precision);
            break;
        case 'general':
        default:
            amount = roundTo(value, precision);
    }

    return amount;
};
