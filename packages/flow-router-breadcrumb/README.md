# Breadcrumb For Flow Router

### Install
```js
meteor add theara:flow-router-breadcrumb
```

### Usage
#### Register

```js
// Level 1
FlowRouter.route('/level1', {
    name: 'level1',
    action: function (params, queryParams) {
        Layout.main('level1');
    },
    breadcrumb: {
        title: 'Level 1',
        icon: 'hom' // <i class="fa fa-home"></i>
    }
});

// Level 2
FlowRouter.route('/level2', {
    name: 'level2',
    action: function (params, queryParams) {
        Layout.main('level2');
    },
    breadcrumb: {
        title: 'Level 2',
        parent: 'level1'
    }
});

// Level 3
FlowRouter.route('/level3/:level2Id', {
    name: 'level3',
    action: function (params, queryParams) {
        Layout.main('level3');
    },
    breadcrumb: {
        params: 'level2Id',
        queryParams: ['show', 'color'],
        title: 'Level 3',
        parent: 'level2'
    }
});

// Level 4
FlowRouter.route('/level4/:level2Id/:level3Id', {
    name: 'level4',
    action: function (params, queryParams) {
        Layout.main('level4');
    },
    breadcrumb: {
        params: ['level2Id', 'level3Id'],
        queryParams: ['show', 'color'],
        title: 'Level 4',
        parent: 'level3'
    }
});
```

#### Render

```js
<!--Render with bootstrap 3-->
{{> breadcrumb}}

<!--Render with custom-->
<ol class="breadcrumb">
    {{#each bc in breadcrumb}}
        {{#if bc.isActive}}
            <li class="{{bc.isActive}}">
                {{#if bc.icon}}<i class="fa fa-{{bc.icon}}"></i> {{/if}}{{bc.title}}
            </li>
        {{else}}
            <li>
                <a href="{{bc.url}}">{{#if bc.icon}}<i class="fa fa-{{bc.icon}}"></i> {{/if}}{{bc.title}}</a>
            </li>
        {{/if}}
    {{/each}}
</ol>
```
