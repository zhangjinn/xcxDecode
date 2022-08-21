"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
  function Config(component) {
    _classCallCheck(this, Config);

    this.Component = component;
  }

  _createClass(Config, [{
    key: "getCalendarConfig",
    value: function getCalendarConfig() {
      if (!this.Component || !this.Component.config) return {};
      return this.Component.config;
    }
  }, {
    key: "setCalendarConfig",
    value: function setCalendarConfig(key, value) {
      if (!this.Component || !this.Component.config) return;
      this.Component.config[key] = value;
    }
  }]);

  return Config;
}();

exports.default = function (component) {
  return new Config(component);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJDb25maWciLCJjb21wb25lbnQiLCJDb21wb25lbnQiLCJjb25maWciLCJrZXkiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxNO0FBQ0osa0JBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0MsU0FBTCxHQUFpQkQsU0FBakI7QUFDRDs7Ozt3Q0FDbUI7QUFDbEIsVUFBSSxDQUFDLEtBQUtDLFNBQU4sSUFBbUIsQ0FBQyxLQUFLQSxTQUFMLENBQWVDLE1BQXZDLEVBQStDLE9BQU8sRUFBUDtBQUMvQyxhQUFPLEtBQUtELFNBQUwsQ0FBZUMsTUFBdEI7QUFDRDs7O3NDQUNpQkMsRyxFQUFLQyxLLEVBQU87QUFDNUIsVUFBSSxDQUFDLEtBQUtILFNBQU4sSUFBbUIsQ0FBQyxLQUFLQSxTQUFMLENBQWVDLE1BQXZDLEVBQStDO0FBQy9DLFdBQUtELFNBQUwsQ0FBZUMsTUFBZixDQUFzQkMsR0FBdEIsSUFBNkJDLEtBQTdCO0FBQ0Q7Ozs7OztrQkFHWTtBQUFBLFNBQWEsSUFBSUwsTUFBSixDQUFXQyxTQUFYLENBQWI7QUFBQSxDIiwiZmlsZSI6ImNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgIHRoaXMuQ29tcG9uZW50ID0gY29tcG9uZW50O1xuICB9XG4gIGdldENhbGVuZGFyQ29uZmlnKCkge1xuICAgIGlmICghdGhpcy5Db21wb25lbnQgfHwgIXRoaXMuQ29tcG9uZW50LmNvbmZpZykgcmV0dXJuIHt9O1xuICAgIHJldHVybiB0aGlzLkNvbXBvbmVudC5jb25maWc7XG4gIH1cbiAgc2V0Q2FsZW5kYXJDb25maWcoa2V5LCB2YWx1ZSkge1xuICAgIGlmICghdGhpcy5Db21wb25lbnQgfHwgIXRoaXMuQ29tcG9uZW50LmNvbmZpZykgcmV0dXJuO1xuICAgIHRoaXMuQ29tcG9uZW50LmNvbmZpZ1trZXldID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50ID0+IG5ldyBDb25maWcoY29tcG9uZW50KTtcbiJdfQ==