/* =========================================================
   SIR THO SARADHAGA
   AUTHENTICATION CONTROLLER
========================================================= */


/* =========================================================
   PROTECTED PAGES
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
   CHECK LOGIN STATUS
========================================================= */

function isUserLoggedIn() {

    return (
        localStorage.getItem("sirThoLoggedIn") === "true"
    );

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
   LOGOUT USER
========================================================= */

function logoutUser() {

    localStorage.removeItem("sirThoLoggedIn");

    window.location.href = "index.html";

}


/* =========================================================
   UPDATE NAVBAR
========================================================= */

function updateAuthUI() {

    const loginButton =
        document.getElementById("userLoginBtn");

    const userName =
        document.getElementById("loggedUserName");

    const profileButton =
        document.getElementById("studentProfileBtn");

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

        /* ---------------------------------------------
           HIDE LOGIN BUTTON
        --------------------------------------------- */

        if (loginButton) {

            loginButton.style.display = "none";

        }


        /* ---------------------------------------------
           SHOW USER NAME
        --------------------------------------------- */

        if (userName) {

            userName.textContent =
                "✨ Hi, " +
                savedUser.name +
                " 👋";

            userName.hidden = false;

            userName.style.display =
                "inline-flex";


            /* -----------------------------------------
               CLICK USER NAME → LOGOUT CONFIRMATION
            ----------------------------------------- */

            userName.onclick = function () {

                const shouldLogout =
                    confirm(
                        "Do you want to logout?"
                    );


                if (shouldLogout) {

                    logoutUser();

                }

            };

        }


        /* ---------------------------------------------
           SHOW STUDENT PROFILE
        --------------------------------------------- */

        if (profileButton) {

            profileButton.hidden = false;

            profileButton.style.display =
                "inline-flex";

            profileButton.href =
                "student-profile.html";

        }

    }


    /* =====================================================
       USER IS NOT LOGGED IN
    ===================================================== */

    else {

        /* ---------------------------------------------
           SHOW LOGIN
        --------------------------------------------- */

        if (loginButton) {

            loginButton.style.display =
                "inline-block";

            loginButton.textContent =
                "Login";

            loginButton.href =
                "login.html";

        }


        /* ---------------------------------------------
           HIDE USER NAME
        --------------------------------------------- */

        if (userName) {

            userName.hidden = true;

            userName.style.display =
                "none";

            userName.onclick = null;

        }


        /* ---------------------------------------------
           HIDE STUDENT PROFILE
        --------------------------------------------- */

        if (profileButton) {

            profileButton.hidden = true;

            profileButton.style.display =
                "none";

        }

    }

}


/* =========================================================
   LOGIN REQUIRED MESSAGE
========================================================= */

function showLoginRequired(event) {

    event.preventDefault();

    const shouldLogin =
        confirm(
            "🔐 Login Required\n\n" +
            "Please login to access this content.\n\n" +
            "Click OK to login."
        );


    if (shouldLogin) {

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   PROTECT LINKS
========================================================= */

function protectLinks() {

    const allLinks =
        document.querySelectorAll("a[href]");


    allLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        /* ---------------------------------------------
           IGNORE EMPTY / NORMAL LINKS
        --------------------------------------------- */

        if (
            href === "#" ||
            href.startsWith("#") ||
            href.startsWith("javascript:")
        ) {

            return;

        }


        /* ---------------------------------------------
           CHECK PROTECTED PAGES
        --------------------------------------------- */

        const isProtectedPage =
            PROTECTED_PAGES.some(function (page) {

                return (
                    href === page ||
                    href.startsWith(page + "?")
                );

            });


        /* ---------------------------------------------
           PROTECT DAILY VIDEO CARDS
        --------------------------------------------- */

        const isDailyVideo =
            link.classList.contains(
                "daily-video-card"
            );


        /* ---------------------------------------------
           APPLY LOGIN PROTECTION
        --------------------------------------------- */

        if (
            (isProtectedPage || isDailyVideo) &&
            !isUserLoggedIn()
        ) {

            link.addEventListener(
                "click",
                showLoginRequired
            );

        }

    });

}


/* =========================================================
   PROTECT CURRENT PAGE
========================================================= */

function checkCurrentPage() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    /* ---------------------------------------------
       IGNORE EMPTY PAGE NAME
    --------------------------------------------- */

    if (!currentPage) {
        return;
    }


    /* ---------------------------------------------
       CHECK WHETHER CURRENT PAGE IS PROTECTED
    --------------------------------------------- */

    const isProtectedPage =
        PROTECTED_PAGES.some(function (page) {

            return (
                currentPage === page
            );

        });


    /* ---------------------------------------------
       REDIRECT IF NOT LOGGED IN
    --------------------------------------------- */

    if (
        isProtectedPage &&
        !isUserLoggedIn()
    ) {

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   RUN AUTHENTICATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Check protected page */
        checkCurrentPage();


        /* Update navbar */
        updateAuthUI();


        /* Protect links */
        protectLinks();

    }
);