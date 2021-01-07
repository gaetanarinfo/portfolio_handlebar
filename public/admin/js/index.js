$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

$("#Membres").click(function() {
    $('#membres').fadeIn(600);
    $('#blog').fadeOut(10);
    $('#youtube').fadeOut(10);
    $('#galerie').fadeOut(10);
    $('#projet').fadeOut(10);
});

$("#Blog").click(function() {
    $('#membres').fadeOut(10);
    $('#blog').fadeIn(600);
    $('#youtube').fadeOut(10);
    $('#galerie').fadeOut(10);
    $('#projet').fadeOut(10);
});

$("#Youtube").click(function() {
    $('#membres').fadeOut(10);
    $('#blog').fadeOut(10);
    $('#youtube').fadeIn(200);
    $('#galerie').fadeOut(10);
    $('#projet').fadeOut(10);

});

$("#Galerie").click(function() {
    $('#membres').fadeOut(10);
    $('#blog').fadeOut(10);
    $('#youtube').fadeOut(10);
    $('#galerie').fadeIn(200);
    $('#projet').fadeOut(10);
});

$("#Projet").click(function() {
    $('#membres').fadeOut(10);
    $('#blog').fadeOut(10);
    $('#youtube').fadeOut(10);
    $('#galerie').fadeOut(10);
    $('#projet').fadeIn(200);
});