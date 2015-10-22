# pin
通过bootstrap上面分享的一个jquery.pin插件获得灵感。模仿jquery.pin自己制作了一个小插件。
解决了jquery.pin中，当窗口resize的时候，出现的问题。

本插件只是用来学习使用，肯定会有很多问题

用法：

$(DOM).pin()
<br><br>
$(DOM).pin({<br>
&nbsp;&nbsp;top: 10 // fixed的时候，距离顶部的距离<br>
&nbsp;container: "selector", // 其父级中的一个，DOM元素只会在这个container中活动<br>
&nbsp;bottom: 20 // 距离底部的距离，小于这个距离就会停止,<br>
&nbsp;minWidth: 200 // 最小使用pin的宽度<br>
});
