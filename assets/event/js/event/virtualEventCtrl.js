angular.module('eventPlanner').controller('virtualEventCtrl', virtualEventCtrl);


function virtualEventCtrl($scope, $sce, $timeout, virtualEventSvc, videoService) {

    virtualEventSvc.getAWSAccess().then(function(response) {
        if (response) {
            moment.locale('en', {
                relativeTime: {
                    s: function (number, withoutSuffix, key, isFuture) {
                        return '1m';
                    },
                    m: "1m",
                    mm: function (number, withoutSuffix, key, isFuture) {
                        return number + 'm';
                    },
                    h: "1h",
                    hh: function (number, withoutSuffix, key, isFuture) {
                        return number + 'h';
                    },
                    d: "1d",
                    dd: function (number, withoutSuffix, key, isFuture) {
                        return number + 'd';
                    },
                    M: "1mo",
                    MM: function (number, withoutSuffix, key, isFuture) {
                        return number + 'mo';
                    },
                    y: "1y",
                    yy: function (number, withoutSuffix, key, isFuture) {
                        return number + 'y';
                    },
                }
            });
            $scope.cart = [];
            $scope.cartCount = 0;
            $scope.categorySetupCounter = 0;
            $scope.companyView = companyView;
            $scope.currentCategory = '-99999';
            $scope.currentProduct = {};
            $scope.disableInput = true;
            $scope.furthestVideoTime = 0;
            $scope.holder = {};
            $scope.isAdmin = true;
            $scope.liveEventId = liveEventId.toString();
            $scope.loadingMessage = 'Loading messages...';
            $scope.newMessage = '';
            $scope.placeholder = 'Select a category to submit a question or comment...';
            $scope.possibleProducts = [];
            $scope.productPosition = 0;
            $scope.productPositionSetupCounter = 0;
            $scope.productQuantity = 1;
            $scope.session = {
                sessionId: sessionId.toString(),
                messages: {
                    All: [],
                    Grouped: {}
                },
                products: [],
                categories: [],
                categoryNames: []
            };
            $scope.sessionId = sessionId.toString();
            $scope.sessionObject = {
                categories: [],
                products: []
            };
            $scope.sessionSetUp = false;
            $scope.showViewCounter = false;
            $scope.tallestProduct = 0;
            $scope.userId = userId;
            $scope.userName = userName;
            $scope.videoId = videoId;
            $scope.videoTime = 0;

            for (var prop in sessionObject.products) {
                $scope.sessionObject.products.push(sessionObject.products[prop]);
            }

            $scope.possibleProducts = $scope.sessionObject.products;

            virtualEventSvc.addUser({userId: $scope.userId, liveEventId: $scope.liveEventId, sessionId: $scope.sessionId}).then(function(response) {
                console.log(response);
            })

            virtualEventSvc.getUserCartCount($scope.userId, $scope.sessionId).then(function (response) {
                $scope.cartCount = response;
                if ($scope.cartCount > 99) {
                    $('.prodCartCount').css({fontSize: '.6em', paddingTop: '3px'})
                }
            });
            
            $('.adminMenu').on('click', function () {
                $('.adminMenuContent').toggle();
                $('.addProductMenuContent').toggle();
            });

            $(document).on('click', function(e) {
                if ((typeof e.target.className === 'object' && e.target.id !== 'adminMenuHolder' && $('.adminMenuContent').is(':visible')) || (e.target.className === '' && e.target.id !== 'adminMenuHolder' && $('.adminMenuContent').is(':visible')) || (e.target.className.length > 0 && e.target.id !== 'adminMenuHolder' && e.target.className.indexOf('addProductMenuItem') === -1 && $('.adminMenuContent').is(':visible'))) {
                    $('.adminMenuContent').toggle();
                    $('.addProductMenuContent').toggle();
                }
            })

            $scope.addProductToCart = function (product) {
                if (!product.hasOwnProperty('id')) {
                    swal({
                        title: "Error!",
                        text: "Please select a product to add to your bag.",
                        type: "error",
                        allowOutsideClick: true
                    });
                    return;
                }
                virtualEventSvc.addProdToCart($scope.userId, $scope.sessionId, product.id, $scope.productQuantity).then(function (response) {
                    $scope.cartCount = response.cartCount;
                    swal({
                        title: "Success!",
                        text: "Product successfully added to bag!",
                        type: "success",
                        allowOutsideClick: true
                    });
                    if ($scope.cartCount > 99) {
                        $('.prodCartCount').css({fontSize: '.6em', paddingTop: '3px'})
                    }
                    $scope.productQuantity = 1;
                })
            }

            $scope.addProductToSession = function (product, index) {
                if (!$scope.currentProduct.hasOwnProperty('entryValue') && $scope.companyView === 'dropZone') {
                    $('.dropZoneProductHider').slideDown(1000);
                }
                product.videoTimestamp = $scope.player.getCurrentTime();
                virtualEventSvc.updateSessionProducts($scope.userId, $scope.liveEventId, $scope.sessionId, product).then(function (response) {
                    var categoryInSession = false;
                    $scope.session.categories.map(function(category) {
                        if (category.id === product.id.toString()) {
                            categoryInSession = true;
                        } else {
                            return;
                        }
                    })
                    if (!categoryInSession) {
                        virtualEventSvc.updateSessionCategories($scope.userId, $scope.liveEventId, $scope.sessionId, product);
                    }
                })
            }

            $scope.changeCategory = function (categoryId) {
                if ($scope.currentCategory === categoryId) {
                    return;
                }
                $scope.currentCategory = categoryId;
                
                for(var i = 0; i < $scope.session.categories.length; i++) {
                    if ($scope.session.categories[i].id === categoryId) {
                        $scope.session.categories[i].active = true;
                    } else {
                        $scope.session.categories[i].active = false;
                    }
                }

                if (categoryId === '-99999') {
                    $scope.placeholder = 'Select a category to submit a question or comment...';
                    $scope.disableInput = true;
                } else {
                    $scope.placeholder = 'Type your question or comment here...';
                    $scope.disableInput = false;
                }
                if (!$scope.session.messages.Grouped[categoryId]) {
                    return;
                }
                $scope.session.messages.Grouped[categoryId].viewCount = 0;
            };

            $scope.checkout = function() {
                $('#myModal13').modal('hide');
                swal({
                    title: "Checkout in progress!",
                    text: "Checkout will be completed through your back office.",
                    type: "success",
                    allowOutsideClick: true
                });
            }

            $scope.getSession = function () {
                virtualEventSvc.getSessionProducts($scope.liveEventId, $scope.sessionId, $scope.player.getCurrentTime()).then(function(response) {
                    response.map(function(product) {
                        $scope.session.products.map(function(sessionProduct) {
                            if (product.entryId === sessionProduct.entryId) {
                                sessionProduct = product;
                            }
                            if (product.entryId === $scope.currentProduct.entryId) {
                                $scope.currentProduct = product;
                            }
                        })
                    })
                    if (response && response.length > $scope.session.products.length) {
                        $scope.session.products = _.sortBy(response, 'entryId');
                        $scope.session.products.reverse();
                        $scope.currentProduct = $scope.session.products[0];
                        if ($scope.currentProduct && $scope.currentProduct.hasOwnProperty('entryValue') && $scope.companyView === 'dropZone') {
                            $('.dropZoneProductHider').slideDown(1000);
                        }
                    }  
                })
                virtualEventSvc.getSessionCategories($scope.liveEventId, $scope.sessionId, $scope.player.getCurrentTime()).then(function(response) {
                    if (response.length > 0) {
                        if (response.length > $scope.session.categories.length) {
                            $scope.session.categories = response;
                            $scope.session.categories.map(function(category) {
                                if (category.id === $scope.currentCategory) {
                                    category.active = true;
                                }
                            })
                            $scope.session.categoryNames = $scope.session.categories.map(function(category) {
                                return category.id;
                            })
                        }
                    } else {
                        if (!$scope.sessionSetUp) {
                            console.log('creating session');
                            $scope.sessionSetUp = true;
                            virtualEventSvc.createSession($scope.userId, $scope.liveEventId, $scope.sessionId).then(function (response) {
                                console.log(response);
                            });
                        }
                    }
                })
            }

            $scope.removeProduct = function(product) {
                virtualEventSvc.addProdToCart($scope.userId, $scope.sessionId, product.id, 0).then(function (response) {
                    $scope.cartCount = response.cartCount;
                    virtualEventSvc.getUserCart($scope.userId, $scope.sessionId).then(function(response) {
                        $scope.cart = response.reduce(function(prev, curr, index, array) {
                            $scope.possibleProducts.map(function(product) {
                                if (curr.productId === product.id && curr.quantity > 0) {
                                    prev.push({
                                        description: product.description,
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        quantity: curr.quantity,
                                        thumb: product.thumb,
                                        total: (product.price * curr.quantity),
                                        url: product.url
                                    })
                                }
                            })
                            return prev;
                        }, []);
                        $scope.cartTotal = 0;
                        $scope.cart.map(function(product) {
                            $scope.cartTotal += product.total;
                        })
                    })   
                })
            }

            $scope.sendMessage = function() {
                var newTimestamp = new Date();
                newTimestamp = newTimestamp.toString();
                virtualEventSvc.sendMessage({
                    liveEventId: $scope.liveEventId,
                    videoTimeStamp: $scope.player.getCurrentTime(),
                    videoTitle: $scope.player.getVideoData().title,
                    messageId: $scope.userId + '_' + new Date().getTime(),
                    categoryName: $scope.currentCategory.toString(),
                    sessionId: $scope.sessionId,
                    userId: $scope.userId,
                    userName: $scope.userName,
                    timeStamp: newTimestamp,
                    message: $scope.newMessage
                }).then(function (response) {
                    $scope.newMessage = '';
                })
            }

            $scope.setCurrentProduct = function(product) {
                $scope.currentProduct = product;
            }

            $scope.showBag = function() {
                $scope.cart = [];
                virtualEventSvc.getUserCart($scope.userId, $scope.sessionId).then(function(response) {
                    $scope.possibleProducts.map(function(product) {
                        response.map(function(cartProd) {
                            if (cartProd.productId === product.id && cartProd.quantity > 0) {
                                $scope.cart.push({
                                    description: product.description,
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    quantity: cartProd.quantity,
                                    thumb: product.thumb,
                                    total: (product.price * cartProd.quantity),
                                    url: product.url
                                })
                            }
                        })
                    })
                    $scope.cartTotal = 0;
                    $scope.cart.map(function(product) {
                        $scope.cartTotal += product.total;
                    })
                    $('#myModal13').modal('show');
                })        
            }

            $scope.updateProductQuantity = function(product) {
                virtualEventSvc.addProdToCart($scope.userId, $scope.sessionId, product.id, product.quantity).then(function (response) {
                    $scope.cartCount = response.cartCount;
                    product.total = product.price * product.quantity;
                    var sumHolder = 0;
                    $scope.cart.map(function(product) {
                        sumHolder += product.total;
                    })
                    $scope.cartTotal = sumHolder;
                })
            }

            setInterval(function () {
                if (videoService.videoReady && $scope.player.getCurrentTime() > $scope.furthestVideoTime) {
                    $scope.furthestVideoTime = $scope.player.getCurrentTime();
                }
                if (videoService.videoReady && $scope.liveEventId && $scope.sessionId) {
                    $scope.getSession();
                    virtualEventSvc.getSessionMessages($scope.liveEventId, $scope.sessionId).then(function(response) {
                        $scope.holder = _.groupBy(response, 'categoryName');
                        $scope.session.messages.All = response.reduce(function(prev, curr, index, array) {
                            if ($scope.session.categoryNames.indexOf(curr.categoryName) !== -1) {
                                prev.push(curr);
                                return prev;
                            } else {
                                return prev;
                            }
                        }, [])
                        for (i = 0; i < $scope.session.categories.length; i++) {
                            if ($scope.session.categories[i].id !== '-99999') {
                                var prop = $scope.session.categories[i].id;
                                if ($scope.session.messages.Grouped.hasOwnProperty(prop)) {
                                    if (!$scope.session.messages.Grouped[prop].messages) {
                                        $scope.session.messages.Grouped[prop].messages = [];
                                    }
                                    if ($scope.session.messages.Grouped[prop].messages && $scope.holder[prop] && $scope.session.messages.Grouped[prop].messages.length < $scope.holder[prop].length && prop !== $scope.currentCategory) {
                                        $scope.session.messages.Grouped[prop].viewCount += $scope.holder[prop].length - $scope.session.messages.Grouped[prop].messages.length;
                                    }

                                    $scope.session.messages.Grouped[prop].messages = $scope.holder[prop];
                                    if ($scope.session.messages.Grouped[prop].messages && $scope.session.messages.Grouped[prop].messages.length & prop === $scope.currentCategory) {
                                    }
                                    
                                } else {
                                    $scope.session.messages.Grouped[prop] = {
                                        messages: [],
                                        viewCount: 0
                                    }
                                }
                            }
                        }
                        for (var i = 0; i < $scope.session.categories.length; i++) {
                            if ($scope.session.messages.Grouped[$scope.session.categories[i].id] &&  $scope.session.messages.Grouped[$scope.session.categories[i].id].viewCount > 99) {
                                $('#categoryCounter' + i).css({fontSize: '.6em'});
                            }
                        }
                    })
                }
            }, 1000);
        }
    });

    

}