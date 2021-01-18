// JQuery 封装的函数 $(document).ready(function(){})
$(function () {
    layui.use('carousel', function () {
        // 轮播模块
        let carousel = layui.carousel;
        $.get('http://localhost:8888/api/swipers', function (res) {
            if (res.status == 0 && res.message == "查询轮播图成功") {
                $.each(res.data, function (index, item) {
                    $('ul[carousel-item]').append(`
                    <li class="img-effect">
                        <a href="javascript:;">
                        <img src="${'http://localhost:8888/uploads/' + item.swiperimg}" alt="">
                        </a>
                    </li>`);
                });
                // 轮播交互 必须要写在ajax请求体里面
                carousel.render({
                    elem: '#kr_carousel',
                    width: 720,
                    height: 300,
                    interval: 3000
                });
            }
        });

        // 友情链接模块
        $.ajax({
            url: 'http://localhost:8888/api/links',
            success: function (res) {
                if (res.status == 0 && res.message == "查询友情链接成功") {
                    // console.log(res.data);
                    res.data.forEach(function (item) {
                        let dd = $(`
                <dd>
                    <a href="${item.linkurl}">
                    <img src="${'http://localhost:8888/uploads/' + item.linkicon}" alt="">
                    </a>
                </dd>`);
                        $('dl.kr_collaborator').append(dd);
                    });
                }
            }
        });
    });
});

