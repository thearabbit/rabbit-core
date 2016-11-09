import {Location} from '../../common/collections/location';

// Config
import '../configs/security.js';

Location.permit(['insert', 'update', 'remove'])
    .SimplePos_ifSetting()
    .allowInClientCode();
