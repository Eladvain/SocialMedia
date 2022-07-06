// const auth = require("./auth");
class SecurityHelper {

    static async fetch_token(href) {
        console.log("SecurityHelper: fetch_token");
        let response;
        // console.log("fetch_token", href);
        try {
            response = await fetch('/auth/verify-token', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
        const is_token_valid_parsed = await response.json();
        const is_token_valid = is_token_valid_parsed.valid_token;
        //console.log("fetch_token", is_token_valid);
        if (!is_token_valid) {
            //ovirride the token cookie
            //console.log("login");
            return "/login.html";
        } else {
            //console.log("samePage");
            return href;
        }
    }
    /*
        static async validat_cookie(cookie) {
            const cookieHeader_pair = (cookie?.split("="));
            if (typeof cookieHeader_pair !== 'undefined' && cookieHeader_pair[0] !== 'access_token' || typeof cookieHeader_pair === 'undefined') {
                res.send({ msg: "please login" }).status(403);
                return false;
            }
            return true;
        }
        */
}