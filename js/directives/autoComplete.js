
app.directive('autoComplete',['$timeout',function($timeout){
  return {
    restrict: 'E',
    scope: {
      options: '=options',
      placeholder: '@placeholder',
      value: '=defaultValue',
      formName : '@name'
    },
    controller: 'autoCompleteCtrl',
    templateUrl: 'templates/autoCompleteTemplate.html',
    link: function(scope,element,attrs){
      scope.value = "";
      scope[scope.formName].$setValidity('valid',false);
      $(document).click(function(event) {
      if(!$(event.target).closest('.ddContainer').length) {
          if($('.ddContainer').is(":visible")) {
              $timeout(function(){
                scope.showDropDown = false;
              },0);
          }
      }
    });
    },
  };
}]);

app.controller('autoCompleteCtrl',['$scope','$timeout',function($scope,$timeout){
  $scope.selected = false;
  $scope.showDropDown = true;
  $scope.scrollCount = 0;
  $scope.selectOption = function(value){
    $scope.value = value;

    $timeout(function(){
      $scope.showDropDown = false;
      if($scope.options.indexOf($scope.value)!=-1){
        $scope[$scope.formName].$setValidity('valid',true);
      }
    },0);
  }
  $scope.$watch('value',function(){
    if($scope.value!==""){
      $scope.showDropDown = true;
      $scope[$scope.formName].$setValidity('valid',false);
    }
  });
  $scope.$watch('options',function(){
    $scope.value = "";
  });
  $scope.typeAheadFilter = function(option) {
   var re = new RegExp('^'+$scope.value.toLowerCase(),"g");
   return re.test(option.toLowerCase());
};
  $scope.keyboardHandler = function(event){
    if(event.code==='ArrowDown'){
      $scope.scrollCount+=1;
    }
    if(event.code==='ArrowUp'){
      $scope.scrollCount-=1;
    }
    if(event.code==="Enter"){
      if($scope.filteredOptions.length>0 && $scope.scrollCount>0){
        $scope.value = $('.highlight').html();
      }
      $scope.selectOption($scope.value);
      $scope.scrollCount = 0;
    }
    if((event.code==='ArrowDown'||event.code==='ArrowUp')){
      if($scope.scrollCount===$scope.filteredOptions.length+1){
        $scope.scrollCount=1;
      }
      else if($scope.scrollCount===0){
        $scope.scrollCount = $scope.filteredOptions.length;
      }
    }

  };
}]);
