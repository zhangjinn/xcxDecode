"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../common/component.js');
component_1.VantComponent({
    props: {
        count: {
            type: Number,
            value: 0,
            observer: 'finalCount'
        },
        overflowCount: {
            type: Number,
            value: 99
        },
        dot: {
            type: Boolean,
            value: false
        },
    },
    data: {
        finalCount: 0
    },
    methods: {
        finalCount: function () {
            this.set({
                finalCount: parseInt(this.data.count) >= parseInt(this.data.overflowCount) ? this.data.overflowCount + "+" : this.data.count
            });
        },
    }
});
