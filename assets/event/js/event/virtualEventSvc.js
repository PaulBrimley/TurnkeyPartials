angular.module('eventPlanner').service('virtualEventSvc', virtualEventSvc)

function virtualEventSvc($q, $http) {


    function get(url) {
        return $http({
            method: 'GET',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            'url': url
        }).then(function (response) {
            return response.data;
        }).catch(function (err) {
            return err.data;
        });
    }
    this.get = get;

    var self = this;
    var dateObj = new Date();   

    AWS.config.region = 'us-west-2';
    var ddb = false;

    this.getAWSAccess = function() {
        return $http.get('/event/Index/getAWSAccess').then(function(response) {
            AWS.config.update({
                accessKeyId: response.data.accessKeyId,
                secretAccessKey: response.data.secretAccessKey
            });
            ddb = new AWS.DynamoDB.DocumentClient();
            return true;
        })
    }
    
    this.addProdToCart = function (userId, sessionId, productId, quantity) {
        return $http.get('/event/Index/addProductToCart?&userId=' + userId + '&sessionId=' + sessionId + '&productId=' + productId + '&quantity=' + quantity).then(function (response) {
            return response.data;
        });
    }

    this.addUser = function(object) {
        return $http.post('event/Index/addUser', object).then(function(response) {
            return response.data;
        });
    }

    this.createSession = function (userId, liveEventId, sessionId) {

        var dfd = $q.defer();
        ddb.put({
            TableName: 'Sessions',
            Item: {
                entryId: userId + '_' + new Date().getTime(),
                liveEventId: liveEventId,
                sessionId: sessionId,
                entryKey: 'category',
                entryValue: 'All',
                id: '-99999',
                description: 'All Categories',
                videoTimeStamp: 0
            },
        }, function (err, data) {
            if (err) {
                console.log('err in creating session one', err);
                dfd.reject(err);
            }
            else {
                dfd.resolve(data);
            }
        })
        return dfd.promise;
    }


    this.getSessionProducts = function (liveEventId, sessionId, timeStamp) {
        var dfd = $q.defer();
        ddb.query({
            TableName: 'Sessions',
            IndexName: 'liveEventId-index',
            KeyConditionExpression: 'liveEventId = :liveEventId',
            FilterExpression: 'videoTimeStamp <= :videoTimeStamp and entryKey = :entryKey',
            ExpressionAttributeValues: {
                ':entryKey': 'product',
                ':liveEventId': liveEventId,
                ':videoTimeStamp': timeStamp
            }
        }, function (err, data) {
            if (err) {
                console.log('error in get session', err);
                dfd.reject(err);
            }
            else dfd.resolve(data.Items);
        });
        return dfd.promise;
    }

    this.getSessionCategories = function (liveEventId, sessionId, timeStamp) {
        var dfd = $q.defer();
        ddb.query({
            TableName: 'Sessions',
            IndexName: 'liveEventId-index',
            KeyConditionExpression: 'liveEventId = :liveEventId',
            FilterExpression: 'videoTimeStamp <= :videoTimeStamp and entryKey = :entryKey',
            ExpressionAttributeValues: {
                ':entryKey': 'category',
                ':liveEventId': liveEventId,
                ':videoTimeStamp': timeStamp
            }
        }, function (err, data) {
            if (err) {
                console.log('error in get session', err);
                dfd.reject(err);
            }
            else dfd.resolve(data.Items);
        });
        return dfd.promise;
    }

    this.getSessionMessages = function (liveEventId, sessionId) {
        var dfd = $q.defer();
        var params = {
            TableName: 'Messages',
            IndexName: 'liveEventId-index',
            KeyConditionExpression: 'liveEventId = :liveEventId',
            ExpressionAttributeValues: {
                ':liveEventId': liveEventId,
            }
        }
        ddb.query(params, function (err, data) {
            if (err) {
                console.log('error in get session messages', err);
                dfd.reject(err);
            }
            else {
                var categoryNameHolder = '';
                var messageArray = data.Items.map(function (message) {
                    categoryNameHolder = message.categoryName;
                    var newTimestamp = new Date(message.timeStamp);
                    var messageObj = {
                        liveEventId: message.liveEventId,
                        videoTimestamp: message.videoTimestamp,
                        videoTitle: message.videoTitle,
                        messageId: message.messageId,
                        sessionId: message.sessionId,
                        timeStamp: newTimestamp,
                        categoryName: message.categoryName,
                        message: message.message,
                        userName: message.userName
                    }
                    return messageObj;
                })
                dfd.resolve(messageArray);
            }
        });
        return dfd.promise;
    }

    this.getUserCart = function (userId, sessionId) {
        return $http.get('/event/Index/getCart?sessionId=' + sessionId + '&userId=' + userId).then(function (response) {
            self.cart = response.data.cartCount;
            return response.data.cart;
        });
    }

    this.getUserCartCount = function (userId, sessionId) {
        return $http.get('/event/Index/getCartCount?sessionId=' + sessionId + '&userId=' + userId).then(function (response) {
            return response.data.cartCount;
        });
    }

    this.sendMessage = function (messageObj) {
        var dfd = $q.defer();
        ddb.put({
            TableName: 'Messages',
            Item: messageObj
        }, function (err, data) {
            if (err) {
                console.log('err', err);
                dfd.reject(err);
            }
            else dfd.resolve(data);
        })
        return dfd.promise;
    }

    this.updateSessionCategories = function (userId, liveEventId, sessionId, category) {
        var dfd = $q.defer();

        ddb.put({
            TableName: 'Sessions',
            Item: {
                liveEventId: liveEventId,
                entryId: userId + '_' + new Date().getTime(),
                sessionId: sessionId,
                entryKey: 'category',
                entryValue: category.name,
                id: category.id.toString(),
                description: category.description,
                videoTimeStamp: category.videoTimestamp,
                url: category.url
            },
        }, function (err, data) {
            if (err) {
                console.log('err in adding category', err);
                dfd.reject(err);
            }
            else {
                dfd.resolve(data);
            }
        })
        return dfd.promise;
    }

    this.updateSessionProducts = function (userId, liveEventId, sessionId, product) {
        var dfd = $q.defer();

        ddb.put({
            TableName: 'Sessions',
            Item: {
                liveEventId: liveEventId,
                entryId: userId + '_' + new Date().getTime(),
                sessionId: sessionId,
                entryKey: 'product',
                entryValue: product.name,
                id: product.id.toString(),
                description: product.description,
                price: product.price,
                currentPrice: product.price,
                videoTimeStamp: product.videoTimestamp,
                url: product.url
            },
        }, function (err, data) {
            if (err) {
                console.log('err in adding product', err);
                dfd.reject(err);
            }
            else {
                $http.post('/event/Index/addProductToSession?sessionId=' + sessionId + '&productId=' + product.id)
                .then(function(response) {
                    dfd.resolve(data);
                }).catch(function(err) {
                    dfd.reject(err);
                });
            }
        })
        return dfd.promise;
    }

}