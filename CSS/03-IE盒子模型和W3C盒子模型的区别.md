# IE盒子模型和W3C盒子模型的区别

IE盒模型与W3C盒模型的区别在于width（content）的计算，在IE的盒模型中的width（content）是包括了padding和border，而W3C的盒模型的width是不包括的，避免触发IE盒模型的方法是使用<!DOCTYPE html>声明，告诉IE采用IE浏览器采用W3C盒子模型即可

<!DOCTYPE> 声明必须是 HTML 文档的第一行，位于 <html> 标签之前。

<!DOCTYPE> 声明不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。
<!doctype>

始终向 HTML 文档添加 <!DOCTYPE> 声明，这样浏览器才能获知文档类型

IE的盒模型问题只会只会出现在IE5.5及其更早的版本中，因为在IE6及更新的版本在标准兼容模式下使用的是W3C的盒模型标准，但不仅IE5.5，连IE6的使用率也很好

盒子模型 = margin + border + padding + content

### Box-sizing 属性：

- 初始值：content-box
- 适用于：接受的所有元素的宽度或高度
- 继承：无
- 媒体：visual
- 指定的：as specified
- 动画：no
- 规范秩序：独特的无歧义的正式语法定义的顺序

## Box-sizing 属性取值

### `content-box`：

这是默认样式指定 CSS 标准。测量 winth 和 height 属性只包括的内容，但不是 border、margin 或者 padding。

### `padding-box`：

```
winth` 和 `height` 属性包括 `padding` 的大小，不包括 `border` 和 `margin
```

### `border-box`：

`winth` 和 `height` 属性包括 `padding` 和 `border`，但不是 `margin`。这是盒模型的文档时，Internet Explorer 使用 Quirks 怪异模式。

### `box-sizing:content-box`：

W3C的 width = content `box-sizing:content-box`

这是默认样式指定 CSS 标准。测量 winth 和 height 属性只包括的内容，但不是 border、margin 或者 padding

### ` box-sizing：border-box`：

IE 的width = content + padding + border 

当我们设置 `box-sizing: border-box;` 时，浏览器对盒模型的解释与 IE6 之前的版本相同，当它定义 `width` 和 `height` 时，`border` 和 `padding` 则是被包含在宽高之内的。内容的宽和高可以通过定义的 width 和 height 减去相应方向的 padding 和 border 的宽度得到。内容的宽和高必须保证不能为负，必要时将自动增大该元素 border box 的尺寸以使其内容的宽或高最小为 0。
