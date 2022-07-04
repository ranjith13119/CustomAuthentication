sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "customauth/customauth/model/models",
    "./firebase/Firebase"
],
    function (UIComponent, Device, models, Firebase) {
        "use strict";

        return UIComponent.extend("customauth.customauth.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // set Firebase Model
                this.setModel(Firebase.initializeFirebase(), "firebase");
                this.getModel("firebase").setProperty("/auth", window.localStorage.getItem('auth') === 'true');
            }
        });
    }
);