import {BlazeLayout} from 'meteor/kadira:blaze-layout';

let _renderLayout = (layout, regions)=> {
    if (typeof regions !== 'object') {
        regions = {content: regions};
    }
    //regions.materialInit = 'materialInit';

    BlazeLayout.render(layout, regions);
};

export const Layout = {
    login (regions) {
        _renderLayout('LoginLayout', regions);
    },
    main (regions) {
        _renderLayout('MainLayout', regions);
    },
    report (regions) {
        _renderLayout('ReportLayout', regions);
    },
    help (regions) {
        _renderLayout('HelpLayout', regions);
    },
    generator (regions) {
        _renderLayout('GeneratorLayout', regions);
    },
    render (layout, regions) {
        _renderLayout(layout, regions);
    }
};
