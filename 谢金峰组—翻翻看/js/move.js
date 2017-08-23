/*
 * 功能：缓冲运动函数以及背景渐变
 * @ele 标签的对象
 * @json CSS属性与CSS属性的要设置的目标值
 * @step 步数
 * @fn 回调函数
 * 函数调用实例
 *  var box = document.getElementById("box");
    var box2 = document.getElementById("box2");
    var speed = 0;
    var timer = null;

    box.onclick = function() {
        sport(box, {"width": 600, "height": 500, "opacity": 40}, 30, function() {
            sport(box, {"width": 200, "height": 200, "opacity": 90}, 30);
        });
    }
    box2.onclick = function() {
        sport(box2, {"width": 200, "height": 200}, 40);
    }
 */
// 运动的核心功能函数
function sport(ele, json, step, fn) {
    // 清除计时器，防止重复点击
    clearInterval(ele.timer);
    ele.timer = setInterval(function() {
        // true代表所有属性都达到终点
        var timerJudge = true;
        // 进行遍历设置的CSS属性和属性值
        for(var prop in json) {
            // 透明度动画识别和处理
            if(prop == "opacity") {
                var startVal = parseInt(getStyle(ele, prop) * 100);
            } else {
                var startVal = parseInt(getStyle(ele, prop));
            }
            //初始值和最终值的差值
            var distance = Math.abs(json[prop] - startVal);
            speed = Math.ceil(distance / step);
            // 双方向运动判断
            if(startVal < json[prop]) {
                startVal += speed;
            } else {
                startVal -= speed;
            }
            // 自动贴合功能
            if(distance < 10) {
                startVal = json[prop];
            }
            // 判断所有设置的CSS属性是否全部达到目标值
            if(startVal != json[prop]) {
                timerJudge = false;
            }
            // 属性类型判断
            if(prop == "opacity") {
                ele.style["filter"] = "alpha(opacity=" + startVal + ")";
                ele.style[prop] = startVal / 100;
            } else {
                ele.style[prop] = startVal + "px";
            }
        }
        if(timerJudge) {
            // 如果CSS属性全部到达，则清除计时器
            clearInterval(ele.timer);
            // 如果有回调函数才执行
            if(fn) {
                fn();
            }
        }
    }, 30)
}
/*
 * 功能：获取渲染后标签的样式
 * @ele是标签的对象
 * @prop是标签的样式属性
 */
function getStyle(ele, prop) {
    var proValue = null;
    if (document.defaultView) {
        // 兼容谷歌、火狐等
        proValue = document.defaultView.getComputedStyle(ele)[prop];
    } else{
        // 兼容IE
        proValue = ele.currentStyle[prop];
    };
    return proValue;
}
/*
 * [differentRandom 生成不重复的随机数]
 * @param  {[字符串]} len [要产生的随机数个数]
 * @param  {[字符串]} x，y  [控制范围 y ~ x+y-1]
 * @demo var arr =  differentRandom(5, 20, 5);
 */
function differentRandom(len, x, y) {
    var arr = [];
    var num;
    for (var i = 0; i < len; i++) {
        num = Math.floor(Math.random() * x + y);
        for (var j = 0; j < arr.length; j++) {
            if (num == arr[j]) {
                num = Math.floor(Math.random() * x + y);
                j = -1;
            }
        }
        arr.push(num);
    }
    return arr;
}
    