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

        $('#remove_user').click(function() {
            location.href = 'http://localhost:3000/admin/confirm_delete_membre/' + id;
        })
    });
}