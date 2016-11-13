import {LookupValue} from '../../common/collections/lookupValue.js';

// Config
import '../configs/security.js';

LookupValue.permit(['insert', 'update', 'remove'])
    .SimplePos_ifSetting()
    .allowInClientCode();
