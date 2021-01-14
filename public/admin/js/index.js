$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

$('#btn_menu').click(function() {
    $('#menu').hide(500)
    $('.mask-menu2').css('display', 'block')
    $('.mask-menu').css('display', 'none')
    return false
})

$('#btn_menu2').click(function() {
    $('#menu').show(500)
    $('.mask-menu').css('display', 'block')
    $('.mask-menu2').css('display', 'none')
    return false
})