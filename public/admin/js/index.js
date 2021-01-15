// Condition du masquage du menu admin
if (sessionStorage.getItem('menu_admin') == 'true') {
    $('#menu').css('display', 'none')
    $('.mask-menu2').css('display', 'block')
    $('.mask-menu').css('display', 'none')
} else {
    $('#menu').css('display', 'block')
    $('.mask-menu').css('display', 'block')
    $('.mask-menu2').css('display', 'none')
}

$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

// Bouton du masquage du menu admin
$('#btn_menu').click(function() {
    $('#menu').hide(500)
    $('.mask-menu2').css('display', 'block')
    $('.mask-menu').css('display', 'none')
    sessionStorage.setItem('menu_admin', true)
    return false
})

// Bouton du démasquage du menu admin
$('#btn_menu2').click(function() {
    $('#menu').show(500)
    $('.mask-menu').css('display', 'block')
    $('.mask-menu2').css('display', 'none')
    sessionStorage.setItem('menu_admin', false)
    return false
})

// Upload image
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

// Upload avatar
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

// Upload image projets
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

// Permet de marquer les sections  -->
if (document.location.href == 'http://localhost:3000/admin') {
    $('#membres').css('display', '');
} else if (document.location.href == 'http://localhost:3000/admin/articles' || document.location.href == 'http://localhost:3000/admin/articles/' + document.location.search) {
    $('#blog').css('display', '');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', 'none');
} else if (document.location.href == 'http://localhost:3000/admin/galeries' || document.location.href == 'http://localhost:3000/admin/galeries/' + document.location.search) {
    $('#blog').css('display', 'none');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', '');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', 'none');
} else if (document.location.href == 'http://localhost:3000/admin/youtubes' || document.location.href == 'http://localhost:3000/admin/youtubes/' + document.location.search) {
    $('#blog').css('display', 'none');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', '');
    $('#projet').css('display', 'none');
} else if (document.location.href == 'http://localhost:3000/admin/projets' || document.location.href == 'http://localhost:3000/admin/projets/' + document.location.search) {
    $('#blog').css('display', 'none');
    $('#membres').css('display', 'none');
    $('#galerie').css('display', 'none');
    $('#youtube').css('display', 'none');
    $('#projet').css('display', '');
}