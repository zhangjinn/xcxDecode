"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../common/component.js');
var color_1 = require('./../common/color.js');
var utils_1 = require('./../common/utils.js');
component_1.VantComponent({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        progress: Number,
        pivotColor: String,
        trackColor: String,
        showPivot: {
            type: Boolean,
            value: true
        },
        color: {
            type: String,
            value: color_1.BLUE
        },
        textColor: {
            type: String,
            value: '#fff'
        },
        strokeWidth: {
            type: null,
            observer: 'setStrokeWidthUnit'
        }
    },
    data: {
        strokeWidthUnit: '14px'
    },
    methods: {
        setStrokeWidthUnit: function (val) {
            this.setData({
                strokeWidthUnit: utils_1.addUnit(val)
            });
        }
    }
});
