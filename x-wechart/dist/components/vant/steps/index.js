"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../common/component.js');
var color_1 = require('./../common/color.js');
component_1.VantComponent({
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            value: 'horizontal'
        },
        activeColor: {
            type: String,
            value: color_1.GREEN
        }
    }
});
