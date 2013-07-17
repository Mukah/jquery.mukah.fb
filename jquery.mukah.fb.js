function mukahFB(appId, channelUrl, status, xfbml) {

	mukahFB.appId = appId;
	mukahFB.channelUrl = channelUrl;
	mukahFB.status = status;
	mukahFB.xfbml = xfbml;

	mukahFB.fql = function(query, callback) {
		$.getJSON('https://api.facebook.com/method/fql.query?format=json&query=' + encodeURIComponent(query), callback);
	};

	this.ready = function(callback) {
		window.fbAsyncInit = function() {			
			FB.init({
				appId: mukahFB.appId,
				channelUrl: mukahFB.channelUrl,
				status: mukahFB.status,
				xfbml: mukahFB.xfbml
			});

			$.prototype.fbLogin = function(success, fail) {
				this.click(function(){
					FB.login(function(response) {
						if (response.authResponse) {
							success(response);
						} else {
							fail(response);
						}
					});
				})
			}

			$.prototype.fbLogout = function(callback) {
				this.click(function(){
					FB.logout(function(response) {
						callback(response);
					});
				})
			}

			mukahFB.loginStatus = function(callback) {
				FB.getLoginStatus(callback);
			}

			callback();
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "http://connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
}

