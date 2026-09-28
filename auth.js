/* =========================================================
   SIR THO SARADHAGA - AUTHENTICATION SYSTEM
========================================================= */


/* =========================================================
   PAGES THAT REQUIRE LOGIN
========================================================= */

const PROTECTED_PAGES = [
    "videos.html",
    "subjects.html",
    "subject-notes.html",
    "quiz.html",
    "ask-question.html",
    "student-profile.html"
];


/* =========================================================
   CHECK WHETHER USER IS LOGGED IN
========================================================= */

function isUserLoggedIn() {

    return localStorage.getItem("sirThoLoggedIn") === "true";

}


/* =========================================================
   GET SAVED USER
========================================================= */

function getSavedUser() {

    try {

        return JSON.parse(
            localStorage.getItem("sirThoUser")
        );

    } catch (error) {

        return null;

    }

}


/* =========================================================
   PROTECT CURRENT PAGE
========================================================= */

function requireLogin() {

    if (!isUserLoggedIn()) {

        window.location.replace("login.html");

    }

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    localStorage.removeItem("sirThoLoggedIn");

    window.location.href = "index.html";

}


/* =========================================================
   UPDATE LOGIN / USERNAME
========================================================= */

function updateAuthUI() {

    const loginButton =
        document.getElementById("userLoginBtn");

    const logoutButton =
        document.getElementById("logoutBtn");


    if (!loginButton) {

        return;

    }


    const loggedIn =
        isUserLoggedIn();

    const savedUser =
        getSavedUser();


    /* =====================================================
       USER IS LOGGED IN
    ===================================================== */

    if (
        loggedIn &&
        savedUser &&
        savedUser.name
    ) {

        loginButton.textContent =
            "✨ Hi, " + savedUser.name;

        loginButton.href =
            "student-profile.html";

        loginButton.classList.add(
            "logged-in-user"
        );


        if (logoutButton) {

            logoutButton.hidden = false;

            logoutButton.onclick =
                logoutUser;

        }

    }


    /* =====================================================
       USER IS NOT LOGGED IN
    ===================================================== */

    else {

        loginButton.textContent =
            "Login";

        loginButton.href =
            "login.html";

        loginButton.classList.remove(
            "logged-in-user"
        );


        if (logoutButton) {

            logoutButton.hidden = true;

        }

    }

}


/* =========================================================
   PROTECT LINKS
========================================================= */

function protectLinks() {

    const protectedPages = [

        "videos.html",
        "subjects.html",
        "subject-notes.html",
        "quiz.html",
        "ask-question.html",
        "student-profile.html"

    ];


    document.querySelectorAll("a").forEach(
        function (link) {

            const href =
                link.getAttribute("href") || "";


            const isProtectedLink =
                protectedPages.some(
                    function (page) {

                        return href
                            .toLowerCase()
                            .startsWith(page);

                    }
                );


            if (!isProtectedLink) {

                return;

            }


            link.addEventListener(
                "click",
                function (event) {

                    if (!isUserLoggedIn()) {

                        event.preventDefault();

                        window.location.href =
                            "login.html";

                    }

                }
            );

        }
    );

}


/* =========================================================
   PROTECT CURRENT PAGE
========================================================= */

function checkCurrentPage() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (
        PROTECTED_PAGES.includes(currentPage) &&
        !isUserLoggedIn()
    ) {

        window.location.replace(
            "login.html"
        );

    }

}


/* =========================================================
   HIDE VIDEO STRIP WHEN LOGGED OUT
========================================================= */

function protectDailyVideos() {

    const dailyStrip =
        document.querySelector(
            ".daily-videos-strip"
        );


    if (
        dailyStrip &&
        !isUserLoggedIn()
    ) {

        dailyStrip.style.display =
            "none";

    }

}


/* =========================================================
   START AUTHENTICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkCurrentPage();

        updateAuthUI();

        protectLinks();

        protectDailyVideos();

    }
);