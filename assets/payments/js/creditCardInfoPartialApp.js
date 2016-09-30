var app = angular.module('creditCardInfoPartialApp', []);

app.controller('creditCardInfoPartialCtrl', function ($scope, $timeout) {


    $timeout(function () {
        $scope.watchPanelSize();
    })

    $scope.watchPanelSize = function () {
        if ($('.creditCardInfoPartialPanel').width() <= 480) {
            console.log('xs');
            $('.creditCardInfoPartialCardholder').css('flex-direction', 'column');
            $('.creditCardInfoPartialCardholderTitle').css('text-align', 'left');

            $('.creditCardInfoPartialNumber').css('flex-direction', 'column');
            $('.creditCardInfoPartialNumberTitle').css('text-align', 'left');

            $('.creditCardInfoPartialExpiration').css('flex-direction', 'row');
            $('.creditCardInfoPartialExpirationTitle').css('text-align', 'right');

            $('.creditCardInfoPartialCVV').css('flex-direction', 'row');
            $('.creditCardInfoPartialCVVTitle').css('text-align', 'right');

            $('.creditCardInfoPartialZip').css('flex-direction', 'row');
            $('.creditCardInfoPartialZipTitle').css('text-align', 'right');
        }
        if ($('.creditCardInfoPartialPanel').width() > 480 && $('.creditCardInfoPartialPanel').width() <= 768) {
            console.log('sm');
            $('.creditCardInfoPartialCardholder').css('flex-direction', 'column');
            $('.creditCardInfoPartialCardholderTitle').css('text-align', 'left');

            $('.creditCardInfoPartialNumber').css('flex-direction', 'column');
            $('.creditCardInfoPartialNumberTitle').css('text-align', 'left');

            $('.creditCardInfoPartialExpiration').css('flex-direction', 'row');
            $('.creditCardInfoPartialExpirationTitle').css({'text-align': 'right', 'flex': 'none'});

            $('.creditCardInfoPartialCVV').css('flex-direction', 'row');
            $('.creditCardInfoPartialCVVTitle').css({'text-align': 'right', 'flex': 'none'});

            $('.creditCardInfoPartialZip').css('flex-direction', 'row');
            $('.creditCardInfoPartialZipTitle').css({'text-align': 'right', 'flex': 'none'});
        }
        if ($('.creditCardInfoPartialPanel').width() > 768 && $('.creditCardInfoPartialPanel').width() <= 992) {
            console.log('md');
            $('.creditCardInfoPartialCardholder').css('flex-direction', 'row');
            $('.creditCardInfoPartialCardholderTitle').css('text-align', 'right');

            $('.creditCardInfoPartialNumber').css('flex-direction', 'row');
            $('.creditCardInfoPartialNumberTitle').css('text-align', 'right');

            $('.creditCardInfoPartialExpiration').css('flex-direction', 'row');
            $('.creditCardInfoPartialExpirationTitle').css('text-align', 'right');

            $('.creditCardInfoPartialCVV').css('flex-direction', 'row');
            $('.creditCardInfoPartialCVVTitle').css('text-align', 'right');

            $('.creditCardInfoPartialZip').css('flex-direction', 'row');
            $('.creditCardInfoPartialZipTitle').css('text-align', 'right');
        }
        if ($('.creditCardInfoPartialPanel').width() > 992) {
            console.log('lg');
            $('.creditCardInfoPartialCardholder').css('flex-direction', 'row');
            $('.creditCardInfoPartialCardholderTitle').css('text-align', 'right');

            $('.creditCardInfoPartialNumber').css('flex-direction', 'row');
            $('.creditCardInfoPartialNumberTitle').css('text-align', 'right');

            $('.creditCardInfoPartialExpiration').css('flex-direction', 'row');
            $('.creditCardInfoPartialExpirationTitle').css('text-align', 'right');

            $('.creditCardInfoPartialCVV').css('flex-direction', 'row');
            $('.creditCardInfoPartialCVVTitle').css('text-align', 'right');

            $('.creditCardInfoPartialZip').css('flex-direction', 'row');
            $('.creditCardInfoPartialZipTitle').css('text-align', 'right');
        }
    };

    $(window).resize(function () {
        $scope.watchPanelSize();
    })
});