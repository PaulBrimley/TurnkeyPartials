angular.module('eventPlanner').service('eventSvc', function($http) {

    /**
     * Ajax Post
     * @param url
     * @param postData
     * @returns {*}
     */

    this.videoReady = false;

    function post(url,postData){
        return $http({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            'url': url,
            method: "POST",
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: postData
        }).then(function (data, status, headers, config) {
            if (typeof data.data === 'string') {
                console.log('error', data);
                return false;
            }
            // console.log('success');
            return data.data;
        }).catch(function (data, status, headers, config) {
            console.log('error', data.data, status, headers, config);
            return false;
        });
    }

    /**
     * Ajax Get
     * @param url
     * @returns {*}
     */
    function get(url){
        return $http({
            method: 'GET',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            'url': url
        }).then(function (response) {
            return response.data;
        }).catch(function (err) {
            console.log(err.data);
            return false;
        });
    }

    /**
     * Find Get
     * @param variable
     * @returns {*}
     */
    function find(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return -1;
    }

    /**
     * Events
     * @type {post}
     */
    this.post = post;
    this.get = get;
    this.find = find;

});