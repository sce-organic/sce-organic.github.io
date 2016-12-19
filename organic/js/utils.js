function $(selector, context) {
    var elems = [];
    if (selector.nodeType) {
        elems = [selector]
    } else if (typeof selector == "object" && selector.length) {
        elems = selector;
    } else {
        context = context || [document];
        for (var i = 0; i < context.length; i++) {
            if (selector.indexOf(".") == 0) {
                var cls = selector.substr(1);
                if (document.getElementsByClassName) {
                    elems = context[i].getElementsByClassName(cls);
                } else {
                    var tags = context[i].getElementsByTagName("*");
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].className == cls) {
                            elems.push(tags[i]);
                        }
                    }
                }
            } else if (selector.indexOf("#") == 0) {
                var id = selector.substr(1)
                var elem = document.getElementById(id);
                if (elem != null) {
                    elems.push(elem);
                }
            } else {
                elems = context[i].getElementsByTagName(selector);
            }
        }
    }

    function each(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            callback.call(arr[i], i);
        }
    }
    return {
        length: elems.length,
        eq: function(index) {
            return $(elems[index]);
        },
        each: function(callback) {
            each(elems, callback);
        },
        filter: function(callback) {
            var result = [];
            each(elems, function() {
                if (callback.call(this)) {
                    result.push(this);
                }
            });
            return $(result);
        },
        down: function(selector) {
            return $(selector, elems);
        },
        css: function(config) {
            each(elems, function() {
                for (var p in config) {
                    this.style[p] = config[p];
                }
            })
        },
        attr: function(key, value) {
            if (value) {
                each(elems, function() {
                    this.setAttribute(key, value);
                })
            } else {
                var values = "";
                each(elems, function() {
                    values += this.getAttribute(key);
                })
                return values;
            }
        },
        html: function(html) {
            if (html) {
                each(elems, function() {
                    this.innerHTML = html;
                })
            } else {
                html = "";
                each(elems, function() {
                    html += this.innerHTML;
                })
                return html;
            }
        },
        remove: function() {
            each(elems, function() {
                var parent = this.parentNode;
                parent.removeChild(this);
            })
        }
    };
}

function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value) {
    var today = new Date();
    var expires = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30);
    document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString() + ";path=/";
}


function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
}


function jmolScript(script) {
    try {
        document.jmol.script(script);
    } catch (e) {}
}

function jmolResize(width, height) {
    try {
        document.jmol.width = width;
        document.jmol.height = height;
    } catch (e) {}
}

function normalSize() {

}

function isIE6() {
    return !-[1, ] && !window.XMLHttpRequest;
}

function fullSize() {
    // var stage = $("stage");
    // if(isIE6()){
    //  alert("该功能需要安装更高版本的浏览器！");      
    // }else{
    // document.jmol.width = 800;
    // document.jmol.height = 600;
    // jmol.style.position = "relative";
    // jmol.style.left = "-268px";
    // }
    var element = document.getElementById("stage");
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
    }

}


function toggle(self) {
    self.$status = !self.$status;
    with(self.style) {
        if (self.$status) {
            width = "100%";
            position = "absolute";
            left = "0";
        } else {
            width = "400px";
            position = "static";
            left = "0px";
        }
    }
}


