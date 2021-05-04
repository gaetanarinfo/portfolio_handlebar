// Les conditions d'écrans //

// Lancement de la function
window.onscroll = function() { scrollFunction() };

// Déclaration des constantes
var btn_top = document.querySelector(".btn_top"),
    nav_top_1 = document.getElementById("navbar_1"),
    nav_top_2 = document.getElementById("navbar_2")

// Function Scrollable
function scrollFunction() {
    if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        btn_top.style.display = "block";
    } else {
        btn_top.style.display = "none";
    }

    if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        nav_top_1.style.display = "none";
        nav_top_2.style.display = "block";
        nav_top_2.classList.add("fixed-top");
    } else {
        nav_top_1.style.display = "block";
        nav_top_2.style.display = "none";
        nav_top_2.classList.remove("fixed-top");
    }

}

// Button pour remonter en haut de la page
function topFunction() {
    document.body.scrollTop = 0; // Pour Safari
    document.documentElement.scrollTop = 0; // Pour Chrome, Firefox, IE and Opera
}

// Galerie ---> //
function switchStyle() {
    if ($('#styleSwitch ').checked) {
        $('#gallery ').classList.add("custom");
        $('#galerieModal ').classList.add("custom");
    } else {
        $('#gallery ').classList.remove("custom");
        $('#galerieModal ').classList.remove("custom");
    }
}

// Function pour les transitions et le zoom des images de la galerie
$(document).ready(function() {
    $(".zoom").hover(function() {
        $(this).addClass('transition ');
    }, function() {
        $(this).removeClass('transition ');
    });
});
// <--- Galerie //

// Modal Inscription Connexion Mot de passe perdu
$('#recover').click(function() {
    $('#ModalLabelLogin').text('Mot de passe oublier');
    $('#login-modal').addClass("fade");
    setTimeout(function() {
        $('#login-modal').hide(1000);
    }, 500);

    setTimeout(function() {
        $('#password-modal').addClass("fade show");
        $('#password-modal').show(1000);
        $('#password-modal').removeClass('d-none');
    }, 550);
});

$('#connexion').click(function() {

    $('#ModalLabelLogin').text('Connexion');
    setTimeout(function() {
        $('#password-modal').hide(1000);
    }, 500);

    setTimeout(function() {
        $('#login-modal').addClass("fade show");
        $('#login-modal').show(1000);
    }, 550);
});

$('#inscription').click(function() {

    $('#ModalLabelLogin').text('Inscription');
    setTimeout(function() {
        $('#login-modal').hide(1000);
        $('#password-modal').hide(1000);
    }, 500);

    setTimeout(function() {
        $('#inscription-modal').addClass("fade show");
        $('#inscription-modal').show(1000);
        $('#inscription-modal').css('display', 'block');
    }, 550);
});

$('#inscription2').click(function() {

    $('#ModalLabelLogin').text('Inscription');
    setTimeout(function() {
        $('#login-modal').hide(1000);
        $('#password-modal').hide(1000);
    }, 500);

    setTimeout(function() {
        $('#inscription-modal').addClass("fade show");
        $('#inscription-modal').show(1000);
        $('#inscription-modal').css('display', 'block');
    }, 550);
});

// function pour faire télécharger le CV au visiteur

const btn_cv = document.getElementById('dev-cv');

btn_cv.addEventListener('click', function(e) {

    e.preventDefault();

    const progress_bar = document.querySelector('.progress_bar');
    const done = document.querySelector('#done');
    const progressBar = document.querySelector('.progress-bar');

    progress_bar.style.display = 'block';
    progress_bar.style.margin = '0 auto -14px auto';
    done.style.margin = "0 auto 27px auto";
    btn_cv.style.display = 'none';

    let p = 0

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function progress() {

        await timeout(Math.floor(Math.random() * 200) + 200)

        p += Math.ceil(Math.random() * 7) + 5

        if (p < 100) {
            progressBar.value = p
            progress()
            done.innerHTML = `${p}%`
        } else {
            progressBar.value = 100
            done.innerHTML = 'Fichier télécharger 🎒 !'
            await timeout(100)
            progressBar.classList.remove('progress-bar')

            windowObjectReference = window.open(
                "http://gaetan.store/documents/Seigneur_Gaetan_CV.pdf",
                "CV",
                "resizable,scrollbars,status"
            );
        }

    }

    progress()
})

