"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../common/component.js');
var link_1 = require('./../mixins/link.js');
var button_1 = require('./../mixins/button.js');
var open_type_1 = require('./../mixins/open-type.js');
component_1.VantComponent({
    classes: ['icon-class', 'text-class'],
    mixins: [link_1.link, button_1.button, open_type_1.openType],
    props: {
        text: String,
        info: String,
        icon: String,
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick: function (event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        }
    }
});
