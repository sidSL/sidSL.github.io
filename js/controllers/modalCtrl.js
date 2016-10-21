app.controller("modalCtrl",['$scope','$timeout',function($scope,$timeout){
  var data = [
     {team: 'Engineering', employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway']},
     {team: 'Executive', employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj']},
     {team: 'Finance', employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen']},
     {team: 'Sales', employees: ['Ankit Jain', 'Anjali Maulingkar']}
   ];


  $scope._closeModal = function(){
    $('#myModal').modal('hide');
    $timeout(function(){
      $scope.isModalShown = false;
    },0);
  }
  $scope._openModal = function(){
    $scope.isModalShown = true;
    $timeout(function(){
      $('#myModal').modal('show');
    },0);
  }
  $scope.closeModal = function(){
    if($scope.forms.myForm.empDD.$pristine&&$scope.forms.myForm.teamDD.$pristine){
      $scope._closeModal();
    }else{
      var r = confirm('You will lose your changes if you navigate away.')
      if(r===true){
        $scope._closeModal();
      }
      else{
        angular.noop();
      }
    }
  };
  $scope.ok = function(){
      $scope.validationDone = true;
      if($scope.forms.myForm.empDD.$valid){
        $scope._closeModal();
      }
  }
  $scope.initialize = function(){
    $scope.model = {
      employeeName: "",
      teamName: ""
    };
    $scope.model.employeeName = "";
    $scope.model.teamName ="";
    $scope.validationDone = false;
    $scope.model.employees = [];
    $scope.model.teams = data.map(function(item){
        return item.team;
      });
    for(var i=0;i<data.length;++i){
      $scope.model.employees[data[i].team] = data[i].employees;
    }

  }
  $scope.openModal = function(){
    $scope.initialize();
    $scope._openModal();
  }
  $scope.setFormScope= function(scope){
   this.myForm = scope;
 }
 $scope.forms = {};
}]);
