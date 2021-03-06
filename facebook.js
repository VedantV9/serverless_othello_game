// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1632143563747690',
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
    });
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.
    // They can be :
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into your app or not.
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is successful.
// See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    // to "insure" we get the email see : http://stackoverflow.com/questions/7820485/how-to-get-email-id-of-facebook-user-using-javascript-sdk
    FB.api('/me',
        { fields: 'name, id, email' },
        function(response) {
            console.log('Successful login for: ' + response.name);
            console.log(response.id);
            console.log(response.email);
            document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
        }
    );
}
// Here we query the Graph API to list friends who use the application
function fbFriendsAPI() {
    FB.api(
        "/me/friends",
        function (response) {
            if (response && !response.error) {
                console.log('Total friends count : '+response.summary.total_count);
                console.log('Friends who use the app : '+response.data.length);
            }
        }
    );
}