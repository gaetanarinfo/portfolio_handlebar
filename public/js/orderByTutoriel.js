// Function jquery qui permet le trie de tutoriel
// en cliquant dans la liste déroulante
// et affiche les résultats dans une autres div

$('#phpCat').click(function() {
    $.get("/tutorielCat/PHP", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
    });

    return false;
});

$('#htmlCat').click(function() {
    $.get("/tutorielCat/HTML", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
        console.log(data)
    });

    return false;
});

$('#cssCat').click(function() {
    $.get("/tutorielCat/CSS", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
    });

    return false;
});

$('#sassCat').click(function() {
    $.get("/tutorielCat/SASS", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
    });

    return false;
});

$('#nodejsCat').click(function() {
    $.get("/tutorielCat/NODEJS", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
    });

    return false;
});

$('#jsCat').click(function() {
    $.get("/tutorielCat/JS", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
    });

    return false;
});

$('#mongodbCat').click(function() {
    $.get("/tutorielCat/MONGODB", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
    });

    return false;
});

$('#mysqlCat').click(function() {
    $.get("/tutorielCat/MONGODB", function(data) {
        $("#allCat").css('display', 'none');
        $("#resuCat").css('display', '');
        $("#resuCat").html(data);
    });

    return false;
});