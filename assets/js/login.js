$(function () {
    $('#link-reg').click(function () {
        $('#reg').show().siblings('#login').hide();
    })
    $('#link-login').click(function () {
        $('#login').show().siblings('#reg').hide();
    })
})