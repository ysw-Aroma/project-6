$(function () {
    var layPage = layui.laypage;
    // 当前页码数--------------------------------
    var pagenum = 1;
    // 每页显示多少数据 ------------------------------------
    var pagesize = 3;
    // 用户列表------------------------------
    function user(params) {
        console.log(params);
        $.ajax({
            type: 'get',
            url: "admin/users",
            data: params,
            success: function (res) {
                console.log(res);
                var table = template('table-tpl', res);
                $('.body-table tbody').html(table);
                layPage.render({
                    elem: 'articlePage',
                    curr: pagenum,
                    count: res.total,
                    limit: pagesize,
                    limits: [3, 5, 10, 30, 70],
                    layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
                    jump: function (obj, first) {
                        pagenum = obj.curr;
                        pagesize = obj.limit;
                        if (!first) {
                            user({
                                pagenum: pagenum,
                                pagesize: pagesize
                            })
                        }
                    }
                });
            }
        })
    }
    user({
        pagenum: pagenum,
        pagesize: pagesize
    })
    // 删除-----------------------------
    $('.body-table tbody').on('click', '.layui-btn-danger', function (e) {
        var id = $(e.target).data('id');
        layer.confirm("确定要删除此用户吗？？？", function (ind) {
            $.ajax({
                type: "delete",
                url: "admin/users/" + id,
                success: function (res) {
                    layer.msg(res.message);
                    user({
                        pagenum: pagenum,
                        pagesize: pagesize
                    })
                }
            })
        })
    })


    // 重置密码弹出层
    $('.body-table tbody').on('click', '.layui-btn-normal', function (e) {
        var id = $(e.target).data('id')
        var index = layer.open({
            type: 1,
            title: '重置密码',
            content: $('#repwd-form-tpl').html(),
            area: ['500px', '250px']
        })
        // 重置密码
        $('#repwd-form').submit(function (e) {
            e.preventDefault()
            $.ajax({
                type: 'put',
                url: 'admin/users/' + id,
                data: {
                    password: $('#repwd-form input[name=password]').val()
                },
                success: function (res) {
                    layer.msg(res.message)
                    layer.close(index)
                }
            })
        })
    })

})