angular
	.module('starter')
	.controller('studentClassController', studentClassController);

studentClassController.$inject = ['$scope', '$stateParams', '$state', '$location', '$localStorage', 'userInfoService', 'activityService'];

function studentClassController($scope, $stateParams, $state, $location, $localStorage, userInfoService, activityService) {
    var vm = this;

    vm.joinActivity = joinActivity;
    vm.DeletActivityFromList = DeletActivityFromList;

    vm.activityList = [];
    vm.userName =  $localStorage.userInfo.data[0].Name;

    $scope.$on('$ionicView.enter', function () {
        showStudentClass();
    });
    if($localStorage.userInfo.data[0].Name != '' || $localStorage.userInfo.data[0].Name != null){
         $localStorage.userlogin = true;
    }
    function showStudentClass(){
        console.log('called')
    	userInfoService.getUserClassList($localStorage.userInfo.data[0]._url).then( function (studentClass){
    		console.log("studentClass",studentClass);
            angular.forEach(studentClass.data, function (piece, index) {
            console.log('piece',piece);
                activityService.getActivityByUrl(piece.Activity_url).then(function(activity){
                        /*activityList.push(activity.data);
                        console.log('1',activityList);*/
                        ActivityDetailStructure(activity.data,piece);
                },function(error){
                    console.log("error in getting activity detail",error);
                })
          });
    	},function(error){
    		console.log('error in getting student class',error);
    	})       
    }

    function ActivityDetailStructure(activity,roledActivity){
        console.log('activity',activity);
        console.log('roledActibity',roledActivity);
            var _activityDetail = {
                activity_type_id: activity.Activity_type_id,
                activity_address: activity.Address,
                activity_coordinator_url: activity.Coordinator_url,
                activity_email: activity.Email,
                activity_end_date: activity.End_date,
                activity_end_time: activity.End_time,
                activity_name: activity.Name,
                activity_phone: activity.Phone,
                activity_project_url: activity.Project_url,
                activity_recurrence: activity.Recurrence,
                activity_sb_Region: activity.SB_Region,
                activity_start_date: activity.Start_date,
                activity_start_time: activity.Start_time,
                activity_URL: activity.URL,
                activity__url: activity._url,
                activityState: roledActivity.Status,
                userurl: roledActivity.Person_url,
                roleurl:roledActivity._url
            }
             vm.activityList.push(_activityDetail)
             console.log('detail activity',vm.activityList);
         }

        function joinActivity(activityTOjoin,state){
            console.log(activityTOjoin);
            
            var date = new Date();
            console.log(date);
            if(state == "Confirmed"){
                var newJoindActivity = {
                    Activity_url: activityTOjoin.activity__url, 
                    Person_url:  $localStorage.userInfo.data[0]._url, 
                    Role:  $localStorage.userInfo.data[0].Role,
                    Status:'Confirmed',
                    Last_active_date:new Date(),
                    _url: activityTOjoin.roleurl
                }
            }
            
            console.log('newJoindActivity',newJoindActivity);
            activityService.updateActivity(newJoindActivity,activityTOjoin.roleurl).then(function(data){
                console.log('activity joined scc',data);
                vm.activityList = [];
                $state.go('app.studentClass', {}, {reload: true});
            },function(error){
                console.log(error);
            })
        }

        function DeletActivityFromList(activity){
            console.log(activity);
            console.log(activity.roleurl);
            activityService.deletActivityFromUserList(activity.roleurl).then(function(data){
                console.log('activity Deletd');
                vm.activityList = [];
                $state.go('app.studentClass', {}, {reload: true});
            });
        }
}