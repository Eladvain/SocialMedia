// const auth = require("./auth");
class SecurityHelper{
  
    static async fetch_token(href)
    {
        let response;
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
        if (!is_token_valid) {
            //ovirride the token cookie
            return "/login.html";
        
        } else {
            return href;
        }
        
    }
}

    
