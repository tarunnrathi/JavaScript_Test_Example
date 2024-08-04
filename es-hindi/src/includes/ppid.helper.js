const { getCookie, setCookie } = require("./GoogleOneTap.util");
const { decryptToken } = require("./userProfile.utils");

const ppid_cookie_name = 'NW18_PPID_LOGIC';

/* Generate PPID function -> Start */
function generate_dfp_ppid() {
    const ppid_cookie_object = getCookie(ppid_cookie_name);	/* Get Cookie Value */
    /* Checks for Cookie is exists OR not? */
    if (ppid_cookie_object == undefined || ppid_cookie_object == '' || ppid_cookie_object == null) {
        const ppid_normal_user = 'normaluser' + Math.floor(15**13 + Math.random() * 14 * 15**13) + 'nw18ids';
        setCookie(ppid_cookie_name, ppid_normal_user, 180);	/* Create Cookie */
        // var ppid_cookie_object = getCookie( ppid_cookie_name );	/* Get Cookie Value */

    }
}
function generate_dfp_ppid_login_user() {

    const token = getCookie("g_token");
    // console.log("desdesdes", token)
    const userDetails = decryptToken(token);
    const userId = userDetails?.user_id;
    const randomStrings = randomString(8, 8);
    const ppid_login_user = userId + randomStrings;
    setCookie(ppid_cookie_name, ppid_login_user, 180);	/* Create Cookie */

}

function set_ppid() {
    const ppid_cookie_object = getCookie(ppid_cookie_name);	/* Get Cookie Value */

    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(function() {
        // Double Click AD Variables
        console.log(ppid_cookie_object);
        window.googletag.pubads().setPublisherProvidedId(`${ppid_cookie_object}`);
        window.googletag.enableServices();
        //console.log("succesfully set ppid")

    });
}

const randomString = (len, bits) => {
    bits = bits || 36;
    let outStr = "", newStr;
    while (outStr.length < len) {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
};

/* End <- Generate PPID function */

module.exports = { generate_dfp_ppid, generate_dfp_ppid_login_user, set_ppid };
