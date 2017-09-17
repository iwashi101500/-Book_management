var app = angular.module("myApp",["onsen"]);

var PurchaseList = new Array();

ons.ready(function(){
  str=localStorage.getItem('purchaselist');
  if(str){
    PurchaseList = JSON.parse(str);
  };
});

app.controller("BookshelfCtrl",function($scope){
    $scope.clear = function(){
        localStorage.clear();
    }
});

app.controller("PurchaseCtrl",function($scope){
    $scope.purchaselist = PurchaseList;
    
    $scope.addlink=function(){
        MainNav.pushPage("purchase_add.html");
    };
    
    $scope.add_item = function(){
        PurchaseList.push({
            name: $scope.name,
            turns: $scope.turns,
            date: $scope.date,
            notification: $scope.notification
        });
        MainNav.on("prepop",function(){
            localStorage.setItem('purchaselist',JSON.stringify(PurchaseList));
            $scope.purchaselist=PurchaseList;
        });
        MainNav.popPage({refresh:true});
    };
    
    $scope.delete = function(key){
        PurchaseList.splice(key, 1);
        localStorage.setItem('purchaselist',JSON.stringify(PurchaseList));
    };
});
