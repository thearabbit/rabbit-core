import {LookupValue} from '../../common/collections/lookup-value.js';

// Config
import '../configs/security.js';

LookupValue.permit(['insert', 'update', 'remove'])
    .SimplePos_ifSetting()
    .allowInClientCode();
