document.addEventListener("DOMContentLoaded", function () {

    const savedUser =
        JSON.parse(
            localStorage.getItem("sirThoUser")
        );


    const loggedIn =
        localStorage.getItem(
            "sirThoLoggedIn"
        );


    /*
       Find the existing Login button
       in your navbar.
    */

    const loginButton =
        document.querySelector(
            ".login-btn"
        );


    /* =========================
       USER IS LOGGED IN
    ========================= */

    if (
        savedUser &&
        loggedIn === "true" &&
        loginButton
    ) {

        /*
           Change Login button
           into user's greeting.
        */

        loginButton.textContent =
            "Hi, " +
            savedUser.name +
            " 👋";


        /*
           Don't open login page
           when already logged in.
        */

        loginButton.href = "#";


        /*
           Clicking greeting logs out.
        */

        loginButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const logout =
                    confirm(
                        "Do you want to logout?"
                    );


                if (logout) {

                    localStorage.removeItem(
                        "sirThoLoggedIn"
                    );


                    window.location.reload();

                }

            }
        );

    }

});