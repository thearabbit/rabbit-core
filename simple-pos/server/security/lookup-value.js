import {LookupValue} from '../../imports/api/collections/lookup-value.js';

// Lib
import './_init.js';

LookupValue.permit(['insert', 'update', 'remove'])
    .SimplePos_ifSetting()
    .allowInClientCode();
