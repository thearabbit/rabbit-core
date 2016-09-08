import 'meteor/matb33:collection-hooks';
import {idGenerator} from 'meteor/theara:id-generator';
import moment from 'moment';

// Collection
import  {Exchange} from '../../common/collections/exchange';

Exchange.before.insert(function (userId, doc) {
    doc.exDateText = moment(doc.exDate).format('DD/MM/YYYY');
});

Exchange.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    modifier.$set.exDateText = moment(modifier.$set.exDate).format('DD/MM/YYYY');
});
