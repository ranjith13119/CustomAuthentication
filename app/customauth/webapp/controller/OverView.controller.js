sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, BaseController) {
        "use strict";

        return Controller.extend("customauth.customauth.controller.OverView", {
            onInit: async function () {
                var oComponent = this.getOwnerComponent();
                this.fbModel = await oComponent.getModel("firebase");
                this.oRouter = oComponent.getRouter();
            },

            onLogoutBtnPress: function () {
                var that = this;
                let sURLPath = "/logout";
                $.ajax({
                    url: sURLPath,
                    type: 'GET',
                    headers: {
                        "CSRF-Token": BaseController.getCookie("XSRF-TOKEN")
                    },
                    success: function (data) {
                        that.fbModel.setProperty("/auth", false);
                        that.fbModel.setProperty("/userInformation", null);
                        that.oRouter.navTo("login");
                    },
                    error: function (err) {
                        that.fbModel.setProperty("/auth", true);
                        MessageToast.show("Logout Failed. Please try to logout again");
                    }
                })
            }
        });
    });
