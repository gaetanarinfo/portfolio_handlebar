function DeleteMembre(id, lastname, firstname) {
    $.get("http://localhost:3000/admin/delete_membre/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + lastname + ' ' + firstname);

        $('#remove').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_membre/' + id;
        })
    });
}

function DeleteArticle(id, title) {
    $.get("http://localhost:3000/admin/delete_membre/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_article/' + id;
        })
    });
}

function DeleteProjet(id, title) {
    $.get("http://localhost:3000/admin/delete_projet/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_projet/' + id;
        })
    });
}

function DeleteYoutube(id, title) {
    $.get("http://localhost:3000/admin/delete_youtube/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_youtube/' + id;
        })
    });
}

function DeleteGalerie(id, title) {
    $.get("http://localhost:3000/admin/delete_galerie/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + title);

        $('#remove').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_galerie/' + id;
        })
    });
}

function DeleteComment(id, author) {
    $.get("http://localhost:3000/admin/delete_comment/" + id, function() {
        $('#ModalLabelDelete').html('Suppression du commentaire de ' + author);

        $('#remove').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_comment/' + id;
        })
    });
}