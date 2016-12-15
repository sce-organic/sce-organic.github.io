function $(id){
	return document.getElementById(id);	
}

function getCookie(name){
	var start = document.cookie.indexOf(name + "=");
	var len = start + name.length + 1;
	if((!start) && (name != document.cookie.substring(0,name.length))){
		return null;	
	}
	if(start == -1)return null;
	var end = document.cookie.indexOf(';',len);
	if(end == -1)end = document.cookie.length;
	return unescape(document.cookie.substring(len,end));
}

function setCookie(name,value){
	var today = new Date();
	var expires = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 30);
	document.cookie = name + "=" + escape(value) 
					+";expires=" + expires.toGMTString()
					+";path=/";
}



function next(elem){
	do{	
		elem = elem.nextSibling;		
	}while(elem && elem.nodeType != 1);
	return elem;
}


function jmolScript(script){
	document.jmol.script(script);
}

function jmolResize(width,height){
	document.jmol.width=width;
	document.jmol.height=height;
}
function normalSize(){
	var stage = $("stage");	
	document.jmol.width = 400;
	document.jmol.height = 300;
	jmol.style.position = "static";
	jmol.style.left = "0px";
}

function isIE6(){
	return !-[1,]&&!window.XMLHttpRequest;
}

function fullSize(){
	var stage = $("stage");
	if(isIE6()){
		alert("该功能需要安装更高版本的浏览器！");		
	}else{
	document.jmol.width = 800;
	document.jmol.height = 600;
	jmol.style.position = "relative";
	jmol.style.left = "-268px";
	}
}


function toggle(self){	
	self.$status = !self.$status;
	with(self.style){
		if(self.$status){
			width = "800px";
			position = "relative";
			left = "-318px";
		}else{
			width = "400px";
			position = "static";
			left = "0px";
		}
	}
}


function init(){
	// check the jre 
	function readme(){
		$("readme").style.display = "";	
	}
	try{
		if(!document.jmol.isActive()){		
			readme();
		}
	}catch(e){
		readme();
	}
	//----------------------------------------
			
	// initializing the color of control button
	var bgcolor = getCookie("bgcolor");
	if(bgcolor){
		jmolScript("color background " + bgcolor);	
	}
	var list = $("bgControl").getElementsByTagName("span");
	for(var i = 0; i < list.length; i++){
		var btn = list[i];
		btn.style.backgroundColor = btn.className;
		btn.onclick = function(){
			var script = "color background " + this.className;
			jmolScript(script);
			setCookie("bgcolor",this.className);
		}
	}
	//-------------------------------------------

	
	// initializing the submenu behavier
	try{
		var subtitleIndex = getCookie("subtitle");	
		var list = $("submenu").getElementsByTagName("span");
		for(var i = 0; i < list.length; i++){
			var subtitle = list[i];
			var nextElem = next(subtitle);
			if(subtitleIndex && subtitleIndex == i){
				nextElem.style.display = "";
				subtitle.style.backgroundImage="url(images/minus.gif)";
			}else{
				nextElem.style.display = "none";
			}
			if(subtitle.className == "subtitle"){
				subtitle.onclick = (function(index){
					return function(){						
						var nextElem = next(this);					
						subtitle.$open = !subtitle.$open;					
						if(subtitle.$open){
							setCookie("subtitle",index);					
							nextElem.style.display = "";
							this.style.backgroundImage="url(images/minus.gif)";
						}else{
							nextElem.style.display = "none";
							this.style.backgroundImage="url(images/plus.gif)";
						}
					}								
				})(i);
			}
		}
	}catch(e){}
}
