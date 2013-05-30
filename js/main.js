var myApp = angular.module('myApp', ['ui']);

angular.module('myApp',[]).controller('DaybooksCtrl', function($scope) {

    $scope.daybooks = [
        {date:'2012-12-17', entry:'50134', type:'Journal entry', invoice:'', account:'1000', accountName: 'Fixed assets', contrAccount: '9010', contrAccountName: 'Freehold property', dc: 'Debit', text:'Derp Receiprt', amount: 12125, accountVAT:1698, contrAccountVAT:1819, currency:'USD'},
        {date:'2013-01-21', entry:'50135', type:'Journal entry', invoice:'', account:'1010', accountName: 'Freehold property', contrAccount: '9010', contrAccountName: 'Freehold property', dc: 'Debit', text:'Apple Receiprt', amount: 7350, accountVAT:882, contrAccountVAT:1103, currency:'UAH'},
        {date:'2013-02-13', entry:'50143', type:'Journal entry', invoice:'', account:'1020', accountName: 'Plant and machinery', contrAccount: '9021', contrAccountName: 'Office equipment', dc: 'Debit', text:'Bribe', amount: -12345, accountVAT:-1357, contrAccountVAT:-1851, currency:'USD'},
        {date:'2013-02-21', entry:'50144', type:'Journal entry', invoice:'', account:'1000', accountName: 'Fixed assets', contrAccount: '9010', contrAccountName: 'Freehold property', dc: 'Debit', text:'Plastic Surgery', amount: -3400, accountVAT:-476, contrAccountVAT:-510, currency:'USD'},
        {date:'2013-03-14', entry:'50155', type:'Journal entry', invoice:'', account:'1020', accountName: 'Plant and machinery', contrAccount: '9010', contrAccountName: 'Freehold property', dc: 'Debit', text:'Trip', amount: 2400, accountVAT:264, contrAccountVAT:360, currency:'USD'},
        {date:'2013-03-17', entry:'50158', type:'Journal entry', invoice:'',account:'1343', accountName: 'Motor vehicles', contrAccount: '9010', contrAccountName: 'Freehold property', dc: 'Debit', text:'Trip', amount: 14425, accountVAT:1731, contrAccountVAT:2164, currency:'USD'},
        {date:'2013-04-11', entry:'50168', type:'Journal entry', invoice:'',account:'1000', accountName: 'Fixed assets', contrAccount: '9021', contrAccountName: 'Office equipment', dc: 'Debit' ,text:'Derp Receiprt', amount: 24120, accountVAT:3377, contrAccountVAT:3618, currency:'USD'},
        {date:'2013-05-02', entry:'50188', type:'Journal entry', invoice:'', account:'1094', accountName: 'Furniture and fixtures', contrAccount: '9010', contrAccountName: 'Freehold property', dc: 'Debit', text:'Derp Receiprt', amount: 4520, accountVAT:498, contrAccountVAT:678, currency:'USD'},
        {date:'2013-05-04', entry:'50189', type:'Journal entry', invoice:'', account:'1011', accountName: 'Leasehold property', contrAccount: '9010', contrAccountName: 'Freehold property', dc: 'Debit', text:'Derp Receiprt', amount: 75120, accountVAT:9766, contrAccountVAT:11268, currency:'USD'}
   ];

    $scope.accounts = [
        {no:'1000', name:'Fixed assets', vat: '14'},
        {no:'1010', name:'Freehold property', vat: '12'},
        {no:'1011', name:'Leasehold property', vat: '13'},
        {no:'1020', name:'Plant and machinery', vat: '11'},
        {no:'1021', name:'Office equipment', vat: '10'},
        {no:'1094', name:'Furniture and fixtures', vat: '11'},
        {no:'1343', name:'Motor vehicles', vat: '12'}
   ];

    $scope.contrAccounts = [
        {no:'9000', name:'Fixed assets', vat: '12'},
        {no:'9010', name:'Freehold property', vat: '15'},
        {no:'9011', name:'Leasehold property', vat: '17'},
        {no:'9020', name:'Plant and machinery', vat: '18'},
        {no:'9021', name:'Office equipment', vat: '15'},
        {no:'9094', name:'Furniture and fixtures', vat: '16'},
        {no:'9343', name:'Motor vehicles', vat: '17'}
   ];

    $scope.currencies = [ 'UAH', 'USD', 'RUR', 'GBP', 'EUR', 'EEK', 'EGP', 'CYP'];
    $scope.Daybook = {};
    $scope.EditDaybook = {};

    $scope.getTotal = function(){
        return $scope.daybooks.length;
    };

    $scope.remove = function(daybook) {
        var index = $scope.daybooks.indexOf(daybook);
        $scope.daybooks.splice(index, 1);
    };

    $scope.addEntry = function(daybook) {
        daybook.accountVAT = $scope.countVAT(daybook.account, daybook.amount, 0);
        daybook.contrAccountVAT = $scope.countVAT(daybook.contrAccount, daybook.amount, 1);
        $scope.daybooks.push(daybook);
        $scope.Daybook = '';
    };

    $scope.editEntry = function(daybook) {
        var index = $scope.daybooks.indexOf(daybook);
        daybook.accountVAT = $scope.countVAT(daybook.account, daybook.amount, 0);
        daybook.contrAccountVAT = $scope.countVAT(daybook.contrAccount, daybook.amount, 1);
        $scope.daybooks[index] = daybook;
    };

    $scope.openModal = function(name){
        $(name).modal('show');
    };

    $scope.openEditModal = function(daybook){
        $scope.EditDaybook = daybook;
        $('#editDaybookModal').modal('show');
    };

    $scope.openAddModal = function(){
        $scope.Daybook = {};
        $('#addDaybookModal').modal('show');
        $scope.Daybook.entry = $scope.getEntryId();
    };

    $scope.selectAccount = function(account){
        $scope.Daybook.account = account.no;
        $scope.Daybook.accountName = account.name;
        $('#accounts').modal('hide');
    };

    $scope.selectContraAccount = function(account){
        $scope.Daybook.contrAccount = account.no;
        $scope.Daybook.contrAccountName = account.name;
        $('#contrAccounts').modal('hide');
    };

    $scope.countVAT = function(account, amount, key){
        if (key == 1)
          $array = $scope.contrAccounts;
        if (key === 0)
          $array = $scope.accounts;
        for (i=0;i<$array.length;i++) {
            if ($array[i].no == account){
              rate =  $array[i].vat;
            }
      }
      return Math.ceil (( amount / 100 ) * rate);
    };

    $scope.getEntryId = function(){
        max = $scope.daybooks[1].entry;
        for (i=0;i<$scope.daybooks.length;i++) {
            if ($scope.daybooks[i].entry > max)
                max = $scope.daybooks[i].entry;
      }
        max++;
        return max;
    };


});