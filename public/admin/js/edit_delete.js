// Section Admin ---! Seulement !---
// Function qui permet en autre de récupérer les datas pour len envoyer dans un modal spécifique
function DeleteMembre(id, lastname, firstname) {
    $.get("/admin/delete_membre/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + lastname + ' ' + firstname);

        $('#remove').click(function() {
            location.href = '/admin/confirm_delete_membre/' + id;
        })
    });
}

// Function qui permet en autre de récupérer les datas pour len envoyer dans un modal spécifique
function DeleteArticle(id, title) {
    $.get("/admin/delete_membre/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = '/admin/confirm_delete_article/' + id;
        })
    });
}

// Function qui permet en autre de récupérer les datas pour len envoyer dans un modal spécifique
function DeleteProjet(id, title) {
    $.get("/admin/delete_projet/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = '/admin/confirm_delete_projet/' + id;
        })
    });
}

// Function qui permet en autre de récupérer les datas pour len envoyer dans un modal spécifique
function DeleteYoutube(id, title) {
    $.get("/admin/delete_youtube/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = '/admin/confirm_delete_youtube/' + id;
        })
    });
}

// Function qui permet en autre de récupérer les datas pour len envoyer dans un modal spécifique
function DeleteGalerie(id, title) {
    $.get("/admin/delete_galerie/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = '/admin/confirm_delete_galerie/' + id;
        })
    });
}

// Function qui permet en autre de récupérer les datas pour len envoyer dans un modal spécifique
function DeleteComment(id, author) {
    $.get("/admin/delete_comment/" + id, function() {
        $('#ModalLabelDelete').html('Suppression du commentaire de ' + author);

        $('#remove').click(function() {
            location.href = '/admin/confirm_delete_comment/' + id;
        })
    });
}