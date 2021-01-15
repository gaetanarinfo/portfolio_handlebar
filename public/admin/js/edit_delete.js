function ViewMembre(id, lastname, firstname, email, isBanned, isAdmin) {
    $.get("http://localhost:3000/admin/view_membre/" + id, function() {
        $('#lastname').attr('value', lastname);
        $('#firstname').attr('value', firstname);
        $('#email').attr('value', email);
        $('#editUserForm').attr('action', '/admin/editUser/' + id)

        if (isBanned == 'non') {
            $('#isBanned').attr('value', 'non')
            $('#lab_ban').html('Actif')
            $('#isBanned').attr('checked', 'checked')
        } else {
            $('#isBanned').attr('value', 'oui')
            $('#lab_ban').html('Bannis')
        }

        if (isAdmin == 'oui') {
            $('#isAdmin').css('display', 'none')
        } else {
            $('#isAdmin').css('display', 'block')
        }

        $('#isBanned').click(function() {

            if ($('#isBanned').val() == 'non') {

                $('#isBanned').attr('value', 'oui')
                $('#lab_ban').html('Bannis')

            } else if ($('#isBanned').val() == 'oui') {

                $('#isBanned').attr('value', 'non')
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

        if (isPrivate == 'non') {
            $('#isPrivate2').attr('value', 'non')
            $('#lab_priv2').html('En ligne')
            $('#isPrivate2').attr('checked', 'checked')
        } else {
            $('#isPrivate2').attr('value', 'oui')
            $('#lab_priv2').html('Privé')
        }

        $('#isPrivate2').click(function() {

            if ($('#isPrivate2').val() == 'non') {

                $('#isPrivate2').attr('value', 'oui')
                $('#lab_priv2').html('Privé')

            } else if ($('#isPrivate2').val() == 'oui') {

                $('#isPrivate2').attr('value', 'non')
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

        if (isPrivate == 'non') {
            $('#isPrivate4').attr('value', 'non')
            $('#lab_proj2').html('En ligne')
            $('#isPrivate4').attr('checked', 'checked')
        } else {
            $('#isPrivate4').attr('value', 'oui')
            $('#lab_proj2').html('Privé')
        }

        $('#isPrivate4').click(function() {

            if ($('#isPrivate4').val() == 'non') {

                $('#isPrivate4').attr('value', 'oui')
                $('#lab_proj2').html('Privé')

            } else if ($('#isPrivate4').val() == 'oui') {

                $('#isPrivate4').attr('value', 'non')
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

function ViewYoutube(id, title, content, api, date, links, isPrivate) {
    $.get("http://localhost:3000/admin/view_tuto/" + id, function() {
        $('#ModalLabelEditVideo').html("Modifier la vidéo " + title)
        $('#titreVideo').attr('value', title);
        $('#dateVideo').attr('value', date);
        $('#apiVideo').attr('value', api);
        $('#linksVideo').attr('value', links);
        $('#contentVideo').html(content);
        $('#isPrivate6').attr('value', isPrivate);
        $('#editTutoForm').attr('action', '/admin/editTuto/' + id)

        if (isPrivate == 'non') {
            $('#isPrivate6').attr('value', 'non')
            $('#lab_vid2').html('En ligne')
            $('#isPrivate6').attr('checked', 'checked')
        } else {
            $('#isPrivate6').attr('value', 'oui')
            $('#lab_vid2').html('Privé')
        }

        $('#isPrivate6').click(function() {

            if ($('#isPrivate6').val() == 'non') {

                $('#isPrivate6').attr('value', 'oui')
                $('#lab_vid2').html('Privé')

            } else if ($('#isPrivate6').val() == 'oui') {

                $('#isPrivate6').attr('value', 'non')
                $('#lab_vid2').html('En ligne')

            }

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

function ViewGalerie(id, title, image, isPrivate) {
    $.get("http://localhost:3000/admin/view_tuto/" + id, function() {
        $('#ModalLabelEditGalerie').html("Modifier l'image " + title)
        $('#titreGalerie').attr('value', title);
        $('#imageGalerie').attr('value', image);
        $('#isPrivate8').attr('value', isPrivate);
        $('#editGalerieForm').attr('action', '/admin/editGalerie/' + id)

        if (isPrivate == 'non') {
            $('#isPrivate8').attr('value', 'non')
            $('#lab_img2').html('En ligne')
            $('#isPrivate8').attr('checked', 'checked')
        } else {
            $('#isPrivate8').attr('value', 'oui')
            $('#lab_img2').html('Privé')
        }

        $('#isPrivate8').click(function() {

            if ($('#isPrivate8').val() == 'non') {

                $('#isPrivate8').attr('value', 'oui')
                $('#lab_img2').html('Privé')

            } else if ($('#isPrivate8').val() == 'oui') {

                $('#isPrivate8').attr('value', 'non')
                $('#lab_img2').html('En ligne')

            }

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