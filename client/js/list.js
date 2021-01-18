$(function () {
    let params = {
        pagenum: 1,
        pagesize: 6,
    }
    let total;

    function loadarticlelist() {
        $.ajax({
            url: 'http://localhost:8888/api/articles',
            data: params,
            success: function (res) {
                if (res.status == 0 && res.message == "获取文章列表成功！") {
                    total = res.total;
                    $.each(res.data, function (index, item) {
                        let div = $(`
                        <div class="item">
                        <h4>
                          <a href="${'./detail.html?' + item.id}">${item.title}</a>
                        </h4>
                        <p class="meta">
                          <span>15分钟前 分享至</span>
                          <a href="javascript:;" class="wechat"></a>
                          <a href="javascript:;" class="weibo"></a>
                        </p>
                        <p class="brief">${item.content}</p>
                      </div>`);
                        $('.kr_news_list').append(div);
                    });
                }
            }
        });
    }
    loadarticlelist();
    $('.kr_more').on('click', function () {
        let article_num = $('.kr_news_list .item').length;
        if (article_num >= total) {
            return layer.msg('没有更多数据了');
        } else {
            params.pagenum += 1;
            loadarticlelist();
        }

    });
});