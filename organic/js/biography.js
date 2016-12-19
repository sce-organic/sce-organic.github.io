window.onload =function (){	
	var submenu = document.getElementById("submenu")
	var content = document.getElementById("content");
	var actors = content.getElementsByTagName("div");
	var list = submenu.getElementsByTagName("li");	
	for(var i = 0; i < list.length; i++){
		list[i].onclick  = function(){
			var id = this.firstChild.href;
			id = id.substring(id.indexOf("#") + 1,id.length);
			for(var i = 0; i < actors.length; i++){
				actors[i].style.display = "none";
			}
			var actor = document.getElementById(id)
			actor.style.display = "block";
			return false;
		}
	}
	
};