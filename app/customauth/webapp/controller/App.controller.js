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

        return Controller.extend("customauth.customauth.controller.App", {
            onInit: async function () {
                var oComponent = this.getOwnerComponent();
                this.fbModel = await oComponent.getModel("firebase");
                this.oModel = await oComponent.getModel();
                this.oRouter = oComponent.getRouter();
                const isAuthorized = await BaseController.isAuthorized(this.oModel);
                if (isAuthorized) {
                    this.fbModel.setProperty("/auth", true);
                    this.oRouter.navTo("Overview");
                } else {
                    this.fbModel.setProperty("/auth", false);
                    this.oRouter.navTo("login");
                }
            }
        });
    });
