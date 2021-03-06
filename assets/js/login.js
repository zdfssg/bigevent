$(function () {
    $('#link-reg').click(function () {
        $('#reg').show().siblings('#login').hide();
    })
    $('#link-login').click(function () {
        $('#login').show().siblings('#reg').hide();
    })

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()自定义校验规则
    // 自定义密码校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            var pwd = $('#reg [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });

    // 监听注册表单提交事件
    $('#reg').submit(function (e) {
        e.preventDefault();
        // $.ajax({
        //     url: '/api/reguser',
        //     method: 'post',
        //     data: {
        //         username: $('#reg [name=username]').val(),
        //         password: $('#reg [name=password]').val(),
        //     },
        //     success: function (res) {
        //         if (res.status !== 0) return layer.msg(res.message);
        //         layer.msg('注册成功', {
        //             icon: 1,
        //             time: 1000,
        //         }, function () {
        //             $('#link-login').click();
        //         })
        //     }
        var username = $('#reg [name=username]').val();
        var password = $('#reg [name=password]').val()
        axios.post('/api/reguser', $(this).serialize())
            .then(function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功', {
                    icon: 1,
                    time: 1000,
                }, function () {
                    $('#link-login').click();
                })
            })
    })
    // 监听登录表单提交事件
    $('#login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            // data: {
            //     username: $('#login [name=username]').val(),
            //     password: $('#login [name=password]').val(),
            // },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                localStorage.setItem('token', res.token)
                layer.msg('登录成功', {
                    icon: 1,
                    time: 1000,
                }, function () {
                    location.href = '/index.html'
                })
            }
        })
    })

})