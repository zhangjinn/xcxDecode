'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//Parser组件
var html2nodes = require('./Parser.js');
var initData = function initData(Component) {
  setTimeout(function () {
    Component.createSelectorQuery().select('#contain').boundingClientRect(function (res) {
      Component.triggerEvent('ready', res);
    }).exec();
    Component.videoContext = [];
    var nodes = [Component.selectComponent('#contain')];
    nodes = nodes.concat(Component.selectAllComponents('#contain>>>#node'));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = node.data.nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            if (item.name == 'video') {
              Component.videoContext.push({
                id: item.attrs.id,
                context: wx.createVideoContext(item.attrs.id, node)
              });
            } else if (item.name == 'audio' && item.attrs.autoplay) wx.createAudioContext(item.attrs.id, node).play();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }, 10);
};
Component({
  properties: {
    'html': {
      type: null,
      value: '',
      observer: function observer(html) {
        var _this = this;

        var hideAnimation = {},
            showAnimation = {};
        if (this.data.showWithAnimation) {
          hideAnimation = wx.createAnimation({
            duration: this.data.animationDuration,
            timingFunction: "ease"
          }).opacity(0).step().export();
          showAnimation = wx.createAnimation({
            duration: this.data.animationDuration,
            timingFunction: "ease"
          }).opacity(1).step().export();
        }
        if (!html) {
          this.setData({
            nodes: []
          });
        } else if (typeof html == 'string') {
          html2nodes(html, this.data.tagStyle).then(function (res) {
            _this.setData({
              nodes: res.nodes,
              controls: {
                imgMode: _this.data.imgMode
              },
              showAnimation: showAnimation,
              hideAnimation: hideAnimation
            }, initData(_this));
            if (res.title && _this.data.autosetTitle) {
              wx.setNavigationBarTitle({
                title: res.title
              });
            }
            _this.imgList = res.imgList;
            _this.triggerEvent('parse', res);
          }).catch(function (err) {
            _this.triggerEvent('error', err);
          });
        } else if (html.constructor == Array) {
          this.setData({
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation: showAnimation,
            hideAnimation: hideAnimation
          }, initData(this));
          this.imgList = [];
        } else if ((typeof html === 'undefined' ? 'undefined' : _typeof(html)) == 'object') {
          if (!html.nodes || html.nodes.constructor != Array) {
            this.triggerEvent('error', {
              message: "传入的nodes数组格式不正确！应该传入的类型是array，实际传入的类型是：" + _typeof(html.nodes)
            });
            return;
          }
          this.setData({
            controls: {
              imgMode: this.data.imgMode
            },
            showAnimation: showAnimation,
            hideAnimation: hideAnimation
          }, initData(this));
          if (html.title && this.data.autosetTitle) {
            wx.setNavigationBarTitle({
              title: html.title
            });
          }
          this.imgList = html.imgList || [];
        } else {
          this.triggerEvent('error', {
            message: "错误的html类型：" + (typeof html === 'undefined' ? 'undefined' : _typeof(html))
          });
        }
      }
    },
    'autocopy': {
      type: Boolean,
      value: true
    },
    'autopause': {
      type: Boolean,
      value: true
    },
    'autosetTitle': {
      type: Boolean,
      value: true
    },
    'imgMode': {
      type: String,
      value: "default"
    },
    'selectable': {
      type: Boolean,
      value: false
    },
    'tagStyle': {
      type: Object,
      value: {}
    },
    'showWithAnimation': {
      type: Boolean,
      value: false
    },
    'animationDuration': {
      type: Number,
      value: 400
    }
  },
  methods: {
    //事件
    tapEvent: function tapEvent(e) {
      if (this.data.autocopy && e.detail && /^http/.test(e.detail)) {
        wx.setClipboardData({
          data: e.detail,
          success: function success() {
            wx.showToast({
              title: '链接已复制'
            });
          }
        });
      }
      this.triggerEvent('linkpress', e.detail);
    },
    errorEvent: function errorEvent(e) {
      this.triggerEvent('error', e.detail);
    },

    //内部方法
    _previewImg: function _previewImg(e) {
      wx.previewImage({
        current: e.detail,
        urls: this.imgList.length ? this.imgList : [e.detail]
      });
    },
    _playVideo: function _playVideo(e) {
      if (this.videoContext.length > 1 && this.data.autopause) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.videoContext[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var video = _step3.value;

            if (video.id == e.detail) continue;
            video.context.pause();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImh0bWwybm9kZXMiLCJyZXF1aXJlIiwiaW5pdERhdGEiLCJDb21wb25lbnQiLCJzZXRUaW1lb3V0IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInRyaWdnZXJFdmVudCIsInJlcyIsImV4ZWMiLCJ2aWRlb0NvbnRleHQiLCJub2RlcyIsInNlbGVjdENvbXBvbmVudCIsImNvbmNhdCIsInNlbGVjdEFsbENvbXBvbmVudHMiLCJub2RlIiwiZGF0YSIsIml0ZW0iLCJuYW1lIiwicHVzaCIsImlkIiwiYXR0cnMiLCJjb250ZXh0Iiwid3giLCJjcmVhdGVWaWRlb0NvbnRleHQiLCJhdXRvcGxheSIsImNyZWF0ZUF1ZGlvQ29udGV4dCIsInBsYXkiLCJwcm9wZXJ0aWVzIiwidHlwZSIsInZhbHVlIiwib2JzZXJ2ZXIiLCJodG1sIiwiaGlkZUFuaW1hdGlvbiIsInNob3dBbmltYXRpb24iLCJzaG93V2l0aEFuaW1hdGlvbiIsImNyZWF0ZUFuaW1hdGlvbiIsImR1cmF0aW9uIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJ0aW1pbmdGdW5jdGlvbiIsIm9wYWNpdHkiLCJzdGVwIiwiZXhwb3J0Iiwic2V0RGF0YSIsInRhZ1N0eWxlIiwidGhlbiIsImNvbnRyb2xzIiwiaW1nTW9kZSIsInRpdGxlIiwiYXV0b3NldFRpdGxlIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwiaW1nTGlzdCIsImNhdGNoIiwiZXJyIiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1lc3NhZ2UiLCJCb29sZWFuIiwiU3RyaW5nIiwiT2JqZWN0IiwiTnVtYmVyIiwibWV0aG9kcyIsInRhcEV2ZW50IiwiZSIsImF1dG9jb3B5IiwiZGV0YWlsIiwidGVzdCIsInNldENsaXBib2FyZERhdGEiLCJzdWNjZXNzIiwic2hvd1RvYXN0IiwiZXJyb3JFdmVudCIsIl9wcmV2aWV3SW1nIiwicHJldmlld0ltYWdlIiwiY3VycmVu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QUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUt4RDtBQUNGO0FBaENNO0FBL0dELENBQVYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1BhcnNlcue7hOS7tlxuY29uc3QgaHRtbDJub2RlcyA9IHJlcXVpcmUoJy4vUGFyc2VyLmpzJyk7XG5jb25zdCBpbml0RGF0YSA9IGZ1bmN0aW9uKENvbXBvbmVudCkge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBDb21wb25lbnQuY3JlYXRlU2VsZWN0b3JRdWVyeSgpLnNlbGVjdCgnI2NvbnRhaW4nKS5ib3VuZGluZ0NsaWVudFJlY3QocmVzID0+IHtcbiAgICAgIENvbXBvbmVudC50cmlnZ2VyRXZlbnQoJ3JlYWR5JywgcmVzKTtcbiAgICB9KS5leGVjKCk7XG4gICAgQ29tcG9uZW50LnZpZGVvQ29udGV4dCA9IFtdO1xuICAgIGxldCBub2RlcyA9IFtDb21wb25lbnQuc2VsZWN0Q29tcG9uZW50KCcjY29udGFpbicpXTtcbiAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChDb21wb25lbnQuc2VsZWN0QWxsQ29tcG9uZW50cygnI2NvbnRhaW4+Pj4jbm9kZScpKTtcbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBmb3IgKGxldCBpdGVtIG9mIG5vZGUuZGF0YS5ub2Rlcykge1xuICAgICAgICBpZiAoaXRlbS5uYW1lID09ICd2aWRlbycpIHtcbiAgICAgICAgICBDb21wb25lbnQudmlkZW9Db250ZXh0LnB1c2goe1xuICAgICAgICAgICAgaWQ6IGl0ZW0uYXR0cnMuaWQsXG4gICAgICAgICAgICBjb250ZXh0OiB3eC5jcmVhdGVWaWRlb0NvbnRleHQoaXRlbS5hdHRycy5pZCwgbm9kZSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLm5hbWUgPT0gJ2F1ZGlvJyAmJiBpdGVtLmF0dHJzLmF1dG9wbGF5KVxuICAgICAgICAgIHd4LmNyZWF0ZUF1ZGlvQ29udGV4dChpdGVtLmF0dHJzLmlkLCBub2RlKS5wbGF5KCk7XG4gICAgICB9XG4gICAgfVxuICB9LCAxMClcbn1cbkNvbXBvbmVudCh7XG4gIHByb3BlcnRpZXM6IHtcbiAgICAnaHRtbCc6IHtcbiAgICAgIHR5cGU6IG51bGwsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICBvYnNlcnZlcjogZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICBsZXQgaGlkZUFuaW1hdGlvbiA9IHt9LFxuICAgICAgICAgIHNob3dBbmltYXRpb24gPSB7fTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5zaG93V2l0aEFuaW1hdGlvbikge1xuICAgICAgICAgIGhpZGVBbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuZGF0YS5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiBcImVhc2VcIlxuICAgICAgICAgIH0pLm9wYWNpdHkoMCkuc3RlcCgpLmV4cG9ydCgpO1xuICAgICAgICAgIHNob3dBbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuZGF0YS5hbmltYXRpb25EdXJhdGlvbixcbiAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiBcImVhc2VcIlxuICAgICAgICAgIH0pLm9wYWNpdHkoMSkuc3RlcCgpLmV4cG9ydCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaHRtbCkge1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBub2RlczogW11cbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBodG1sID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaHRtbDJub2RlcyhodG1sLCB0aGlzLmRhdGEudGFnU3R5bGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIG5vZGVzOiByZXMubm9kZXMsXG4gICAgICAgICAgICAgIGNvbnRyb2xzOiB7XG4gICAgICAgICAgICAgICAgaW1nTW9kZTogdGhpcy5kYXRhLmltZ01vZGVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc2hvd0FuaW1hdGlvbixcbiAgICAgICAgICAgICAgaGlkZUFuaW1hdGlvblxuICAgICAgICAgICAgfSwgaW5pdERhdGEodGhpcykpXG4gICAgICAgICAgICBpZiAocmVzLnRpdGxlICYmIHRoaXMuZGF0YS5hdXRvc2V0VGl0bGUpIHtcbiAgICAgICAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogcmVzLnRpdGxlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmltZ0xpc3QgPSByZXMuaW1nTGlzdDtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdwYXJzZScsIHJlcyk7XG4gICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChodG1sLmNvbnN0cnVjdG9yID09IEFycmF5KSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGNvbnRyb2xzOiB7XG4gICAgICAgICAgICAgIGltZ01vZGU6IHRoaXMuZGF0YS5pbWdNb2RlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd0FuaW1hdGlvbixcbiAgICAgICAgICAgIGhpZGVBbmltYXRpb25cbiAgICAgICAgICB9LCBpbml0RGF0YSh0aGlzKSlcbiAgICAgICAgICB0aGlzLmltZ0xpc3QgPSBbXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaHRtbCA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmICghaHRtbC5ub2RlcyB8fCBodG1sLm5vZGVzLmNvbnN0cnVjdG9yICE9IEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnZXJyb3InLCB7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IFwi5Lyg5YWl55qEbm9kZXPmlbDnu4TmoLzlvI/kuI3mraPnoa7vvIHlupTor6XkvKDlhaXnmoTnsbvlnovmmK9hcnJhee+8jOWunumZheS8oOWFpeeahOexu+Wei+aYr++8mlwiICsgdHlwZW9mIGh0bWwubm9kZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgY29udHJvbHM6IHtcbiAgICAgICAgICAgICAgaW1nTW9kZTogdGhpcy5kYXRhLmltZ01vZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaG93QW5pbWF0aW9uLFxuICAgICAgICAgICAgaGlkZUFuaW1hdGlvblxuICAgICAgICAgIH0sIGluaXREYXRhKHRoaXMpKVxuICAgICAgICAgIGlmIChodG1sLnRpdGxlICYmIHRoaXMuZGF0YS5hdXRvc2V0VGl0bGUpIHtcbiAgICAgICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICAgICAgICAgIHRpdGxlOiBodG1sLnRpdGxlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmltZ0xpc3QgPSBodG1sLmltZ0xpc3QgfHwgW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2Vycm9yJywge1xuICAgICAgICAgICAgbWVzc2FnZTogXCLplJnor6/nmoRodG1s57G75Z6L77yaXCIgKyB0eXBlb2YgaHRtbFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAnYXV0b2NvcHknOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgICdhdXRvcGF1c2UnOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgICdhdXRvc2V0VGl0bGUnOntcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogdHJ1ZVxuICAgIH0sXG4gICAgJ2ltZ01vZGUnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogXCJkZWZhdWx0XCJcbiAgICB9LFxuICAgICdzZWxlY3RhYmxlJzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0sXG4gICAgJ3RhZ1N0eWxlJzoge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgdmFsdWU6IHt9XG4gICAgfSxcbiAgICAnc2hvd1dpdGhBbmltYXRpb24nOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSxcbiAgICAnYW5pbWF0aW9uRHVyYXRpb24nOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogNDAwXG4gICAgfVxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLy/kuovku7ZcbiAgICB0YXBFdmVudChlKSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmF1dG9jb3B5ICYmIGUuZGV0YWlsICYmIC9eaHR0cC8udGVzdChlLmRldGFpbCkpIHtcbiAgICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgZGF0YTogZS5kZXRhaWwsXG4gICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn6ZO+5o6l5bey5aSN5Yi2JyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2xpbmtwcmVzcycsIGUuZGV0YWlsKTtcbiAgICB9LFxuICAgIGVycm9yRXZlbnQoZSkge1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2Vycm9yJywgZS5kZXRhaWwpO1xuICAgIH0sXG4gICAgLy/lhoXpg6jmlrnms5VcbiAgICBfcHJldmlld0ltZyhlKSB7XG4gICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICBjdXJyZW50OiBlLmRldGFpbCxcbiAgICAgICAgdXJsczogdGhpcy5pbWdMaXN0Lmxlbmd0aCA/IHRoaXMuaW1nTGlzdCA6IFtlLmRldGFpbF0sXG4gICAgICB9KVxuICAgIH0sXG4gICAgX3BsYXlWaWRlbyhlKSB7XG4gICAgICBpZiAodGhpcy52aWRlb0NvbnRleHQubGVuZ3RoID4gMSAmJiB0aGlzLmRhdGEuYXV0b3BhdXNlKSB7XG4gICAgICAgIGZvciAobGV0IHZpZGVvIG9mIHRoaXMudmlkZW9Db250ZXh0KSB7XG4gICAgICAgICAgaWYgKHZpZGVvLmlkID09IGUuZGV0YWlsKSBjb250aW51ZTtcbiAgICAgICAgICB2aWRlby5jb250ZXh0LnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pIl19