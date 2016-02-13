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


function initMap() {
  var home = {lat: 43.480120, lng: -80.530229};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat:43.498758, lng:-80.540792}
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Jing</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Address</b>: 49 Columbia Street West, Waterloo</p>' +
      '<p><b>Phone</b>: 226-978-0612</p>'+
      '<p><b>Email</b>: genetao06@hotmail.com</p>'+
      '<p><b>Wechat</b>: jingtao1994</p>'+
      '<p><b><a href="https://ca.linkedin.com/in/jingtao06" target="_blank">LinkedIn</a></b>'+
      '<b>, <a href="https://github.com/jingt06" target="_blank">GitHub</a></b>'+
      '<b>, <a href="https://www.facebook.com/jing.tao.756" target="_blank">Facebook</a></b></p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: home,
    map: map,
    title: 'Home'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
    infowindow.open(map, marker);
}