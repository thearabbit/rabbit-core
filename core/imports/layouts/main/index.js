import {Template} from 'meteor/templating';
import {TAPi18n} from 'meteor/tap:i18n';
import 'meteor/255kb:meteor-status';

// --------- Tabular Config -------------
import {$} from 'meteor/jquery';

// Bootstrap Theme
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

// Buttons Core
import dataTableButtons from 'datatables.net-buttons-bs';

// Import whichever buttons you are using
import columnVisibilityButton from 'datatables.net-buttons/js/buttons.colVis.js';
import html5ExportButtons from 'datatables.net-buttons/js/buttons.html5.js';
import flashExportButtons from 'datatables.net-buttons/js/buttons.flash.js';
import printButton from 'datatables.net-buttons/js/buttons.print.js';

// Then initialize everything you imported
dataTablesBootstrap(window, $);
dataTableButtons(window, $);
columnVisibilityButton(window, $);
html5ExportButtons(window, $);
flashExportButtons(window, $);
printButton(window, $);
// --------- /Tabular Config -------------

// Admin-lte layout
import 'meteor/theara:admin-lte/admin-lte.js';

// Sub layout
import './header.js';
import './sidebar.js';
import './content-header.js';
import './footer.js';

// Page
import './index.html';