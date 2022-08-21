"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require('./../common/component.js');
var safe_area_1 = require('./../mixins/safe-area.js');
component_1.VantComponent({
    mixins: [safe_area_1.safeArea()]
});
