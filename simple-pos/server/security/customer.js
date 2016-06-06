import {Customer} from '../../imports/api/collections/customer.js';

// Lib
import './_init.js';

Customer.permit(['insert'])
    .SimplePos_ifDataInsert()
    .allowInClientCode();
Customer.permit(['update'])
    .SimplePos_ifDataUpdate()
    .allowInClientCode();
Customer.permit(['remove'])
    .SimplePos_ifDataRemove()
    .allowInClientCode();
