// Les conditions d'écrans


// Lancement de la function
window.onscroll = function() { scrollFunction() };

// Déclaration des constantes
var btn_top = document.querySelector(".btn_top");
var nav_top_1 = document.getElementById("navbar_1");
var nav_top_2 = document.getElementById("navbar_2");

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

function topFunction() {
    document.body.scrollTop = 0; // Pour Safari
    document.documentElement.scrollTop = 0; // Pour Chrome, Firefox, IE and Opera
}

// Galerie
function switchStyle() {
    if ($('#styleSwitch ').checked) {
        $('#gallery ').classList.add("custom");
        $('#galerieModal ').classList.add("custom");
    } else {
        $('#gallery ').classList.remove("custom");
        $('#galerieModal ').classList.remove("custom");
    }
}

$(document).ready(function() {
    $(".zoom").hover(function() {
        $(this).addClass('transition ');
    }, function() {
        $(this).removeClass('transition ');
    });
});
// Galerie

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
        $('#inscription-modal').removeClass('d-none');
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
        $('#inscription-modal').removeClass('d-none');
    }, 550);
});

// Modal Inscription Connexion Mot de passe perdu

// Toast Bootstrap
//setTimeout(function() {
//    console.log("open toast");
//    $('#message_valide').toast('show')
//}, 1500);

//setTimeout(function() {
//    console.log("open toast");
//    $('#message_erreur').toast('show')
//}, 3000);
// Toast Bootstrap

// Télécharger CV

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