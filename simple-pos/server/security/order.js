import {Order} from '../../common/collections/order.js';

// Config
import '../configs/security.js';

Order.permit(['insert'])
    .SimplePos_ifDataInsert()
    .allowInClientCode();
Order.permit(['update'])
    .SimplePos_ifDataUpdate()
    .allowInClientCode();
Order.permit(['remove'])
    .SimplePos_ifDataRemove()
    .allowInClientCode();
