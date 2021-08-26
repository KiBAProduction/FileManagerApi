var container = $('#js-dot-bg'),
windowX = $(window).width(),
windowY = $(window).height(),
minnbDot = $(window).width() * $(window).height() / 30000,
nbDot = Math.random(1)*20 + minnbDot;

console.log(nbDot);

function dotBgGetRandomStyle() {
    var randWidth = Math.round(Math.random(1)*30+10),  
    randZ = Math.round(Math.random(1)*200);
    randLeft = Math.round(Math.random(1)*100),
    randTop = Math.round(Math.random(1)*100),
    randOpacity = Math.ceil((Math.random(1)/1.5 + 0.25)*100);
    console.log(randOpacity);
    return("font-size: " + randWidth + "px; opacity: 0." + randOpacity + "; left: " + randLeft + "%; top: " + randTop + "%' x='" + randLeft + "' y='" + randTop + "' z='" + randZ);
}

function createDotBg() {
    container.html('');
    for (let index = 0; index < nbDot; index++) {
        addNewDot();
    }
    dotBgStartDynamicMove();
}

function addNewDotes() {
    for (let index = 0; index < 3; index++) {
        addNewDot();
    }
    dotBgStartDynamicMove();
}

function addNewDot() {
    container.append("<p class='dot-dot' style='" + dotBgGetRandomStyle() + "'>.</p>");
}

function dotBgAddRestartBtn() {
    $('body').append("<div id='dot-btns'><button class='dot-btn' onclick='createDotBg()'>Reload</button><button class='dot-btn' id='dot-color' onclick='colorizeDotBg()'>Colorize !</button></div>");
}

function dotBgStartDynamicMove() {
    var timer = 0;
    $('.dot-dot').each(function(){
        var target = $(this);
        setTimeout(function(){
            target.fadeIn();
        }, timer);
        timer = timer + 10;
    });
}

function dotBgStartEventListeners() {
    container.mousedown(function(){
        addNewDotes();
    });
    
    $(document).mousemove(function(event) {
        X = (event.pageX - windowX / 2) * 100 / windowX;
        Y = (event.pageY - windowY / 2) * 100 / windowY;
        $('.dot-dot').each(function(){
            var newLeft = parseInt($(this).attr('x')) + (parseInt($(this).attr('z'))/4000 * X);
            var newTop = parseInt($(this).attr('y')) + (parseInt($(this).attr('z'))/4000 * Y);
            $(this).css('left', newLeft + "%");
            $(this).css('top', newTop + "%");
        });
    });
}

function colorizeDotBg() {
    $('.dot-dot').each(function(){
        $(this).css('color', getRandomColor());
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

createDotBg();
dotBgAddRestartBtn();
dotBgStartEventListeners();