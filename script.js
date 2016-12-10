
//CSS MODIFICATION CODE

var windowWidth = $(window).width();
console.log("Window:" + windowWidth);

var widthH1 = $(".top-sec h1").width();
console.log("H1:" + widthH1);

$(".top-sec-content").css({
  "width": widthH1
});

$("input[type=text]").css({
  "width": widthH1
});

var iFrameWidth = ((windowWidth - widthH1) - ((2 * windowWidth) / 100));
console.log("iFrame:" + iFrameWidth);

if (windowWidth > 720) {
  $(".wiki-list").css({
    "width": widthH1,
    "marginLeft": "-" + widthH1,
    "paddingLeft": "20px"
  });

  $(".i-frame").css({
    "width": iFrameWidth,
    "right": 0
  });

} else {
  $(".wiki-list").hide();
}

$(".wiki-list").hide();
$(".loading-spinner").hide();
$(".i-frame").hide();
$(".menu-tabs").hide();

//SVG GENERATION CODE

var startPointsTop = [0, 0, 110, 0, 80, 90, 0, 90];

var topSVG = Snap("#topSVG");

var polygonTop = topSVG.polygon().attr({
  points: startPointsTop,
  fill: "#212121",
  opacity: "0.85"
});

var startPointsBot = [70, 0, 160, 0, 160, 90, 40, 90];

var botSVG = Snap("#botSVG");

var polygonBot = botSVG.polygon().attr({
  points: startPointsBot,
  fill: "#FFF",
  opacity: "0.85"
});

//FOCUS IN ANIMATION CODE

function focusInSearch() {

  $("input[type=text]").focusin(function() {

    var endPointsTop = [0, 0, 110, 0, 110, 90, 0, 90];
    polygonTop.animate({
      points: endPointsTop
    }, 200, mina.linear, function() {
      endPointsTop = [0, 0, 160, 0, 160, 90, 0, 90];
      polygonTop.animate({
        points: endPointsTop
      }, 300, mina.linear);
    });

    var endPointsBot = [40, 0, 160, 0, 160, 90, 40, 90];
    polygonBot.animate({
      points: endPointsBot
    }, 200, mina.linear, function() {
      endPointsBot = [0, 0, 160, 0, 160, 90, 0, 90];
      polygonBot.animate({
        points: endPointsBot
      }, 300, mina.linear);
    });

    $(".bot-sec-content").animate({
      width: "100vw"
    }, 500);

  });

}

focusInSearch();

//FOCUS OUT ANIMATION CODE

function focusOutSearchEvents() {

  var startPointsTop = [0, 0, 110, 0, 110, 90, 0, 90];
  polygonTop.animate({
    points: startPointsTop
  }, 300, mina.linear, function() {
    startPointsTop = [0, 0, 110, 0, 80, 90, 0, 90];
    polygonTop.animate({
      points: startPointsTop
    }, 200, mina.linear);

  });

  var startPointsBot = [40, 0, 160, 0, 160, 90, 40, 90];
  polygonBot.animate({
    points: startPointsBot
  }, 300, mina.linear, function() {
    startPointsBot = [70, 0, 160, 0, 160, 90, 40, 90];
    polygonBot.animate({
      points: startPointsBot
    }, 200, mina.linear);
  });

  if (window.innerWidth > 720) {
    $(".bot-sec-content").animate({
      width: "50vw"
    }, 500);
    $("top-sec-content").animate({
      marginLeft: "auto",
      marginRight: "auto"
    });
  }

}

function focusOutSearch() {
  $("input[type=text]").focusout(function() {
    focusOutSearchEvents();
  });
}

focusOutSearch();

// SEARCH FORM SUBMIT FUNCTION

