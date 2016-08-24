angular.module('starter')
	.directive('address', function($parse) {
    return {
	    scope: {
	            addressObject: '=parameter'
	        },
	    template: '<p><span ng-if="addressObject.Address_line1">{{addressObject.Address_line1}}</span><span ng-if="addressObject.Address_line2">&nbsp{{addressObject.Address_line2}}</span><span ng-if="addressObject.City">,{{addressObject.City}}</span><span ng-if="addressObject.District">,{{addressObject.District}}</span><span ng-if="addressObject.State">,{{addressObject.State}}</span><span ng-if="addressObject.Country">,{{addressObject.Country}}</span><span ng-if="addressObject.Postal_code">,{{addressObject.Pincode}}</span></p>',
    }
})