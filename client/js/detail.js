// var id = 1;
var id = new URLSearchParams(location.search).get('id');


function showComment() {
    // var params = {
    //     pagenum: 1,
    //     pagesize: 3
    // }
    // $.ajax({
    //     type: "get",
    //     url: "http://127.0.0.1:8888/api/articles",
    //     data: params,
    //     success: function (res) {
    //         console.log(res.data);
    //     }
    // });

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8888/api/articles/" + id + "/comments",
        success: function (res) {
            console.log(res);

            if (res.status == 0) {
                var str = '<h4><i class="sprites"></i>评论区</h4>';
                $.each(res.data, function (index, item) {
                    // console.log(item.uname);
                    str += `
                        <div class="kr_comment_card">
                            <div class="img-wrap">
                                <img src="./uploads/avatar_3.jpg" alt="">
                            </div>
                            <div class="info">
                                <p>${item.uname} · <span>2020-08-16</span></p>
                                <p>${item.content}</p>
                            </div>
                            <a href="javascript:;" class="like">${item.count}</a>
                        </div>`;
                })
                $('#comment').html(str);
            }
        }
    });

};
showComment();

$('#upload').submit(function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type: "post",
        url: "http://127.0.0.1:8888/api/articles/" + id + "/comments",
        data: data,

        success: function (res) {
            if (res.status == 0) {
                $('#upload')[0].reset();
                showComment();
            }
        }
    });
});