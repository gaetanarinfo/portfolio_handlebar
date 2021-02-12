// Section Admin ---! Seulement !---
// Condition qui permet de masquer le bouton selon le choix de l'utilisateur
if (sessionStorage.getItem('menu_admin') == 'true') {
    $('#menu').css('display', 'none')
    $('.mask-menu2').css('display', 'block')
    $('.mask-menu').css('display', 'none')
} else {
    $('#menu').css('display', 'block')
    $('.mask-menu').css('display', 'block')
    $('.mask-menu2').css('display', 'none')
}

// Function qui permet d'afficher un tooltip au dessus du button : Modifier Supprimer Ajouter
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

// Condition qui permet de masquer le bouton selon le choix de l'utilisateur
$('#btn_menu').click(function() {
    $('#menu').hide(500)
    $('.mask-menu2').css('display', 'block')
    $('.mask-menu').css('display', 'none')
    sessionStorage.setItem('menu_admin', true)
    return false
})

// Condition qui permet de masquer le bouton selon le choix de l'utilisateur
$('#btn_menu2').click(function() {
    $('#menu').show(500)
    $('.mask-menu').css('display', 'block')
    $('.mask-menu2').css('display', 'none')
    sessionStorage.setItem('menu_admin', false)
    return false
})

// Function qui permet d'upload une image et de l'afficher dans une div !! Image !!
var input = document.querySelector('#image');
var preview = document.querySelector('.preview');

function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    var curFiles = input.files;
    if (curFiles.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'Aucun fichier actuellement sélectionné pour le téléchargement';
        preview.appendChild(para);
    } else {
        for (var i = 0; i < curFiles.length; i++) {
            var para = document.createElement('p');
            if (validFileType(curFiles[i])) {
                para.textContent = curFiles[i].name + ', taille du fichier ' + returnFileSize(curFiles[i].size) + '.';
                var image = document.createElement('img');
                image.setAttribute('style', 'width: 440px;')
                image.src = window.URL.createObjectURL(curFiles[i]);

                preview.appendChild(image);
                preview.appendChild(para);

            } else {
                para.textContent = 'Nom du fichier ' + curFiles[i].name + ": Ce n'est pas un type de fichier valide. Mettez à jour votre image.";
                preview.appendChild(para);
            }
        }
    }
}

var fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }

    return false;
}

function returnFileSize(number) {
    if (number < 1024) {
        return number + ' octets';
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + ' Ko';
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + ' Mo';
    }
}

// Function qui permet d'upload une image et de l'afficher dans une div !! Avatar !!
var input2 = document.querySelector('#avatar');
var preview2 = document.querySelector('.preview2');

function updateImageDisplay2() {
    while (preview2.firstChild) {
        preview2.removeChild(preview2.firstChild);
    }

    var curFiles2 = input2.files;
    if (curFiles2.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'Aucun fichier actuellement sélectionné pour le téléchargement';
        preview2.appendChild(para);
    } else {
        for (var i = 0; i < curFiles2.length; i++) {
            var para = document.createElement('p');
            if (validFileType(curFiles2[i])) {
                para.textContent = curFiles2[i].name + ', taille du fichier ' + returnFileSize(curFiles2[i].size) + '.';
                var image = document.createElement('img');
                image.setAttribute('style', 'width: 90px;')
                image.src = window.URL.createObjectURL(curFiles2[i]);

                preview2.appendChild(image);
                preview2.appendChild(para);

            } else {
                para.textContent = 'Nom du fichier ' + curFiles2[i].name + ": Ce n'est pas un type de fichier valide. Mettez à jour votre avatar.";
                preview2.appendChild(para);
            }
        }
    }
}

// Function qui permet d'upload une image et de l'afficher dans une div !! Projet !!
var input3 = document.querySelector('#imageProjets');
var preview3 = document.querySelector('.preview3');

function updateImageDisplay3() {
    while (preview3.firstChild) {
        preview3.removeChild(preview3.firstChild);
    }

    var curFiles3 = input3.files;
    if (curFiles3.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'Aucun fichier actuellement sélectionné pour le téléchargement';
        preview3.appendChild(para);
    } else {
        for (var i = 0; i < curFiles3.length; i++) {
            var para = document.createElement('p');
            if (validFileType(curFiles3[i])) {
                para.textContent = curFiles3[i].name + ', taille du fichier ' + returnFileSize(curFiles3[i].size) + '.';
                var image = document.createElement('img');
                image.setAttribute('style', 'width: 440px;')
                image.src = window.URL.createObjectURL(curFiles3[i]);

                preview3.appendChild(image);
                preview3.appendChild(para);

            } else {
                para.textContent = 'Nom du fichier ' + curFiles3[i].name + ": Ce n'est pas un type de fichier valide. Mettez à jour votre image.";
                preview3.appendChild(para);
            }
        }
    }
}

// Function qui permet d'upload une image et de l'afficher dans une div !! Galerie !!
var input4 = document.querySelector('#imageGaleries');
var preview4 = document.querySelector('.preview4');

