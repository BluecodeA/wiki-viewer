//CSS MODIFICATION CODE

var widthH1 = $(".top-sec h1").width();
//alert(widthH1);

$("input[type=text]").css({
  "width": widthH1
});

$(".xs-center").css({
  "width": widthH1
});

if (window.innerWidth > 720) {
  $(".wiki-list").css({
    "marginLeft": "-" + widthH1 + "px"
  });
} else {
  $(".wiki-list").hide();
}

if (window.innerWidth > 720) {
  $(".wiki-list").css({
    "width": widthH1,
    "paddingLeft": "20px"
  });
} else {}

$("#closeX").hide();

//RANDOM WIKI GENERATION CODE

$("#wikiButton").click(function() {
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&callback=?", function(json) {
    console.log(json);
    var wikiID = json.query.random[0].id;
    window.open("https://en.wikipedia.org/?curid=" + wikiID, "_blank");
  });
});

/*$(".top-sec h1").click(function() {
  var searchInput = $("input[type=text]").val();
  console.log(searchInput);
  $("input[type=text]").val("");

  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchInput + "&utf8=&format=json&callback=?", function(json) {
    console.log(json);
  });
});*/

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
    }, 600);

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
    }, 600);
    $(".xs-center").animate({
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

  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchInput + "&utf8=&format=json&callback=?", function(json) {
    console.log(json);
    console.log(json.query.search.length);
    $(".upper-ul").empty();
    
    for(i = 0; i < json.query.search.length; i++) {
      
      var iPlus = i + 1;

    $(".upper-ul").append(
      $("<li>").attr("class", "upper-li-" + iPlus).append(
        $("<ul>").attr("class", "lower-ul-" + iPlus).append(
          $("<li>").attr("class", "li-header-" + iPlus))));
    $(".lower-ul-" + iPlus).append(
      $("<li>").attr("class", "li-snippet-" + iPlus));
    
    $(".li-header-" + iPlus).text(json.query.search[i].title);
    //json.query.search[0].title
    $(".li-snippet-" + iPlus).html(json.query.search[i].snippet);
    //json.query.search[0].snippet
      
    }
  });

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
  $(".xs-center").animate({
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
  $("#closeX").show();

  var svgWidth = ((($(".top-sec h1").width()) / ($(window).width())) * 160) + 2.5;
  var endPointsTop = [0, 0, svgWidth, 0, svgWidth, 90, 0, 90];
  polygonTop.animate({
    points: endPointsTop
  }, 300, mina.linear, function() {
    if (window.innerWidth > 720) {
      $(".wiki-list").animate({
        "marginLeft": "0"
      }, 400);
    } else {
      $(".wiki-list").show(700);
    }
  });

  $("input[type=text]").off("focusin");
  $("input[type=text]").off("focusout");
});

// RETURN TO INITIAL PAGE LAYOUT

$("#closeX").click(function() {
  console.log("X");

  $("#closeX").hide();
  $("input[type=text]").val("");

  if (window.innerWidth > 720) {
    $(".wiki-list").animate({
      "marginLeft": "-" + widthH1 + "px"
    }, 400).delay(800);
  } else {
    $(".wiki-list").hide(800).delay(800);
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
    $(".xs-center").animate({
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