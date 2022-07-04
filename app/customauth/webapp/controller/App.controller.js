sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("customauth.customauth.controller.App", {
            onInit: async function () {
                this.fbModel = await this.getOwnerComponent().getModel("firebase");
            },

            onGoogleBtnPress: async function () {
                var that = this;
                const userCred = await firebase.auth()
                    .signInWithPopup(new firebase.auth.GoogleAuthProvider());

                if (userCred) {
                    that.fbModel.setProperty("/auth", true);
                    that.fbModel.setProperty("/userInformation", userCred);
                    window.localStorage.setItem('auth', 'true');
                }

                firebase.auth().onAuthStateChanged((userCredd) => {
                    if (userCredd) {
                        that.fbModel.setProperty("/auth", true);
                        userCredd.getIdToken().then((token) => {
                            that.fbModel.setProperty("/token", token);
                            window.localStorage.setItem('auth', 'true');
                        });
                    }
                });
            },

            onLogoutBtnPress: function () {
                window.localStorage.setItem('auth', 'false');
                this.fbModel.setProperty("/auth", false);
                this.fbModel.setProperty("/userInformation", null);
            }
        });
    });