function init() {
    // check the jre 

    function readme() {
        $("#readme").css({ display: "" });
    }
    try {
        if (!document.jmol.isActive()) {
            readme();
        }
    } catch (e) {
        readme();
    }
    //----------------------------------------

    // initializing the color of control button
    var bgcolor = getCookie("bgcolor");
    if (bgcolor) {
        jmolScript("color background " + bgcolor);
    }
    $("#bgControl").down("span").each(function() {
        $(this).css({ backgroundColor: this.className });
        this.onclick = function() {
            var script = "color background " + this.className;
            jmolScript(script);
            setCookie("bgcolor", this.className);
        }
    });

    //-------------------------------------------
    //sweet hack to set meta viewport for desktop sites squeezing down to mobile that are big and have a fixed width 
    //first see if they have window.screen.width avail
    (function() {
        if (window.screen.width) {
            var setViewport = {
                    //smaller devices
                    phone: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no',
                    //bigger ones, be sure to set width to the needed and likely hardcoded width of your site at large breakpoints  
                    other: 'width=1045,user-scalable=yes',
                    //current browser width
                    widthDevice: window.screen.width,
                    //your css breakpoint for mobile, etc. non-mobile first
                    widthMin: 560,
                    //add the tag based on above vars and environment 
                    setMeta: function() {
                        var params = (this.widthDevice <= this.widthMin) ? this.phone : this.other;
                        var head = document.getElementsByTagName("head")[0];
                        var viewport = document.createElement('meta');
                        viewport.setAttribute('name', 'viewport');
                        viewport.setAttribute('content', params);
                        head.appendChild(viewport);
                    }
                }
                //call it 
            setViewport.setMeta();

            //reset the width of container
            var w = window.screen.width;
            if (w <= setViewport.widthMin) {
                $("body").css({ background: "none" });
                $("#top").css({ display: "none" });
                $("#menu").css({ display: "none" });
                $("#bgControl").css({ display: "none" });
                $(".sidebar").css({ display: "none" });
                $(".content").css({ width: "100%" });
                $("#container").css({ width: w + "px" });
                $("#discription").css({ width: w + "px" });
                $("#banner").css({ width: w + "px" });
                $("#main").css({ width: w + "px" });
                $("#footer").css({ width: w + "px" });
            }

        }
    }).call(this);

    //delete some tool from toolbar

    $("#toolbar").down("span").filter(function() {
        return $(this).attr("onclick") == "normalSize()"
    }).remove();

    //upgrade to jsmol
    //test you are using ie11 or other moden browser
    
    // if ((!!window.VBArray && ('-ms-scroll-limit' in document.documentElement.style)) || !window.VBArray ) {
        var stage = $("#stage");
        var html = stage.html();
        stage.html("");
        var jsmol = document.createElement("script");
        jsmol.src = "JSmol.min.js";
        document.getElementsByTagName('head')[0].appendChild(jsmol);
        //when the jsmol component is loaded,$()function is replaced to jQuery
        jsmol.onload = jsmol.onreadystatechange = function() {
            if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {

                if (stage.length > 0) {
                    stage = $("#stage")
                    var loadRegex = new RegExp('<param name=\"load\" value=\"(.*)?\">', "g");
                    var path = loadRegex.exec(html);
                    var scriptRegex = new RegExp('<param name=\"script\" value=\"(.*)?\">', 'g');
                    var script = scriptRegex.exec(html);

                    html = Jmol.getAppletHtml("applet0", { width: "100%", height: "100%", script: (path === null ? "" : "load " + path[1] + ";") + (script === null ? "" : script[1]) });
                    stage.html(html);
                    //override this function
                    jmolScript = function(script) {
                        Jmol.script(applet0, script);
                    }
                }
            }
        }
    // }
    
    //-------------------------------------------------

    // initializing the submenu behavier

    var subtitleIndex = getCookie("subtitle");
    $("#submenu").down("span").each(function(i) {
        var subtitle = this;
        var nextElem = next(subtitle);
        if (subtitleIndex && subtitleIndex == i) {
            nextElem.style.display = "";
        } else {
            nextElem.style.display = "none";
        }
        if (subtitle.className == "subtitle") {
            subtitle.onclick = (function(index) {
                return function() {
                    var nextElem = next(this);
                    subtitle.$open = !subtitle.$open;
                    if (subtitle.$open) {
                        setCookie("subtitle", index);
                        nextElem.style.display = "";
                    } else {
                        nextElem.style.display = "none";
                    }
                }
            })(i);
        }
    });


}
