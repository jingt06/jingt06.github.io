//$(".nav").hide()
//$("#access_nav").click(function(){
//	$(".nav").show(100);
//})
var menu = document.getElementById('menu');
var nav = document.getElementById('nav');
var nav_rest = document.getElementById('nav_rest');
var nav_ul = document.getElementById('nav_ul');

menu.addEventListener('click', function(e) {
    nav.style.visibility = "visible";
    nav_rest.style.display = "block";
    nav_ul.style.width = "30%";
});

nav_rest.addEventListener('click', function(e){
    nav_ul.style.width = "0%";
    setTimeout(function(){ 
		nav.style.visibility = "hidden";
 		nav_rest.style.display = "none";
    }, 500);  
    
});