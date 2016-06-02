import {TAPi18n} from 'meteor/tap:i18n';

export const __ = function (key, options, lang_tag = null) {
    return TAPi18n.__.bind(TAPi18n, key, options, lang_tag);
};
