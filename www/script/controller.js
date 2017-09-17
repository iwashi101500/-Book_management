var app = angular.module("myApp",["onsen"]);

//購入予定リスト
var PurchaseList = new Array();

//年月リスト
var DateList = new Array();

//ローカルストレージ読み込み
ons.ready(function(){
  //購入予定リスト読み込み
  var pur = localStorage.getItem('purchaselist');
  if(pur){
    PurchaseList = JSON.parse(pur);
  };
  
  //年月リスト読み込み
  var date = localStorage.getItem('datelist');
  if(date){
    DateList = JSON.parse(date);   
  }
});


//書籍リスト
app.controller("BookshelfCtrl",function($scope){
    $scope.clear = function(){
        localStorage.clear();
    };
});

//購入予定リスト
app.controller("PurchaseCtrl",function($scope){
    $scope.purchaselist = PurchaseList;
    $scope.datelist = DateList;
    
    //項目削除
    $scope.delete = function(key){
        PurchaseList.splice(key, 1);
        localStorage.setItem('purchaselist',JSON.stringify(PurchaseList));
    };
    
    //編集画面へ遷移
    $scope.addlink=function(){
        MainNav.pushPage("purchase_add.html");
    };
    
    //リストへ追加
    $scope.add_item = function(){
        var date = new Date($scope.date);
        //購入予定リスト
        PurchaseList.push({
            name: $scope.name,
            turns: $scope.turns,
            date: $scope.date,
            year: date.getFullYear(),
            month: date.getMonth()+1,
            notification: $scope.notification
        });
        
        //被りがないかチェック
        var checkdate=function(){
            var flag=true;
            for(i in DateList){
                if((DateList[i].year==date.getFullYear()) && (DateList[i].month==date.getMonth()+1)){
                    flag=false;
                }
            }
            if(flag==true){
                DateList.push({
                    year: date.getFullYear(),
                    month: date.getMonth()+1
                });                
            }
        };
        checkdate();
        MainNav.on("prepop",function(){
            localStorage.setItem('purchaselist',JSON.stringify(PurchaseList));
            localStorage.setItem('datelist',JSON.stringify(DateList));
            $scope.purchaselist = PurchaseList;
            $scope.datelist = DateList;
        });
        MainNav.popPage({refresh:true});
    };
});