$("#searchForm").submit(function(e) {
  e.preventDefault(); //PREVENTS THE PAGE FROM BEING REFRESHED

  var searchInput = $("input[type=text]").val();
  console.log(searchInput);

  if (searchInput == "") {
    alert('"If you wish to find, you must first seek...." Enter your query in the search bar before hitting enter.');
  }
  
  $(".wiki-list").show();
  $(".loading-spinner").show();

  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&srsearch=" + searchInput + "&utf8=&format=json&callback=?", function(json) {
    
    $(".loading-spinner").hide();
    
    console.log(json);
    console.log(json.query.search.length);

    var wikiTitleInitial = json.query.search[0].title;
    $(".i-frame").empty();
    $(".i-frame").append('<iframe src="https://en.m.wikipedia.org/wiki/' + wikiTitleInitial + '" id="iFrame">iFrame</iframe>');

    $(".upper-ul").empty();

    for (var i = 0; i < json.query.search.length; i++) {

      var iPlus = i + 1;

      $(".upper-ul").append(
        $("<li>").attr("class", "upper-li-" + iPlus).append(
          $("<ul>").attr("class", "lower-ul-" + iPlus).append(
            $("<li>").attr("class", "li-header-" + iPlus))));
      $(".lower-ul-" + iPlus).append(
        $("<li>").attr("class", "li-snippet-" + iPlus));

      var wikiTitle = json.query.search[i].title;
      var wikiSnippet = json.query.search[i].snippet;

      $(".li-header-" + iPlus).text(json.query.search[i].title);
      //json.query.search[0].title
      $(".li-snippet-" + iPlus).html(json.query.search[i].snippet);
      //json.query.search[0].snippet
      if(window.innerWidth > 720) {
        $(".lower-ul-1").addClass("selected-ul");
      } else {}

      $(".upper-li-" + iPlus).click(function() {
        $(".selected-ul").removeClass("selected-ul");
        var upperLi = $(this).attr("class");
        var upperLiNumber = upperLi.slice(9);
        $(".lower-ul-" + upperLiNumber).addClass("selected-ul");
        var wikiTitleCurrent = json.query.search[upperLiNumber - 1].title;
        console.log(upperLiNumber);
        console.log(wikiTitleCurrent);
        //$("#iFrame").attr("src", "https://en.m.wikipedia.org/wiki/" + json.query.search[i].title);
        $(".i-frame").empty();
        if(window.innerWidth > 720) {
          $(".i-frame").append('<iframe src="https://en.m.wikipedia.org/wiki/' + wikiTitleCurrent + '" id="iFrame">iFrame</iframe>');
        } else {
          window.open("https://en.wikipedia.org/wiki/" + wikiTitleCurrent, "_blank");
        }
      });

    }

  });
  
  $(".menu-tabs").show();

  if (window.innerWidth > 720) {
    $(".wiki-list").animate({
      "marginLeft": "0"
    }, 400);
    $(".i-frame").show();
  } else {
    $(".wiki-list").show(700);
    $("#openTab").hide();
  }

  $(".bot-sec").animate({
    "marginTop": "50vh",
  }, function() {
    $(".bot-sec").hide();
  });
  $(".top-sec").animate({
    "height": "100vh"
  });
  $("svg").animate({
    "height": "100vh"
  });
  $(".top-sec-content").animate({
    "top": "0"
  });
  $(".wiki-text").animate({
    "paddingTop": "0",
    "paddingBottom": "0"
  });
  $("input[type=text]").animate({
    "marginTop": "0"
  });
  $(".fa-search").animate({
    "marginTop": "10px"
  });

  var svgWidth = ((($(".top-sec h1").width()) / ($(window).width())) * 160) + 2.5;
  var endPointsTop = [0, 0, svgWidth, 0, svgWidth, 90, 0, 90];
  polygonTop.animate({
    points: endPointsTop
  }, 300, mina.linear);

  $("input[type=text]").off("focusin");
  $("input[type=text]").off("focusout");
});

// RETURN TO INITIAL PAGE LAYOUT

$("#closeTab").click(function() {

  $(".menu-tabs").hide();
  $(".wiki-list").hide();
  $(".upper-ul").empty();
  $(".i-frame").hide(1);
  $(".i-frame").empty();
  $("input[type=text]").val("");

  if (window.innerWidth > 720) {
    $(".wiki-list").animate({
      "marginLeft": "-" + widthH1 + "px"
    }, 400);
  } else {
    $(".wiki-list").hide(800);
  }

  $(".bot-sec").show(function() {
    $(".bot-sec").animate({
      "marginTop": "0",
    });
    $(".top-sec").animate({
      "height": "50vh"
    });
    $("svg").animate({
      "height": "50vh"
    });
    $(".top-sec-content").animate({
      "top": "5vh"
    });
    $(".wiki-text").animate({
      "paddingTop": "8px",
      "paddingBottom": "8px"
    });
    $("input[type=text]").animate({
      "marginTop": "20px"
    });
    $(".fa-search").animate({
      "marginTop": "30px"
    });
  });

  focusInSearch();
  focusOutSearch(); // TO REINITIATE THE FUNCTIONS THAT WERE EARLIER TURNED 'OFF'

  focusOutSearchEvents(); // SINCE THE ABOVE FUNCTIONS ONLY INITIATE WHEN FOCUS IN/OUT HAPPENS, THERE IS A REQUIREMENT TO FOCUS OUT WHEN 'X' IS CLICKED. HENCE THE INSTRUCTIONS INSIDE focusOutSearch() ARE COMPARTMENTALISED AND INITIATED THROUGH THIS FUNCTION

});

// OPEN IN NEW TAB CODE

$("#openTab").click(function() {
  var wikiLink = $("iframe").attr("src");
  //console.log(wikiLink);
  
  window.open(wikiLink, "_blank");
});

//RANDOM WIKI GENERATION CODE

$("#wikiButton").click(function() {
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&callback=?", function(json) {
    console.log(json);
    var wikiID = json.query.random[0].id;
    window.open("https://en.wikipedia.org/?curid=" + wikiID, "_blank");
  });
});