import getConfig from "next/config";
import { decryptToken } from "./userProfile.utils";
import { createProfile, createProfile1 } from "./cleverTap";
import { logEvent } from "./googleAnalytic";

const { publicRuntimeConfig } = getConfig();
export function googleOneTapJs() {
	//console.log("GONETAPJS")
    const wtads = document.createElement('script');
        wtads.async = true;
        wtads.type = 'text/javascript';
        wtads.src = "https://accounts.google.com/gsi/client";
        wtads.onload = function () {
            googleOneTap();
        };
        const node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(wtads, node);
}
export function googleOneTap() {
    //console.log("one tap");
    google.accounts.id.initialize({
        client_id: '189207058064-5krt6kv5harp7gbj1octltmmfurr056i.apps.googleusercontent.com',
        callback: handleResponse
    });
    google.accounts.id.prompt((notification) => {
		if (notification.isDisplayed()) {
		  // continue with another identity provider.
		  logEvent('GoogleOneTap', 'Impression', `NA`)
		}
	  });
}
export function handleResponse(res) {
	//InitiateClevertapJs();
    const params = JSON.stringify({
        "credential": res.credential,
         "domain": "11102",
		 "nw18_fp": [getCookie('_nw18_fp')]
    });
	//console.log("one tap");
	(async () => {
		await fetch(`${publicRuntimeConfig.ssoUrl}validategoogleonetaptoken`, {
		  method: 'POST', // or 'PUT'
		  headers: {
               "Content-Type": "application/json",
            },
		  body: params,
		})
		.then((response) => response.json())
		.then((data) => {
		  if(data.status==="Success")
		  {

			ga('set', 'dimension49', "Auto Sign-in");
			ga('send', 'event', 'GoogleOneTap', 'Signin Success');

			const userDetails = decryptToken(data.authenticationToken);
			const subscriptionStatus = userDetails?.subscription_status.includes(11102)?"yes":"no";
			userDetails?.createdAt === userDetails?.updatedAt?
			createProfile(userDetails?.user_id, userDetails?.email, userDetails?.name):createProfile1(userDetails?.user_id, userDetails?.email, userDetails?.name, subscriptionStatus);

			if (data.authenticationToken !== '') {
                setCookie("g_token", data.authenticationToken, 24*365);
                setCookie("g_username", data.nameStr, 1);
                setCookie("isSignedIn", true, 1);
            }
            window.location.reload();
		  }
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
        })();
}
export function setCookie(e, t, a) {
	const i = new Date;
	i.setTime(i.getTime() + a * 60 * 60 * 1e3);
	const o = "expires=" + i.toGMTString();
	document.cookie = e + "=" + t + ";" + o + ";domain=.news18.com;path=/";
}
export function getCookie(e) {
	for (let a = e + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
		for (var o = t[n];
			o.charAt(0) == " ";) o = o.substring(1, o.length);
		if (o.indexOf(a) == 0) return o.substring(a.length, o.length);
	}
	return null;
    }

export function checkUserExists(token)
{
       (async () => {
		await fetch(`${publicRuntimeConfig.ssoUrl}checkuserexists?token=${token}&domain=11102`, {
		  method: 'get', // or 'PUT'
		})
		.then((response) => response.json())
		.then((data) => {

		  if(data.status==="OK")
		  {
			if (data.tokenValid !== '') {
                setCookie("g_token", data.tokenValid, 24*365);
                setCookie("g_username", data.name, 1);
                setCookie("isSignedIn", true, 1);
            }
            window.location.reload();
		  }
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
        })();
}
export function delete_cookie(name) {
	const o = "expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie = name + "=" + null + ";" + o + ";domain=.news18.com;path=/";
}
