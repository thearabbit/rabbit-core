import {Order} from '../../imports/api/collections/order.js';

// Lib
import './_init.js';

Order.permit(['insert'])
    .Simple_ifDataInsert()
    .allowInClientCode();
Order.permit(['update'])
    .Simple_ifDataUpdate()
    .allowInClientCode();
Order.permit(['remove'])
    .Simple_ifDataRemove()
    .allowInClientCode();
