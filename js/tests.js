    var accounts = [
        {no:'1000', name:'Fixed assets'}
    ];
   var rate = 14;

describe('DaybooksCtrl', function() {

  beforeEach(angular.mock.module('myApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    this.scope = $rootScope.$new();
    $controller('DaybooksCtrl', {
        $scope: this.scope
    });
  }));

     it("expect getTotal() to return  integer", function() {
        var total = this.scope.getTotal();
        expect(typeof total).toEqual('number');
      });


     it("expect countVAT() to return  integer", function() {
        var vat = this.scope.countVAT(1000, 100, 1);
        expect(typeof vat).toEqual('number');
      });

});
