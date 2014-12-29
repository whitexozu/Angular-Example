var app = angular.module("app",[]);
app.directive("svg",function(){
    return {
    
        link: function (scope, iElement, iAttrs) {
            var svg = angular.element('<svg width="600" height="100" class="svg"></svg>');
            iElement.append(svg);

        }
    
    }
});