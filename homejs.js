function getData(cbSuccess, cbFail) {
    $.ajax({
        url: 'https://test.dubosewebgroup.com/test/1',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: cbSuccess,
        error: cbFail,
    });

}

function renderPage(data, elementToRender) {
    let html = '';
    switch (elementToRender) {
        case 'hero':
            if (typeof data !== "undefined") {
                html += renderHero(data);
            }
            break;
        case 'stats':
            if (typeof data !== "undefined") {
                html += renderStats(data);
            }
            break;
        case 'contentBlock':
            if (typeof data !== "undefined") {
                html += renderContentBlock(data);
            }
            break;

        case 'cards':
            if (typeof data !== "undefined") {
                html += renderCards(data);
            }
            break;


        case 'info':
            if (typeof data !== "undefined") {
                html += renderInfo(data);
            }
            break;
        default:
            return undefined;
    }
    $( "body" ).append(html);
    console.log(html);
}

function renderHero(data) {
    return `
 
 <div id="hero">

        <div id="companyLogo">
            <img src="${data.logo}">
        </div>
        <nav id="companyLinks">
            <ul>
${data.nav.map(nav => `<li><a href="${nav.url}">${nav.content}</a></li>`).join("\n")}
            </ul>
        </nav>
    <div id="companySlogan">
        <h1>${data.headline}</h1>
        <h3>${data.subHeadLine}</h3>
        <button>Let's Get Started >></button>
    </div>
`;
}
function renderStats(data) {
    return `
<section id="stats">
    <div class="statsItem">
        <img src="${data.img}" width="250px" height="250px"
             style="flex-grow:2;" class="imgfiller">
    </div>
    <div class="statsItem" style="flex-grow:1;"><h1>${data.content}</h1></div>
</section>
`;
}
function renderContentBlock(data) {
    return `
<section id="contentBlock" style="background-color:${data.backgroundColor}">
    <div>
        <h1>${data.headline}</h1>
        <p>${data.content}</p>
    </div>
</section>
`;
}
function renderCards(data) {
    return `
<section id="cards">
${data.items[0].map(items => `<div class="cardsItem"><img src="${items.img}"><div class="cardsContainer"><h4>${items.headline}</h4><p>${items.content}</p></div><button>Read>></button></div>`).join("\n")}
</section>
`;
}





function renderInfo(data) {
    return `
<footer id="info" style="background-color:${data.backgroundColor};">
    <span>${data.content}</span>
</footer>

`;
}


function handleSuccess(data) {
    let reorderedSections = [];
    let orderedString = [];
    let typeHero = [];
    let typeStats = [];
    let typeContentBlock = [];
    let typeCards = [];
    let typeInfo = [];
    if (typeof data !== "undefined" &&
        typeof data['sections'] !== "undefined") {
        // splice out hero
        let sections = data['sections'];
        for (let i = 0; i < sections.length; i++) {
            orderedString.push(sections[i].type);
            console.log(i);

        }


        for (let i = 0; i < orderedString.length; ++i) {
            console.log(orderedString[i] + ' helloweorldsklfj');

            switch (orderedString[i]) {
                case 'hero':
                    typeHero = sections.find(function (s) {
                        return s.type === 'hero';
                    });
                    console.log(typeHero);
                    renderPage(typeHero, 'hero');
                    break;
                case 'stats':
                    typeStats = sections.find(function (s) {
                        return s.type === 'stats';
                    });
                    console.log(typeStats);
                    renderPage(typeStats, 'stats');
                    break;
                case 'contentBlock':
                    typeContentBlock = sections.find(function (s) {
                        return s.type === 'contentBlock';
                    });
                    console.log(typeContentBlock);
                    renderPage(typeContentBlock, 'contentBlock');
                    break;
                case 'cards':
                    typeCards = sections.find(function (s) {
                        return s.type === 'cards';
                    });
                    console.log(typeCards);
                    renderPage(typeCards, 'cards');
                    break;
                case 'info':
                    typeInfo = sections.find(function (s) {
                        return s.type === 'info';
                    });
                    console.log(typeInfo);
                    renderPage(typeInfo, 'info');
                    break;
            }

        }


        console.log(orderedString);
        // heroSection = sections.find(function( s ) {
        //
        //
        //            if(s.type === 'hero'){
        //                return s.type ==='hero';
        //            }
        //
        //
        //     });


        // heroSection = sections.find(function( s ) {
        //
        //     switch (s.type) {
        //         case s.type === 'hero':
        //             return s.type === 'hero';
        //         case s.type === 'stats':
        //             return s.type === 'stats';
        //
        //         default:
        //             return null;
        //     }
        // });
        sections = sections.filter(function (s) {
            return s.type !== "hero";
        });
        reorderedSections = sections;
        console.log("my cut data");
        console.log(reorderedSections);

    }

}


getData(handleSuccess, function (error) {
    console.error(error);
    $(".error").css("display", "block");
    $("body").css("overflow-y", "hidden");

});


// list order as string let order = [0,2,1,3,4] then cycle through to generate page.

// function to write to the document taking a list string of types to order the out function
// get json
// convert each to it's own object
// be able to sort through output by name
// interpret the order we want them to come through
// spit out html by order on successful api call$(document).ready(function () {
//


// switch(heroSection) {
//     case s.type === 'hero':
//         return s.type === 'hero';
//     case s.type === 'stats':
//         return s.type === 'stats';
//
//     default:
//         return null;
// }

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