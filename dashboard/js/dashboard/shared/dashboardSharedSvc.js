angular.module('homer').service('dashboardSharedSvc', function($http) {
	
	this.platformStrategies = [
		{
			strategy: 'Facebook',
			stats: ['Posts', 'Likes', 'Comments', 'Leads']
		},
		{
			strategy: 'Twitter',
			stats: ['Tweets', 'Re-Tweets', 'Leads']
		},
		{
			strategy: 'LinkedIn',
			stats: ['Posts', 'Shares', 'Comments', 'Leads']
		},
		{
			strategy: 'Pinterest',
			stats: ['Pins', 'Re-pins', 'Comments', 'Leads']
		}
	]

	this.FacebookPosts = [
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://wallpapercliff.com/wp-content/uploads/2016/03/Cool-Abstract-Wallpapers-4.jpg',
			postText: 'This is sush a cool tiger!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://www.wallpapereast.com/static/images/wallpaper-cool-hd-1080p.jpg',
			postText: 'Have you seen this?'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://rife.tech/wp-content/uploads/2016/03/cool-car-wallpapers-for-ipad.jpg',
			postText: 'Wish I had one...'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://walpaperfix.com/wp-content/uploads/2016/03/Cool-Wallpapers-Photos-6075h-1.jpg',
			postText: 'Wish I was one!'
		}
	]

	this.PinterestPosts = [
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://wallpapercliff.com/wp-content/uploads/2016/03/Cool-Abstract-Wallpapers-4.jpg',
			postText: 'This is sush a cool tiger!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://www.wallpapereast.com/static/images/wallpaper-cool-hd-1080p.jpg',
			postText: 'Have you seen this?'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://rife.tech/wp-content/uploads/2016/03/cool-car-wallpapers-for-ipad.jpg',
			postText: 'Wish I had one...'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://walpaperfix.com/wp-content/uploads/2016/03/Cool-Wallpapers-Photos-6075h-1.jpg',
			postText: 'Wish I was one!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://wallpapercliff.com/wp-content/uploads/2016/03/Cool-Abstract-Wallpapers-4.jpg',
			postText: 'This is sush a cool tiger!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://www.wallpapereast.com/static/images/wallpaper-cool-hd-1080p.jpg',
			postText: 'Have you seen this?'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://rife.tech/wp-content/uploads/2016/03/cool-car-wallpapers-for-ipad.jpg',
			postText: 'Wish I had one...'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://walpaperfix.com/wp-content/uploads/2016/03/Cool-Wallpapers-Photos-6075h-1.jpg',
			postText: 'Wish I was one!'
		}
	]

	this.LinkedInPosts = [
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://wallpapercliff.com/wp-content/uploads/2016/03/Cool-Abstract-Wallpapers-4.jpg',
			postText: 'This is sush a cool animal!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://www.wallpapereast.com/static/images/wallpaper-cool-hd-1080p.jpg',
			postText: 'Have you seen this?'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://rife.tech/wp-content/uploads/2016/03/cool-car-wallpapers-for-ipad.jpg',
			postText: 'Wish I had one...'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://walpaperfix.com/wp-content/uploads/2016/03/Cool-Wallpapers-Photos-6075h-1.jpg',
			postText: 'Wish I was one!'
		},{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://wallpapercliff.com/wp-content/uploads/2016/03/Cool-Abstract-Wallpapers-4.jpg',
			postText: 'This is sush a cool tiger!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://www.wallpapereast.com/static/images/wallpaper-cool-hd-1080p.jpg',
			postText: 'Have you seen this?'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://rife.tech/wp-content/uploads/2016/03/cool-car-wallpapers-for-ipad.jpg',
			postText: 'Wish I had one...'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://walpaperfix.com/wp-content/uploads/2016/03/Cool-Wallpapers-Photos-6075h-1.jpg',
			postText: 'Wish I was one!'
		},{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://wallpapercliff.com/wp-content/uploads/2016/03/Cool-Abstract-Wallpapers-4.jpg',
			postText: 'This is sush a cool tiger!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://www.wallpapereast.com/static/images/wallpaper-cool-hd-1080p.jpg',
			postText: 'Have you seen this?'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://rife.tech/wp-content/uploads/2016/03/cool-car-wallpapers-for-ipad.jpg',
			postText: 'Wish I had one...'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://walpaperfix.com/wp-content/uploads/2016/03/Cool-Wallpapers-Photos-6075h-1.jpg',
			postText: 'Wish I was one!'
		}
	]

	this.TwitterPosts = [
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://wallpapercliff.com/wp-content/uploads/2016/03/Cool-Abstract-Wallpapers-4.jpg',
			postText: 'This is sush a cool tiger!'
		},
		{
			userImg: 'https://en.gravatar.com/userimage/101851250/ca7b25b06b151189f8b583ebf540ab8a.jpg',
			userName: 'Paul Brimley',
			postImg: 'http://www.wallpapereast.com/static/images/wallpaper-cool-hd-1080p.jpg',
			postText: 'Have you seen this?'
		}
	]
		
	
})