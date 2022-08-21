"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../vant/common/component.js');
component_1.VantComponent({
    props: {
        options: {
            type: Array,
            default: function () {
                return [];
            }
        },
        activeItem: {
            type: Object,
            default: function () {
                return {
                    id: '',
                    name: ''
                };
            }
        }
    },
    methods: {
        onRadioChange: function (event) {
            var option = event.currentTarget.dataset.option;
            this.$emit('onRadioChange', option);
        }
    }
});
