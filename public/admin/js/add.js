$('#isPrivate').click(function() {

    if ($('#isPrivate').val() == 'false') {

        $('#isPrivate').attr('value', 'true')
        $('#lab_priv').html('En ligne')

    } else if ($('#isPrivate').val() == 'true') {

        $('#isPrivate').attr('value', 'false')
        $('#lab_priv').html('Privé')

    }

})

$('#isPrivate3').click(function() {

    if ($('#isPrivate3').val() == 'false') {

        $('#isPrivate3').attr('value', 'true')
        $('#lab_proj').html('Privé')

    } else if ($('#isPrivate3').val() == 'true') {

        $('#isPrivate3').attr('value', 'false')
        $('#lab_proj').html('En ligne')

    }

})