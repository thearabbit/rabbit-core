import {Company} from '../../common/collections/company.js';
import {Branch} from '../../common/collections/branch.js';
import {Setting} from '../../common/collections/setting.js';
import {Exchange} from '../../common/collections/exchange.js';

// Lib
import './_init.js';

// Company
Company.permit(['update'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();

// Branch
Branch.permit(['insert'])
    .core_ifSuper()
    .allowInClientCode();
Branch.permit(['update'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();
Branch.permit(['remove'])
    .core_ifSuper()
    .allowInClientCode();

// Setting
Setting.permit(['update'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();

// Exchange
Exchange.permit(['insert', 'update', 'remove'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();

// User
Meteor.users.permit(['insert', 'update', 'remove'])
    .core_ifSuperOrAdmin()
    .allowInClientCode();
