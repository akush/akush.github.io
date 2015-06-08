"use strict";

angular.module("templatescache", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("home.html", "\n<div class=\"row dashboard-first\">\n  <div class=\"col-lg-5\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">Live update</div>\n      <div class=\"panel-body\">\n        <div id=\"bar\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-lg-4\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">Questions details</div>\n      <div class=\"panel-body\">\n        <div ng-repeat=\"question in main.questions\"><span>{{question.text}}</span>\n          <progressbar value=\"question.total\" type=\"{{ main.getProgressBarType(question.total) }}\"></progressbar>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-lg-3\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">Comments</div>\n      <div class=\"panel-body\">\n        <ul class=\"comment\">\n          <li class=\"clearfix\">\n            <div class=\"comment-body clearfix\">\n              <div class=\"header\"><strong class=\"primary-font\">Jack Sparrow</strong><small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o fa-fw\"></i><span>12 mins ago</span></small></div>\n              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p>\n            </div>\n          </li>\n          <li class=\"clearfix\">\n            <div class=\"comment-body clearfix\">\n              <div class=\"header\"><strong class=\"primary-font\">Jack Sparrow</strong><small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o fa-fw\"></i><span>12 mins ago</span></small></div>\n              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p>\n            </div>\n          </li>\n          <li class=\"clearfix\">\n            <div class=\"comment-body clearfix\">\n              <div class=\"header\"><strong class=\"primary-font\">Jack Sparrow</strong><small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o fa-fw\"></i><span>12 mins ago</span></small></div>\n              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p>\n            </div>\n          </li>\n          <li class=\"clearfix\">\n            <div class=\"comment-body clearfix\">\n              <div class=\"header\"><strong class=\"primary-font\">Jack Sparrow</strong><small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o fa-fw\"></i><span>12 mins ago</span></small></div>\n              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.</p>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div ng-repeat=\"question in main.questions | limitTo:4:0\" class=\"col-lg-3\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">{{question.text}}</div>\n      <div class=\"panel-body\">\n        <div ng-repeat=\"res in question.result\"><span>{{res.text}}</span>\n          <progressbar value=\"res.value\" type=\"{{ main.getProgressBarType(res.value) }}\"></progressbar>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div ng-repeat=\"question in main.questions | limitTo:4:4\" class=\"col-lg-3\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">{{question.text}}</div>\n      <div class=\"panel-body\">\n        <div ng-repeat=\"res in question.result\"><span>{{res.text}}</span>\n          <progressbar value=\"res.value\" type=\"{{ main.getProgressBarType(res.value) }}\"></progressbar>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>");
    $templateCache.put("logoff.html", "");
    $templateCache.put("profile.html", "\n<h1>Profile</h1>\n<p>Abhinav Kushwaha</p>");
}]);
var ipsator = angular.module("ipsator", ["templatescache", "ui.bootstrap", "angular.morris-chart", "ngRoute"]).config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider.when("/", {
        templateUrl: "home.html",
        controller: "MainCtrl",
        controllerAs: "main"
    }).when("/profile", {
        templateUrl: "profile.html",
        controller: "ProfileCtrl",
        controllerAs: "profile"
    }).when("/logoff", {
        templateUrl: "logoff.html",
        controller: "LogoffCtrl",
        controllerAs: "logoff"
    });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]).controller("NavController", ["$rootScope", function ($rootScope) {
    var scope = this;
    scope.navList = [{
        name: "Home",
        href: "/",
        icon: "glyphicon-home"
    }, {
        name: "Profile",
        href: "/profile",
        icon: "glyphicon-user"
    }, {
        name: "Logoff",
        href: "/logoff",
        icon: "glyphicon-off"
    }];
}]).controller("LogoffCtrl", function () {
    console.log("saysomething");
}).controller("ProfileCtrl", function () {
    console.log("Profile page");
});
ipsator.directive("barchart", function () {
    return {
        restrict: "E",
        template: "<div></div>",
        replace: true,
        scope: {
            types: "="
        },
        // observe and manipulate the DOM
        link: function link($scope, element, attrs) {
            var data = $scope[attrs.data],
                xkey = $scope[attrs.xkey],
                ykeys = $scope[attrs.ykeys],
                labels = $scope[attrs.labels];
            Morris.Bar({
                element: element,
                data: data,
                xkey: xkey,
                ykeys: ykeys,
                labels: labels
            });
        }

    };
});
ipsator.controller("MainCtrl", function ($window, $interval) {
    console.log("Welcome to dashboard!");
    var main = this;
    main.xkey = "range";
    main.ykeys = ["total_tasks", "total_overdue"];
    main.labels = ["Howrah Rajdhani", "Mumbai Rajdhani"];
    var a = new Date();
    a = new Date("Mon Jun 08 2015 " + a.getHours() + ":" + a.getMinutes() + ":00 GMT+0530 (IST)").getTime();
    main.myModel = [{
        range: new Date(a - 15000).getTime(),
        total_tasks: 20,
        total_overdue: 5
    }, {
        range: new Date(a - 10000).getTime(),
        total_tasks: 35,
        total_overdue: 8
    }, {
        range: new Date(a - 5000).getTime(),
        total_tasks: 20,
        total_overdue: 1
    }, {
        range: new Date(a).getTime(),
        total_tasks: 20,
        total_overdue: 6
    }];
    var i = 5;
    main.interval = $interval(function () {
        i++;
        if (i > 10) $interval.cancel(main.interval);
        main.myModel.push({
            range: new Date().getTime(),
            total_tasks: getRandomInt(20, 30),
            total_overdue: getRandomInt(10, 20)
        });
        main.chart.setData(main.myModel);
        //console.log(main.myModel);
    }, 5000);
    var config = {
        data: main.myModel,
        xkey: main.xkey,
        ykeys: main.ykeys,
        labels: main.labels,
        fillOpacity: 0.6,
        hideHover: "auto",
        behaveLikeLine: true,
        resize: true,
        pointFillColors: ["#ffffff"],
        pointStrokeColors: ["black"],
        lineColors: ["gray", "blue"]
    };
    config.element = "bar";
    $window.chart = main.chart = Morris.Area(config);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    main.getProgressBarType = function (value) {
        var type;
        if (value > 85) {
            type = "success";
        } else if (value > 50) {
            type = "info";
        } else if (value > 25) {
            type = "warning";
        } else {
            type = "danger";
        }
        return type;
    };

    main.questions = [{
        text: "How was the quantity of the food served?",
        total: 75,
        result: [{
            text: "Too Less",
            value: 5
        }, {
            text: "Inadequate",
            value: 5
        }, {
            text: "Adequate",
            value: 55
        }, {
            text: "More than sufficient",
            value: 25
        }, {
            text: "Wasteful",
            value: 10
        }]
    }, {
        text: "How was the taste of the food served?",
        total: 90,
        result: [{
            text: "Delicious",
            value: 5
        }, {
            text: "Spicy",
            value: 5
        }, {
            text: "Bland",
            value: 55
        }, {
            text: "Stale",
            value: 25
        }, {
            text: "Needs Improvement",
            value: 10
        }]
    }, {
        text: "Was the food (veg & non veg dishes) served at appropriate temperature?",
        total: 90,
        result: [{
            text: "Too Hot",
            value: 5
        }, {
            text: "Hot",
            value: 5
        }, {
            text: "Preferred Temperature",
            value: 55
        }, {
            text: "Cold",
            value: 25
        }, {
            text: "Frozen",
            value: 10
        }]
    }, {
        text: "Was the food delivered in a hygienic manner?",
        total: 9,
        result: [{
            text: "Definitely Yes",
            value: 5
        }, {
            text: "Above Average",
            value: 5
        }, {
            text: "Average",
            value: 55
        }, {
            text: "Below Average",
            value: 25
        }, {
            text: "Needs Improvement",
            value: 10
        }]
    }, {
        text: "How was the service provided by the staff?",
        total: 50,
        result: [{
            text: "Excellent",
            value: 5
        }, {
            text: "Very Good",
            value: 5
        }, {
            text: "Good",
            value: 55
        }, {
            text: "Needs Improvement",
            value: 10
        }, {
            text: "Bad",
            value: 25
        }]
    }, {
        text: "How was your overall experience while travelling in Indian Railways?",
        total: 90,
        result: [{
            text: "Excellent",
            value: 55
        }, {
            text: "Very Good",
            value: 5
        }, {
            text: "Good",
            value: 5
        }, {
            text: "Needs Improvement",
            value: 25
        }, {
            text: "Bad",
            value: 10
        }]
    }, {
        text: "Did you use IRCTC website/app to book your tickets? If Yes, did you face any problem using the same.",
        total: 80,
        result: [{
            text: "Definitely Yes",
            value: 5
        }, {
            text: "Yes",
            value: 5
        }, {
            text: "Neither Yes Nor No",
            value: 55
        }, {
            text: "No",
            value: 25
        }, {
            text: "Definitely No",
            value: 10
        }]
    }];
});