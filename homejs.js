function getData(success, fail) {
    // start ajax call
    $.ajax({
        // use apistill.json in URL to look through and develop site without random errors
        url: 'https://test.dubosewebgroup.com/test/1',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: success,
        error: fail,
    });

}

function displayError(error) {
    // handle errors and display error css
    $(".error").css("display", "block");
    $("body").css("overflow-y", "hidden");
    if (typeof error !== 'undefined') {
        console.log(error);
    }
}

function renderPage(data, elementToRender) {
    // gets data from handledata switches and appends data to the variable html
    // then appends it into the body of the html page

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
            displayError('Undefined Type called "' + elementToRender + '" while rendering HTML Elements');
            break;

    }
    // append this to the body
    $("body").append(html);
    // logging to console to make sure values are correct.
    console.log(html);

}


function renderHero(data) {
    // this handles interpolation with the html to add to the HTML variable that is appeneded to the body tag.
    // language=HTML
    return `\n <div id="hero">\n\n        <div id="companyLogo">\n            <img src="${data.logo}">\n        </div>\n        <nav id="companyLinks">\n            <ul>\n${data.nav.map(nav => `<li><a href="${nav.url}">${nav.content}</a></li>`).join("\n")}\n            </ul>\n        </nav>\n    <div id="companySlogan">\n        <h1>${data.headline}</h1>\n        <h3>${data.subHeadLine}</h3>\n        <button>Let's Get Started <span>>></span></button>\n    </div>\n`;
}

function renderStats(data) {
    // this handles interpolation with the html to add to the HTML variable that is appeneded to the body tag.
    // language=HTML
    return `\n<section id="stats">\n    <div class="statsItem">\n        <img src="${data.img}" class="imgfiller">\n    </div>\n    <div class="statsItem" style="flex-grow:1;"><h1>${data.content}</h1></div>\n</section>\n`;
}

function renderContentBlock(data) {
    // this handles interpolation with the html to add to the HTML variable that is appeneded to the body tag.
    // language=HTML
    return `\n<section id="contentBlock" style="background-color:${data.backgroundColor}">\n    <div>\n        <h1>${data.headline}</h1>\n        <p>${data.content}</p>\n    </div>\n</section>\n`;
}

function renderCards(data) {
    // this handles interpolation with the html to add to the HTML variable that is appeneded to the body tag.
    // language=HTML
    return `\n<section id="cards">\n${data.items[0].map(items => `\n    <div class="cardsItem">\n        <ul><li><div class="cardImageContainer"><img src="${items.img}"></div>\n            <div class="cardsContainer">\n                <h4>${items.headline}</h4>\n                <p>${items.content}</p>\n    </div>\n    <button class="buttonPosition">Read<span> >></span></button>\n</div></li></ul>`).join("\n")}\n</section>\n`;
}

function renderInfo(data) {
    // this handles interpolation with the html to add to the HTML variable that is appeneded to the body tag.
    // language=HTML
    return `\n<footer id="info" style="background-color:${data.backgroundColor};">\n    <span>${data.content}</span>\n</footer>\n\n`;
}


function handleSuccess(data) {

    // create empty arrays to receive data
    let orderedString = [];
    let typeHero = [];
    let typeStats = [];
    let typeContentBlock = [];
    let typeCards = [];
    let typeInfo = [];
    if (typeof data !== "undefined" &&
        typeof data['sections'] !== "undefined") {
        //make sure data isn't empty
        let sections = data['sections'];
        //assign data to sections for easier reading
        for (let i = 0; i < sections.length; i++) {
            orderedString.push(sections[i].type);
            //looping through sections and pushing each value to orderedString to use for order and selection
        }

        for (let i = 0; i < orderedString.length; ++i) {
            // this going to loop through the orderedString to get each object
            switch (orderedString[i]) {
                // each case is looking to see if it's matching and
                // depending on the match pushing the data associated with it to its obj
                // to be used in interpolation
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
                default:
                    // catch undefined types if the api updates
                    displayError('Undefined Type called "' + orderedString[i] + '" while generating objects.');
                    break;
            }

        }

    }

}

// handle errors and start on success
getData(handleSuccess, function (error) {
    displayError(error);


});

// TODO
// list order as string let order = [0,2,1,3,4] then cycle through to generate page.
// function to write to the document taking a list string of types to order the out function
// get json
// convert each to it's own object
// be able to sort through output by name
// interpret the order we want them to come through
// spit out html by order on successful api call


