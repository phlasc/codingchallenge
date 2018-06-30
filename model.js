

$.ajax({
    url: 'https://test.dubosewebgroup.com/test/1',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function (data) {
        $(data.sections).each(function(index, value) {
            console.log(value.type + ' ' + index);
            if (value.type === 'hero'){
                this.heroType = value.type;
                let heroLogo = value.logo;
                let heroHeadline = value.headline;
                let heroSubHeadline = value.subHeadLine;
                console.log(this.heroType, heroLogo, heroHeadline, heroSubHeadline);
                $(value.nav).each(function(index, value){
                    let heroNavConent = value.content;
                    let heroNavUrl = value.url;
                    console.log(heroNavConent,heroNavUrl);
                });


            }

        });
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        $(".error").css("display", "block");
    }
});





