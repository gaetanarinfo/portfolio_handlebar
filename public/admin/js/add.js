// Section Admin ---! Seulement !---
// Multi Function pour les modal admin
// Celà permet de mettre un article en privé ou en public par exemple
// Sans celà le checkbox ne changera pas d'état

$(document).ready(function() {
    $('input[name="isPrivate"]').click(function() {
        if ($(this).is(":checked")) {
            $('#lab_priv').html('Privé')
            $('#isPrivate').attr('checked', true);
        } else if ($(this).is(":not(:checked)")) {
            $('#lab_priv').html('En ligne')
            $('#isPrivate').attr('checked', false);
        }
    });
});


$(document).ready(function() {
    $('input[id="isPrivate3"]').click(function() {
        if ($(this).is(":checked")) {
            $('#lab_proj').html('Privé')
            $('#isPrivate3').attr('checked', true);
        } else if ($(this).is(":not(:checked)")) {
            $('#lab_proj').html('En ligne')
            $('#isPrivate3').attr('checked', false);
        }
    });
});

$(document).ready(function() {
    $('input[id="isPrivate5"]').click(function() {
        if ($(this).is(":checked")) {
            $('#lab_vid').html('Privé')
            $('#isPrivate5').attr('checked', true);
        } else if ($(this).is(":not(:checked)")) {
            $('#lab_vid').html('En ligne')
            $('#isPrivate5').attr('checked', false);
        }
    });
});

$(document).ready(function() {
    $('input[id="isPrivate7"]').click(function() {
        if ($(this).is(":checked")) {
            $('#lab_img').html('Privé')
            $('#isPrivate7').attr('checked', true);
        } else if ($(this).is(":not(:checked)")) {
            $('#lab_img').html('En ligne')
            $('#isPrivate7').attr('checked', false);
        }
    });
});