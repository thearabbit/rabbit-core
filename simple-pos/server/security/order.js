import {Order} from '../../imports/api/collections/order.js';

// Lib
import './_init.js';

Order.permit(['insert'])
    .SimplePos_ifDataInsert()
    .allowInClientCode();
Order.permit(['update'])
    .SimplePos_ifDataUpdate()
    .allowInClientCode();
Order.permit(['remove'])
    .SimplePos_ifDataRemove()
    .allowInClientCode();
