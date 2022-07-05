sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "./BaseController",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, BaseController, MessageToast) {
        "use strict";

        return Controller.extend("customauth.customauth.controller.Login", {
            onInit: async function () {
                var oComponent = this.getOwnerComponent();
                this.fbModel = await oComponent.getModel("firebase");
                this.oModel = await oComponent.getModel();
                this.oRouter = oComponent.getRouter();
            },

            onGoogleLoginBtnPress: async function () {
                var that = this;

                firebase.auth().onAuthStateChanged((userCred) => {
                    if (userCred) {
                        userCred.getIdToken().then((token) => {
                            that.fbModel.setProperty("/token", token);
                        });
                    }
                });

                const userCred = await firebase.auth()
                    .signInWithPopup(new firebase.auth.GoogleAuthProvider());

                if (userCred) {
                    const data = JSON.stringify({ idToken: that.fbModel.getProperty("/token") || userCred.credential.idToken });
                    let sURLPath = "/sessionLogin";
                    $.ajax({
                        url: sURLPath,
                        type: 'post',
                        data: data,
                        headers: {
                            "Content-Type": "application/json",
                            "CSRF-Token": BaseController.getCookie("XSRF-TOKEN")
                        },
                        success: function (data) {
                            that.fbModel.setProperty("/auth", true);
                            that.fbModel.setProperty("/userInformation", userCred);
                            that.oModel.setHeaders({ "Content-Type": "application/json", "X-CSRF-Token": BaseController.getCookie("XSRF-TOKEN") });
                            that.oRouter.navTo("Overview");
                        },
                        error: function (err) {
                            that.fbModel.setProperty("/auth", false);
                            that.fbModel.setProperty("/userInformation", null);
                            MessageToast.show("Login Failed. Please try again")
                        }
                    });
                }
            }
        });
    });
