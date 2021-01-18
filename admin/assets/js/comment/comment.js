// 请求数据列表
function loadList() {
    $.ajax({
        type: 'get',
        url: 'admin/comments',
        success: function (res) {
            if (res.status == 0) {
                var str = '';
                for (var i = 0; i < res.data.length; i++) {
                    var a_day = res.data[i].cdate.indexOf('T')
                    a_day = res.data[i].cdate.substring(0, a_day);
                    str += `<tr>
                    <td>${res.data[i].id}</td>
                    <td>${res.data[i].uname}</td>
                    <td>${res.data[i].content}</td>
                    <td>${a_day}</td>
                    <td>
                      <button data-id="${res.data[i].id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">
                        删除
                      </button>
                    </td>
                  </tr>`;
                }
                $('tbody').html(str)
            } else {
                layer.msg(res.message)
            }
        }

    })
}
loadList();

// 删除
$('tbody').on('click', '.delete', function (e) {
    var id = $(e.target).attr('data-id');
    layer.confirm('确定删除吗？', function (index) {
        $.ajax({
            type: 'DELETE',
            url: `admin/comments/${id}`,
            success: function (res) {
                if (res.status == 0) {
                    layer.close(index)
                    loadList();
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })

})