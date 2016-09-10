import {Item} from '../../common/collections/item.js';

// Config
import '../configs/security.js';

Item.permit(['insert', 'update', 'remove'])
    .SimplePos_ifSetting()
    .allowInClientCode();
