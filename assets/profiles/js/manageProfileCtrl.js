angular.module('manageProfiles').controller('manageProfilesCtrl', function ($scope, $timeout, DTOptionsBuilder, DTColumnDefBuilder) {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $scope.billingHistoryDatatableOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('simple_numbers')
        .withDOM('irtp')
        .withOption('responsive', true)
        .withOption('order', [[ 1, 'desc' ]])
        .withLanguage({
            oPaginate: {
                sNext: '>',
                sPrevious: '<'
            }
        });
    $scope.billingHistoryDatatableDefs = [
        DTColumnDefBuilder.newColumnDef(0).notSortable(),
        DTColumnDefBuilder.newColumnDef(1).notVisible(),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];

    $timeout(function () {
        $('#createUpdateCardModal').on('shown.bs.modal', function () {
            $('#cardCompany').focus();
        });
    })

    $.fn.DataTable.ext.pager.numbers_length = 5;

    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.years =['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007','2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015','2016'];
    $scope.cardCompanies = ['Visa', 'Master Card', 'American Express', 'Capital One', 'Chase', 'Bank of America'];

    $scope.billingInfo = [
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://s3-us-west-2.amazonaws.com/turnkey-media-development/507_1717_13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.cientificosaficionados.com/libros/cohetes.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.olivercameron.org/wp-content/uploads/2014/04/Making-Snowshoes-Oliver-Cameron-031214.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://www.dogstrust.org.uk/help-advice/factsheets-downloads/basicdogtrainingfactsheetnov13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://s3-us-west-2.amazonaws.com/turnkey-media-development/507_1717_13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.cientificosaficionados.com/libros/cohetes.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.olivercameron.org/wp-content/uploads/2014/04/Making-Snowshoes-Oliver-Cameron-031214.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://www.dogstrust.org.uk/help-advice/factsheets-downloads/basicdogtrainingfactsheetnov13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://s3-us-west-2.amazonaws.com/turnkey-media-development/507_1717_13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.cientificosaficionados.com/libros/cohetes.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.olivercameron.org/wp-content/uploads/2014/04/Making-Snowshoes-Oliver-Cameron-031214.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://www.dogstrust.org.uk/help-advice/factsheets-downloads/basicdogtrainingfactsheetnov13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://s3-us-west-2.amazonaws.com/turnkey-media-development/507_1717_13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.cientificosaficionados.com/libros/cohetes.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.olivercameron.org/wp-content/uploads/2014/04/Making-Snowshoes-Oliver-Cameron-031214.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://www.dogstrust.org.uk/help-advice/factsheets-downloads/basicdogtrainingfactsheetnov13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://s3-us-west-2.amazonaws.com/turnkey-media-development/507_1717_13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.cientificosaficionados.com/libros/cohetes.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.olivercameron.org/wp-content/uploads/2014/04/Making-Snowshoes-Oliver-Cameron-031214.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://www.dogstrust.org.uk/help-advice/factsheets-downloads/basicdogtrainingfactsheetnov13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://s3-us-west-2.amazonaws.com/turnkey-media-development/507_1717_13.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.cientificosaficionados.com/libros/cohetes.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'http://www.olivercameron.org/wp-content/uploads/2014/04/Making-Snowshoes-Oliver-Cameron-031214.pdf'
        },
        {
            month: $scope.months[Math.floor(Math.random() * (11))],
            year: $scope.years[Math.floor(Math.random() * (16))],
            pdf: 'https://www.dogstrust.org.uk/help-advice/factsheets-downloads/basicdogtrainingfactsheetnov13.pdf'
        },
    ];
    $scope.cardToEdit = {
        company: '',
        number: '',
        expiration: '',
        update: false
    };
    $scope.profileCards = [
        {
            cardCustomName: 'Visa',
            cardHolder: 'John Doe',
            number: 'xxxx-xxxx-6764',
            expiration: '06/55'
        },
        {
            cardCustomName: 'Chase',
            cardHolder: 'John Doe',
            number: 'xxxx-xxxx-4142',
            expiration: '12/34'
        },
        {
            cardCustomName: 'American Express',
            cardHolder: 'John Doe',
            number: 'xxxx-xxxx-2345',
            expiration: '10/15'
        },
        {
            cardCustomName: 'Visa Card',
            cardHolder: 'John Doe',
            number: 'xxxx-xxxx-5252',
            expiration: '01/16'
        },
        {
            cardCustomName: 'Citi Bank',
            cardHolder: 'John Doe',
            number: 'xxxx-xxxx-7558',
            expiration: '05/99'
        },
        {
            cardCustomName: 'Bank of America',
            cardHolder: 'John Doe',
            number: 'xxxx-xxxx-2342',
            expiration: '09/41'
        },
    ]
    $scope.user = {
        firstName: 'Paul',
        lastName: 'Brimley'
    };

    $scope.billingInfo.map(function (info) {
        info.date = new Date(info.month + ' 1, ' + info.year);
    });

    $scope.cancelService = function () {
        swal({
            title: "Are you sure?",
            text: "This will cancel this service!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Cancel Service",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true },
            function (isConfirm) {
                if (isConfirm) {
                    swal("Canceled!", "Your has been canceled.", "success");
                }
            });
    };

    $scope.createUpdateCard = function (card) {
        if (card) {
            $scope.cardToEdit = angular.copy(card);
            $scope.cardToEdit.update = true
        } else {
            $scope.cardToEdit = {
                company: '',
                number: '',
                expiration: '',
                update: false
            };
        }
        $('#createUpdateCardModal').modal('show');
    };

    $scope.removeCard = function (card) {
        swal({
            title: "Are you sure?",
            text: "This will permanently remove this card from the system!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Remove",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true },
            function (isConfirm) {
                if (isConfirm) {
                    for (var i = $scope.profileCards.length - 1; i >= 0; i--) {
                        if (card.number === $scope.profileCards[i].number) {
                            $scope.profileCards.splice(i, 1);
                            $scope.$apply();
                        };
                    }
                    swal("Removed!", "Your card has been removed from the system.", "success");
                }
            });
    };

    $scope.saveCard = function () {
        var warning = [];
        if (!$scope.cardToEdit.cardCustomName) {
            warning.push('Please enter a Custom Card Name to save this card.');
        }
        if (!$scope.cardToEdit.cardHolder) {
            warning.push('Please enter a Company to save this card.');
        }
        if (!$scope.cardToEdit.number) {
            warning.push('Please enter a Number to save this card.');
        }
        if (!$scope.cardToEdit.expiration) {
            warning.push('Please enter an Expiration to safe this card.');
        }
        if (warning.length > 0) {
            warning.map(function (error, index) {
                setTimeout(function (error) {
                    toastr.error(error);
                }, (index * 100), error);
            });
            return false;
        }
        $('#createUpdateCardModal').modal('hide');
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to save this card information?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#62cb31",
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: true },
            function (isConfirm) {
                if (isConfirm) {
                    var checker = false;
                    for (var i = $scope.profileCards.length - 1; i >= 0; i--) {
                        if ($scope.cardToEdit.number === $scope.profileCards[i].number) {
                            $scope.profileCards[i] = $scope.cardToEdit;
                            checker = true;
                            $scope.$apply();
                        };
                    }
                    if (!checker) {
                        $scope.profileCards.push($scope.cardToEdit);
                        $scope.$apply();
                    }
                } else {
                    $('#createUpdateCardModal').modal('show');
                }
            });
    };

    $scope.updateUserName = function () {
        var warning = [];
        if (!$scope.user.firstName) {
            warning.push('Please enter a first name to update your profile name.');
        }
        if (!$scope.user.lastName) {
            warning.push('Please enter a last name to update your profile name.');
        }
        if (warning.length > 0) {
            warning.map(function (error, index) {
                setTimeout(function (error) {
                    toastr.error(error);
                }, (index * 100), error);
            });
            return false;
        }
        toastr.success('Updated profile name.');
    };

    $scope.viewBillingPDF = function (info) {
        window.open(info.pdf);
    };

})