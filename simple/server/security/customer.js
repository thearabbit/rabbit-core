import {Customer} from '../../imports/api/collections/customer.js';

// Lib
import './_init.js';

Customer.permit(['insert'])
    .Simple_ifDataInsert()
    .allowInClientCode();
Customer.permit(['update'])
    .Simple_ifDataUpdate()
    .allowInClientCode();
Customer.permit(['remove'])
    .Simple_ifDataRemove()
    .allowInClientCode();
