function ViewMembre(id, lastname, firstname, email, isBanned, isAdmin) {
    $.get("http://localhost:3000/admin/view_membre/" + id, function() {
        $('#lastname').attr('value', lastname);
        $('#firstname').attr('value', firstname);
        $('#email').attr('value', email);
        $('#editUserForm').attr('action', '/admin/editUser/' + id)

        if (isAdmin == 'true') {
            $('#isAdmin').css('display', 'none')
        } else {
            $('#isAdmin').css('display', 'block')
        }

        $('#isBanned').click(function() {

            if ($('#isBanned').val() == 'false') {

                $('#isBanned').val('true')
                $('#lab_ban').html('Bannis')

            } else if ($('#isBanned').val() == 'true') {

                $('#isBanned').val('false')
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
        tinymce.init({
            selector: '#contentArticle',
            setup: function(editor) {
                editor.on('init', function(e) {
                    editor.getContent(content);
                });
            }
        });
        $('#editArticleForm').attr('action', '/admin/editArticle/' + id)

        if (isPrivate == 'false') {
            $(document).ready(function() {
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":checked")) {
                        $('#lab_priv2').html('Privé')
                        $('#isPrivate2').attr('checked', true);
                    } else if ($(this).is(":not(:checked)")) {
                        $('#lab_priv2').html('En ligne')
                        $('#isPrivate2').attr('checked', false);
                    }
                });
            });
        } else if (isPrivate == 'true') {
            $(document).ready(function() {
                $('#isPrivate2').attr('checked', true);
                $('#lab_priv2').html('Privé')
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":not(:checked)")) {
                        $('#lab_priv2').html('En ligne')
                        $('#isPrivate2').attr('checked', false);
                    } else if ($(this).is(":checked")) {

                        $('#lab_priv2').html('Privé')
                        $('#isPrivate2').attr('checked', true);
                    }
                });
            });
        }

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
        $('#editProjetForm').attr('action', '/admin/editProjet/' + id)

        if (isPrivate == 'false') {
            $(document).ready(function() {
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":checked")) {
                        $('#lab_proj2').html('Privé')
                        $('#isPrivate4').attr('checked', true);
                    } else if ($(this).is(":not(:checked)")) {
                        $('#lab_proj2').html('En ligne')
                        $('#isPrivate4').attr('checked', false);
                    }
                });
            });
        } else if (isPrivate == 'true') {
            $(document).ready(function() {
                $('#isPrivate4').attr('checked', true);
                $('#lab_proj2').html('Privé')
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":not(:checked)")) {
                        $('#lab_proj2').html('En ligne')
                        $('#isPrivate4').attr('checked', false);
                    } else if ($(this).is(":checked")) {

                        $('#lab_proj2').html('Privé')
                        $('#isPrivate4').attr('checked', true);
                    }
                });
            });
        }

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
        $('#editTutoForm').attr('action', '/admin/editTuto/' + id)

        if (isPrivate == 'false') {
            $(document).ready(function() {
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":checked")) {
                        $('#lab_vid2').html('Privé')
                        $('#isPrivate6').attr('checked', true);
                    } else if ($(this).is(":not(:checked)")) {
                        $('#lab_vid2').html('En ligne')
                        $('#isPrivate6').attr('checked', false);
                    }
                });
            });
        } else if (isPrivate == 'true') {
            $(document).ready(function() {
                $('#isPrivate6').attr('checked', true);
                $('#lab_vid2').html('Privé')
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":not(:checked)")) {
                        $('#lab_vid2').html('En ligne')
                        $('#isPrivate6').attr('checked', false);
                    } else if ($(this).is(":checked")) {

                        $('#lab_vid2').html('Privé')
                        $('#isPrivate6').attr('checked', true);
                    }
                });
            });
        }
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
        $('#editGalerieForm').attr('action', '/admin/editGalerie/' + id)

        if (isPrivate == 'false') {
            $(document).ready(function() {
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":checked")) {
                        $('#lab_img2').html('Privé')
                        $('#isPrivate8').attr('checked', true);
                    } else if ($(this).is(":not(:checked)")) {
                        $('#lab_img2').html('En ligne')
                        $('#isPrivate8').attr('checked', false);
                    }
                });
            });
        } else if (isPrivate == 'true') {
            $(document).ready(function() {
                $('#isPrivate8').attr('checked', true);
                $('#lab_img2').html('Privé')
                $('input[name="isPrivate"]').click(function() {
                    if ($(this).is(":not(:checked)")) {
                        $('#lab_img2').html('En ligne')
                        $('#isPrivate8').attr('checked', false);
                    } else if ($(this).is(":checked")) {

                        $('#lab_img2').html('Privé')
                        $('#isPrivate8').attr('checked', true);
                    }
                });
            });
        }
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

function ViewComment(id, author, avatar, dateCreate, content) {
    $.get("http://localhost:3000/admin/view_comment/" + id, function() {
        $('#ModalLabelModifComment').html("Modifier le commentaire de " + author)
        $('#authorComment').attr('value', author);
        $('#avatarComment').attr('value', avatar);
        $('#dateCreateComment').attr('value', dateCreate);
        $('#contentComment').html(content)
        $('#editCommentForm').attr('action', '/admin/editComment/' + id)

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