import {Customer} from '../../common/collections/customer.js';

// Config
import '../configs/security.js';

Customer.permit(['insert'])
    .SimplePos_ifDataInsert()
    .allowInClientCode();
Customer.permit(['update'])
    .SimplePos_ifDataUpdate()
    .allowInClientCode();
Customer.permit(['remove'])
    .SimplePos_ifDataRemove()
    .allowInClientCode();
