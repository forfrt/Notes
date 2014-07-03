
#Markdown宗旨
> Markdown的目标是实现**易读易写**

> Markdown语法目标 成为一种适用于网络的书写语言

##与HTML的区别

1. Markdown的理念是能让文档更容易读、写和随意改
1. HTML是一种发布格式
1. Markdown是一种书写格式

因此，不在Markdown涵盖范围之内的变迁，都可以直接在文档里面用HTML编写.

#Markdown语法

##特殊字符自动转换
> Markdown让你可以自然地书写字符，需要转换的由它来处理好了

+ &
    1. &用作类似&copy;用法时，不进行实体转换
    1. &用作类似AT&T时，&自动转换为&amp;
+ < 
    1. < 用作HTML定界符时，Markdown不会对它做任何转换
    1. < 用作类似4 < 5用法时，< 会被转换为&lt;

##区块元素
###段落和换行
> 一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行（空行的定义是显示上看起来像是空的，便会被视为空行。比方说，若某一行只包含空格和制表符，则该行也会被视为空行）。普通段落不该用空格或制表符来缩进.
> 如果你确实想要依赖 Markdown 来插入 <br /> 标签的话，在插入处先按入两个以上的空格然后回车.

###标题
1. 类Setext格式
    1. This is an H1
====================
    1. this is an H2
--------------------
1. 类atx格式
    1. #这是H1
    1. ##这是H2
    1. ###这是H3
    1. ####这是H4
    1. #####这是H5
    1. ######这是H6

###区块引用 Blockquotes
> this is a blockquote with two paragraphs.
> the secound paragraphs.

或者:
> this is a blockquote with two paragraphs.
the secound paragraphs.

至于嵌套:
> this is the first level of quoting.
> > this is the nested blockquote.

在引用的区块内也可以**使用其他Markdown语法**，包括标题、列表、代码区块...

###列表
> 无序列表使用星号、加号或是减号作为列表标记：

+ red
* green
- blue

> 有序列表则使用数字接着一个英文句点：

1. bird
1. mchale
1. parish

    两个列表之间不能相邻,否则会解释为嵌套的列表

> 列表项目可包含多个段落，不过每个段落**必须**缩进4个空格或1个制表符
> 如果要在列表项目内放进引用，那 > 就需要缩进
> 如果要放代码区块的话，该区块就需要缩进两次，也就是 8 个空格或是 2 个制表符
> 换句话说，也就是在行首出现数字-句点-空白，要避免这样的状况，你可以在句点前面加上反斜杠

###代码区块
> 和程序相关的写作或是标签语言原始码通常会有已经排版好的代码区块，通常这些区块我们并不希望它以一般段落文件的方式去排版，而是照原来的样子显示，Markdown 会用 &lt;pre&gt; 和 &lt;code&gt; 标签来把代码区块包起来。

要在 Markdown 中建立代码区块很简单，只要简单地**缩进 4 个空格或是 1 个制表符**就可以
> 在代码区块里面， & 、 < 和 > 会自动转成 HTML 实体，这样的方式让你非常容易使用 Markdown 插入范例用的 HTML 原始码，只需要复制贴上，再加上缩进就可以了，剩下的 Markdown 都会帮你处理

###分割线
> 你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西

> 你也可以在星号或是减号中间插入空格

---

##区段元素

###链接
* 行内式
    1. 绝对路径:This is [an example](http://example.com/ "Title") inline link.
    1. 相对路径:See my [About](/about/) page for details.
* 参考式
    1. This is [an example][id] reference-style link.
        * [id]: http://example.com/  "Optional Title Here"
        * [id]: <http://example.com/> "Optional Title Here"
        * [foo]: http://example.com/  'Optional Title Here'
        * [foo]: http://example.com/  (Optional Title Here)
        * [id]: http://example.com/longish/path/to/resource/here
    "Optional Title Here"

链接内容定义的形式为:

+ 方括号（前面可以选择性地加上至多三个空格来缩进），里面输入链接文字
+ 接着一个冒号
+ 接着一个以上的空格或制表符
+ 接着链接的网址
+ 选择性地接着 title 内容，可以用单引号、双引号或是括弧包着

> 这里链接辨别标签可以有字母、数字、空白和标点符号，但不区分大小写

这里还有**隐式链接标记**功能，省略指定连接标记，则链接标记会视为等同于链接文字。
要用链式标记，只要在链接文字后面加上一个空的方括号，比如：[Google][]
[Google]:http://google.com/

`[Google]:http://google.com/`

###强调
* **两个星号**  <strong></strong>
* __两个下划线__  <strong></strong>
* *一个星号*  <em></em>
* _一个下划线_  <em></em>
* 如何要在文字前后直接插入普通的星号或底线，可以使用反斜线\* 和\_

###代码
> 如果要标记一小段行内代码，你可以用反引号把它包起来（`）

比如:Use the `printf()` function.

> 如果要在代码区段内插入反引号，可以用多个反引号开启关闭

``There is a literal backtick (`) here.``
> 代码区段的起始和结束端都可以放入一个空白，起始端后面一个，结束端前面一个，这样你就可以在区段的一开始就插入反引号

A backtick-delimited string in a code span: `` `foo` ``

> 在代码区段内，& 和方括号都会被自动地转成 HTML 实体，这使得插入 HTML 原始码变得很容易

###图片
* 行内式
    1. 一个惊叹号
    1. 借着一个方括号，里面放上图片的替代文字
    1. 借着一个普通括号，里面放上图片网址，最后还可以用引号包住加上选择性的'title'文字
    比如:`![Alt text](/path/to/img.jpg "Optional title")`
![Alt text](/path/to/img.jpg "Optional title")

* 参考式
    形式类如:`![Alt text][id]`
    `[id]:url/to/image "Optional title attribute"`
    ![Alt text](/path/to/img.jpg "Optional title") )  [id]:url/to/image "Optional title attribute"

##其它

###自动链接
> Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来， Markdown 就会自动把它转成链接

例如:

1. <http://example.com/>会转换为`<a href="http://example.com/">http://example.com/</a>`
1. <address@example.com>会转换为`<a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;">&#x61;&#x64;&#x64;&#x72;&#x65;&#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111;&#109;</a>`即`<a href="mailto:address@example.com">address@example.com</a>`

###反斜杠
+ \\
+ \`
+ \*
+ \_
+ \{ \}
+ \[ \]
+ \( \)
+ \#
+ \+
+ \-
+ \.
+ \!

