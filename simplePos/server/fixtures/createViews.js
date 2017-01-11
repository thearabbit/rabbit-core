// Create Views
let views = [
    {
        "info": {
            "readOnly": true
        },
        "name": "simplePos_orderView",
        "options": {
            "pipeline": [
                {
                    "$lookup": {
                        "as": "customerDoc",
                        "foreignField": "_id",
                        "from": "simplePos_customer",
                        "localField": "customerId"
                    }
                },
                {
                    "$unwind": "$customerDoc"
                }
            ],
            "viewOn": "simplePos_order"
        },
        "type": "view"
    }];


// Run on mongo shell

// _.forEach(views, (o) => {
//     db.createView(o.name, o.options.viewOn, o.options.pipeline);
// });
