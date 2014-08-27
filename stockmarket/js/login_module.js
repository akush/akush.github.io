define(['js/cookie_module'], function (cookie) {

    function getUser(){
        if(typeof(Storage) !== "undefined") {
            return localStorage.getItem("user");
        } else {
            return cookie.get("user");
        }
    }

    function setUserLocal(user) {
        if(typeof(Storage) !== "undefined") {
            return localStorage.setItem("user", user);
        } else {
            return cookie.create("user", user, 10);
        }
    }

    function setUserSession(user) {
        if(typeof(Storage) !== "undefined") {
            return sessionStorage.setItem("user", user);
        } else {
            return cookie.create("user", user);
        }
    }

    return {
        get: getUser,
        setRemember: setUserLocal,
        setSession: setUserSession
    }
});
