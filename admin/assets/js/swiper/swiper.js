$(function () {
    // 轮播图
    var form = layui.form

    // 获取轮播图列表数据
    function loadSwiperList() {
        $.ajax({
            type: 'get',
            url: 'admin/swipers',
            success: function (res) {
                var value = res.data
                var tags = '';
                for (var i = 0; i < value.length; i++) {
                    if (value[i].swiperstatus == 1) {
                        tags +=
                            `<tr>
                            <td>${value[i].id}</td>
                            <td>
                                <img src='http://localhost:8888/uploads/${value[i].swiperimg}'">
                            </td>
                            <td>${value[i].swiperimg}</td>
                            <td>
                                <span data-id='${value[i].id}' data-status='2' class="layui-badge layui-bg-green">√</span>
                            </td>
                            <td>
                                <button data-id="${value[i].id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                                    删除
                                </button>
                            </td>
                        </tr>`
                    } else {
                        tags +=
                            `<tr>
                            <td>${value[i].id}</td>
                            <td>
                                <img src='http://localhost:8888/uploads/${value[i].swiperimg}'">
                            </td>
                            <td>${value[i].swiperimg}</td>
                            <td>
                                <span data-id='${value[i].id}' data-status='1' class="layui-badge layui-bg-cyan">×</span>
                            </td>
                            <td>
                                <button data-id="${value[i].id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                                    删除
                                </button>
                            </td>
                        </tr>`
                    }
                };
                $('.layui-table tbody').html(tags)
            }
        })
    }

    loadSwiperList();
    // 切换状态
    $('tbody').on('click', '.layui-badge', function (e) {
        var id = $(e.target).data('id');
        var status = $(e.target).data('status');
        $.ajax({
            type: 'put',
            url: 'admin/swipers/' + id,
            data: {
                status: status
            },
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    loadSwiperList()
                }
            }
        })
    })


    //批量上传
    $('body').on('click', '#uploadSwiper', function () {
        $('#myfile').click()
    })
    $('body').on('change', '#myfile', function (e) {
        var files = e.target.files;
        var fd = new FormData();
        $.each(files, function (index, item) {
            fd.append('swipers', item);
        });
        $.ajax({
            type: 'post',
            url: 'admin/swipers',
            data: fd,
            //用formdata需要改变默认
            processData: false,
            contentType: false,
            success: function (res) {
                layer.msg(res.message);
                loadSwiperList();
            }
        });
    })

    // 删除
    $('tbody').on('click', '.delete', function (e) {
        var id = $(e.target).data('id');
        layer.confirm('确定要删除吗？', function (i) {
            $.ajax({
                type: 'delete',
                url: 'admin/swipers/' + id,
                success: function (res) {
                    if (res.status == 0) {
                        layer.close(i);
                        loadSwiperList();
                    }
                }
            })
        })
    })

})