// Function pour la création de l'user qui permet de voir l'avatar avant de l'envoyer sur le serveur
var input = document.querySelector('#avatar');
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
                image.setAttribute('style', 'width: 90px;')
                image.src = window.URL.createObjectURL(curFiles[i]);

                preview.appendChild(image);
                preview.appendChild(para);

            } else {
                para.textContent = 'Nom du fichier ' + curFiles[i].name + ": Ce n'est pas un type de fichier valide. Mettez à jour votre avatar.";
                preview.appendChild(para);
            }
        }
    }
}

// Function pour la modification de l'user qui permet de voir l'avatar avant de l'envoyer sur le serveur
var input2 = document.querySelector('#avatarEdit');
var preview2 = document.querySelector('.previewEdit');

function updateAvatarEditDisplay() {
    while (preview2.firstChild) {
        preview2.removeChild(preview2.firstChild);
    }

    var curFiles2 = input2.files;
    if (curFiles2.length === 0) {
        var para2 = document.createElement('p');
        para2.textContent = 'Aucun fichier actuellement sélectionné pour le téléchargement';
        preview2.appendChild(para2);
    } else {
        for (var i = 0; i < curFiles2.length; i++) {
            var para2 = document.createElement('p');
            if (validFileType(curFiles2[i])) {
                para2.textContent = curFiles2[i].name + ', taille du fichier ' + returnFileSize(curFiles2[i].size) + '.';
                var image = document.createElement('img');
                image.setAttribute('style', 'width: 90px;')
                image.src = window.URL.createObjectURL(curFiles2[i]);

                preview2.appendChild(image);
                preview2.appendChild(para2);

            } else {
                para2.textContent = 'Nom du fichier ' + curFiles2[i].name + ": Ce n'est pas un type de fichier valide. Mettez à jour votre avatar.";
                preview2.appendChild(para2);
            }
        }
    }
}

var fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
]

// function qui permet de comparer le fichier pour lui dire si tu n'est pas une image tu renvoie une erreur
function validFileType(file) {
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }

    return false;
}

// Si le fichier dépasse une certaine largeur ou poid on renvoie un message d'érreur
function returnFileSize(number) {
    if (number < 1024) {
        return number + ' octets';
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + ' Ko';
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + ' Mo';
    }
}

// Modal connexion se souvenir de moi
var email = document.getElementById('email'),
    password = document.getElementById('password');

const checkBoxLogin = document.getElementById('checkBoxConfirmLogin');

checkBoxLogin.addEventListener('change', function() {

    sessionStorage.setItem('emailLogin', email.value);
    sessionStorage.setItem('passwordLogin', password.value);

});

if (sessionStorage.getItem('emailLogin') != undefined && sessionStorage.getItem('passwordLogin') != undefined) {
    checkBoxLogin.checked = true

    email.value = sessionStorage.getItem('emailLogin');
    password.value = sessionStorage.getItem('passwordLogin');

    checkBoxLogin.addEventListener('change', function() {

        email.value = '';
        password.value = '';

        sessionStorage.removeItem('emailLogin');
        sessionStorage.removeItem('passwordLogin');

    });

}
// Modal connexion se souvenir de moi //

// Function pour la recherche d'un article qui se trouve dans le header du portfolio
function searchFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('inputSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("searchKey");
    li = ul.getElementsByTagName('li');
    ul.style.display = 'block';

    // Boucle sur tous les éléments de la liste et masque ceux qui ne correspondent pas à la requête de recherche 
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function searchFunctionMobile() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('inputSearch2');
    filter = input.value.toUpperCase();
    ul = document.getElementById("searchKey2");
    li = ul.getElementsByTagName('li');
    ul.style.display = 'block';

    // Boucle sur tous les éléments de la liste et masque ceux qui ne correspondent pas à la requête de recherche 
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}