# 信永中和 b2bWechat

> 前端团队



## 安装

1. npm install wepy-cli -g
2. 进入项目根目录执行: npm i
3. npm run dev (执行后不能关闭)
4. 打开微信开发者工具选择导入项目-> 选择项目根目录


## 使用

[wepy开发框架](https://wepyjs.github.io/wepy-docs/1.x/#/)

[vant ui 库](https://youzan.github.io/vant-weapp/#/intro)

[ramda 常用 util 库](http://ramda.cn/docs/)

### 常用css 样式
### 引入

在 app.wxss 中引入内置样式

```css
@import "path/to/vant-weapp/dist/common/index.wxss";
```


#### 文字省略

当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```html
<view class="van-ellipsis">这是一段宽度限制 250px 的文字，后面的内容会省略</view>

<!-- 最多显示两行 -->
<view class="van-multi-ellipsis--l2">这是一段最多显示两行的文字，后面的内容会省略</view>

<!-- 最多显示三行 -->
<view class="van-multi-ellipsis--l3">这是一段最多显示三行的文字，后面的内容会省略</view>
```

### 1px 边框
为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```html
<!-- 上边框 -->
<view class="van-hairline--top"></view>

<!-- 下边框 -->
<view class="van-hairline--bottom"></view>

<!-- 左边框 -->
<view class="van-hairline--left"></view>

<!-- 右边框 -->
<view class="van-hairline--right"></view>

<!-- 上下边框 -->
<view class="van-hairline--top-bottom"></view>

<!-- 全边框 -->
<view class="van-hairline--surround"></view>
```


## 开发

页面结构:
> example
```
<!-- 订单页面 -->
order:
-----index.less
-----index.ts
-----index.wpy
```

遵循 tslint 和 eslint 的代码规范 不可乱写


## 发布历史



### v0.0.1

- 初始化项目
- 添加项目 UI库
- 添加项目规范

<!-- 三个接口同步调用 -->




onLoad() {
  1. wx.getItems().then(); 基本信息
  2. wx.getPrice(ids); 价格列表 参数商品 id: 113,44,54,54,654, 一个接口调用 不要循环调用
  3. wx.getStocks(ids); 库存列表 参数商品 id: 113,44,54,54,654, 一个接口调用 不要循环调用
}

1执行完毕 不需要关 已经在 reduces 里面有个 list 了
2.执行完毕 拿到上个接口返回的 list 循环返回来的价格 list 然后更加 list 里面的 id 找到上个列表里面的 id 更新掉这个item里面的price  最终返回一个新的 items 就实现了价格列表获取
3. 同上


### git忽略本地已存在文件的修改
- 将文件忽略提交

  ```sh
  git update-index --assume-unchanged FILENAME
  ```

- 取消文件忽略

  ```sh
    git update-index --no-assume-unchanged FILENAME
  ```

### sitemap.json

  新版本用来表示那些页面可以直接被索引的页面
  官方文档默认是全部的，但是没有会报错，后面也可以在这里添加规则进行过滤
  https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/sitemap.html


## 海信信商小程序