function updateImageDisplay4() {
    while (preview4.firstChild) {
        preview4.removeChild(preview4.firstChild);
    }

    var curFiles4 = input4.files;
    if (curFiles4.length === 0) {
        var para = document.createElement('p');
        para.textContent = 'Aucun fichier actuellement sélectionné pour le téléchargement';
        preview4.appendChild(para);
    } else {
        for (var i = 0; i < curFiles4.length; i++) {
            var para = document.createElement('p');
            if (validFileType(curFiles4[i])) {
                para.textContent = curFiles4[i].name + ', taille du fichier ' + returnFileSize(curFiles4[i].size) + '.';
                var image = document.createElement('img');
                image.setAttribute('style', 'width: 440px;')
                image.src = window.URL.createObjectURL(curFiles4[i]);

                preview4.appendChild(image);
                preview4.appendChild(para);

            } else {
                para.textContent = 'Nom du fichier ' + curFiles4[i].name + ": Ce n'est pas un type de fichier valide. Mettez à jour votre image.";
                preview4.appendChild(para);
            }
        }
    }
}

// Permet de marquer les sections selon l'url désirer par l'utilisateur
if (document.location.href == 'https://gaetan-seigneur.website/admin/') {

    // Section display
    $('#membres').css('display', '');
    $('#blog').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', 'none');
    $('#comment').css('display', 'none');

    // Section mobile
    $('#blog_mobile').css('display', 'none');
    $('#membres_mobile').css('display', '');
    $('#youtube_mobile').css('display', 'none');
    $('#galerie_mobile').css('display', 'none');
    $('#projets_mobile').css('display', 'none');
    $('#comment_mobile').css('display', 'none');

} else if (document.location.href == 'https://gaetan-seigneur.website/admin/articles' || document.location.href == 'https://gaetan-seigneur.website/admin/articles/' + document.location.search) {

    // Section display
    $('#blog').css('display', '');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', 'none');
    $('#comment').css('display', 'none');

    // Section mobile
    $('#blog_mobile').css('display', '');
    $('#membres_mobile').css('display', 'none');
    $('#youtube_mobile').css('display', 'none');
    $('#galerie_mobile').css('display', 'none');
    $('#projets_mobile').css('display', 'none');
    $('#comment_mobile').css('display', 'none');

} else if (document.location.href == 'https://gaetan-seigneur.website/admin/galeries' || document.location.href == 'https://gaetan-seigneur.website/admin/galeries/' + document.location.search) {

    // Section display
    $('#blog').css('display', 'none');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', '');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', 'none');
    $('#comment').css('display', 'none');

    // Section mobile
    $('#blog_mobile').css('display', 'none');
    $('#membres_mobile').css('display', 'none');
    $('#youtube_mobile').css('display', 'none');
    $('#galerie_mobile').css('display', '');
    $('#projets_mobile').css('display', 'none');
    $('#comment_mobile').css('display', 'none');

} else if (document.location.href == 'https://gaetan-seigneur.website/admin/youtubes' || document.location.href == 'https://gaetan-seigneur.website/admin/youtubes/' + document.location.search) {

    // Section display
    $('#blog').css('display', 'none');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', '');
    $('#projet').css('display', 'none');
    $('#comment').css('display', 'none');

    // Section mobile
    $('#blog_mobile').css('display', 'none');
    $('#membres_mobile').css('display', 'none');
    $('#youtube_mobile').css('display', '');
    $('#galerie_mobile').css('display', 'none');
    $('#projets_mobile').css('display', 'none');
    $('#comment_mobile').css('display', 'none');

} else if (document.location.href == 'https://gaetan-seigneur.website/admin/projets' || document.location.href == 'https://gaetan-seigneur.website/admin/projets/' + document.location.search) {

    // Section display
    $('#blog').css('display', 'none');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', '');
    $('#comment').css('display', 'none');

    // Section mobile
    $('#blog_mobile').css('display', 'none');
    $('#membres_mobile').css('display', 'none');
    $('#youtube_mobile').css('display', 'none');
    $('#galerie_mobile').css('display', 'none');
    $('#projets_mobile').css('display', '');
    $('#comment_mobile').css('display', 'none');

} else if (document.location.href == 'https://gaetan-seigneur.website/admin/comments' || document.location.href == 'https://gaetan-seigneur.website/admin/comments/' + document.location.search) {

    // Section display
    $('#blog').css('display', 'none');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', 'none');
    $('#comment').css('display', '');

    // Section mobile
    $('#blog_mobile').css('display', 'none');
    $('#membres_mobile').css('display', 'none');
    $('#youtube_mobile').css('display', 'none');
    $('#galerie_mobile').css('display', 'none');
    $('#projets_mobile').css('display', 'none');
    $('#comment_mobile').css('display', '');
}

// Function qui permet d'afficher la scroll bar du menu admin quand il et trop grand !
(function($) {
    $(window).on("load", function() {
        $(".content").mCustomScrollbar({
            axis: "y" // horizontal scrollbar
        });
    });
})(jQuery);