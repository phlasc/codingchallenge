function getData(cbSuccess,cbFail){
    $.ajax({
        url: 'apistill.json',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: cbSuccess,
        error: cbFail,
    });

}

function renderPage(hero,sections){
    let html = '';
    if (typeof hero !== "undefined"){
        html += renderHero(hero);
    }
    sections.forEach(function(s){
        //html += renderSection(s);
    });
    console.log(html);
}

function renderHero(data){
    return `
 <div id="hero">
    <div id="topBar">
        <div id="companyLogo">
            <img src="${data.logo}">
        </div>
        <nav id="companyLinks">
            <ul>
${data.nav.map(nav => `<li><a href="${nav.url}">${nav.content}</a></li>`).join("\n")}
            </ul>
        </nav>
    </div>
    <div id="companySlogan">
        <h1>${data.headline}</h1>
        <h3>${data.subHeadLine}</h3>
        <button>Let's Get Started >></button>
    </div>

</div>
`;
}



function handleSuccess(data){
    let reorderedSections = [];
    let heroSection;
    if (typeof data !== "undefined" &&
        typeof data['sections'] !== "undefined"){
        // splice out hero
        let sections = data['sections'];
        heroSection = sections.find(function( s ) {
            return s.type === 'hero';
        });
        sections = sections.filter(function(s){ return s.type !== "hero";});
        reorderedSections = sections;
        console.log("my data");
        console.log(reorderedSections);

    }
    renderPage(heroSection,reorderedSections);
}
getData(handleSuccess,function(error){
    console.error(error);
    $(".error").css("display", "block");
    $("body").css("overflow-y", "hidden");

});









// list order as string let order = [0,2,1,3,4] then cycle through to generate page.

//function to write to the document taking a list string of types to order the out function
// get json
// convert each to it's own object
// be able to sort through output by name
//interpret the order we want them to come through
//spit out html by order on successful api call$(document).ready(function () {
//
//     $.ajax({
//         url: 'apistill.json',
//         dataType: 'json',
//         type: 'get',
//         cache: false,
//         success: function (data) {
//             for (let i = 0; i < data.length; ++i) {
//                 $('#cand').append('<div class="name">data[i].name</div>');
//             }
//         }
//     });
// });