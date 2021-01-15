function ViewMembre(id, lastname, firstname, email, isBanned, isAdmin) {
    $.get("http://localhost:3000/admin/view_membre/" + id, function() {
        $('#lastname').attr('value', lastname);
        $('#firstname').attr('value', firstname);
        $('#email').attr('value', email);
        $('#editUserForm').attr('action', '/admin/editUser/' + id)

        if (isBanned == 'false') {
            $('#isBanned').attr('value', 'false')
            $('#lab_ban').html('Actif')
            $('#isBanned').attr('checked', 'checked')
        } else {
            $('#isBanned').attr('value', 'true')
            $('#lab_ban').html('Bannis')
        }

        if (isAdmin == 'true') {
            $('#isAdmin').css('display', 'none')
        } else {
            $('#isAdmin').css('display', 'block')
        }

        $('#isBanned').click(function() {

            if ($('#isBanned').val() == 'false') {

                $('#isBanned').attr('value', 'true')
                $('#lab_ban').html('Bannis')

            } else if ($('#isBanned').val() == 'true') {

                $('#isBanned').attr('value', 'false')
                $('#lab_ban').html('Actif')

            }

        })

    });
}

function DeleteMembre(id, lastname, firstname) {
    $.get("http://localhost:3000/admin/delete_membre/" + id, function() {
        $('#ModalLabelDelete').html('Suppression de ' + lastname + ' ' + firstname);

        $('#remove').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_membre/' + id;
        })
    });
}

function ViewArticle(id, image, title, content, isPrivate) {
    $.get("http://localhost:3000/admin/view_article/" + id, function() {
        $('#ModalLabelModifArticle').html("Modifier l'article " + title)
        $('#imageArticle').attr('value', image);
        $('#titleArticle').attr('value', title);
        $('#contentArticle').html(content);
        $('#isPrivate2').attr('value', isPrivate);
        $('#editArticleForm').attr('action', '/admin/editArticle/' + id)

        if (isPrivate == 'false') {
            $('#isPrivate2').attr('value', 'false')
            $('#lab_priv2').html('En ligne')
            $('#isPrivate2').attr('checked', 'checked')
        } else {
            $('#isPrivate2').attr('value', 'true')
            $('#lab_priv2').html('Privé')
        }

        $('#isPrivate2').click(function() {

            if ($('#isPrivate2').val() == 'false') {

                $('#isPrivate2').attr('value', 'true')
                $('#lab_priv2').html('Privé')

            } else if ($('#isPrivate2').val() == 'true') {

                $('#isPrivate2').attr('value', 'false')
                $('#lab_priv2').html('En ligne')

            }

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

function ViewProjet(id, image, title, content, date, isPrivate) {
    $.get("http://localhost:3000/admin/view_projet/" + id, function() {
        $('#ModalLabelModifProjet').html("Modifier le projet " + title)
        $('#imageProjet').attr('value', image);
        $('#titreProjet').attr('value', title);
        $('#contentProjet').html(content);
        $('#dateProjet').attr('value', date);
        $('#isPrivate4').attr('value', isPrivate);
        $('#editProjetForm').attr('action', '/admin/editProjet/' + id)

        if (isPrivate == 'false') {
            $('#isPrivate4').attr('value', 'false')
            $('#lab_proj2').html('En ligne')
            $('#isPrivate4').attr('checked', 'checked')
        } else {
            $('#isPrivate4').attr('value', 'true')
            $('#lab_proj2').html('Privé')
        }

        $('#isPrivate4').click(function() {

            if ($('#isPrivate4').val() == 'false') {

                $('#isPrivate4').attr('value', 'true')
                $('#lab_proj2').html('Privé')

            } else if ($('#isPrivate4').val() == 'true') {

                $('#isPrivate4').attr('value', 'false')
                $('#lab_proj2').html('En ligne')

            }

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

function ViewYoutube(id, title, content, api, date) {
    $.get("http://localhost:3000/admin/view_tuto/" + id, function() {
        $('#ModalLabelEditVideo').html("Modifier la vidéo " + title)
        $('#titreVideo').attr('value', title);
        $('#dateVideo').attr('value', date);
        $('#apiVideo').attr('value', api);
        $('#contentVideo').html(content);
        $('#editTutoForm').attr('action', '/admin/editTuto/' + id)
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