$('#isPrivate').click(function() {

    if ($('#isPrivate').val() == '0') {

        $('#isPrivate').attr('value', '1')
        $('#lab_priv').html('En ligne')

    } else if ($('#isPrivate').val() == '1') {

        $('#isPrivate').attr('value', '0')
        $('#lab_priv').html('Privé')

    }

})

$('#isPrivate3').click(function() {

    if ($('#isPrivate3').val() == '0') {

        $('#isPrivate3').attr('value', '1')
        $('#lab_proj').html('Privé')

    } else if ($('#isPrivate3').val() == '1') {

        $('#isPrivate3').attr('value', '0')
        $('#lab_proj').html('En ligne')

    }

})

$('#isPrivate5').click(function() {

    if ($('#isPrivate5').val() == '0') {

        $('#isPrivate5').attr('value', '1')
        $('#lab_vid').html('Privé')

    } else if ($('#isPrivate5').val() == '1') {

        $('#isPrivate5').attr('value', '0')
        $('#lab_vid').html('En ligne')

    }

})

$('#isPrivate7').click(function() {

    if ($('#isPrivate7').val() == '0') {

        $('#isPrivate7').attr('value', '1')
        $('#lab_img').html('Privé')

    } else if ($('#isPrivate7').val() == '1') {

        $('#isPrivate7').attr('value', '0')
        $('#lab_img').html('En ligne')

    }

})