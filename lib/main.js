function home_page() {
    document.getElementById("home").style.display = "block";
    document.getElementById("projects").style.display = "none";
    document.getElementById("life").style.display = "none";
    $('.brand-logo').sideNav('hide');
}

function projects_page(argument) {
    document.getElementById("projects").style.display = "block";
    document.getElementById("home").style.display = "none";
    document.getElementById("life").style.display = "none";
    $('.brand-logo').sideNav('hide');
}

function life_page(argument) {
    document.getElementById("life").style.display = "block";
    document.getElementById("projects").style.display = "none";
    document.getElementById("home").style.display = "none";
    $('.brand-logo').sideNav('hide');
}

$(document).ready(function(){
    $('ul.tabs').tabs();
    $('.collapsible').collapsible();
    $(".brand-logo").sideNav();
});
