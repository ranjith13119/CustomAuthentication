// eslint-disable-next-line strict
"use strict";

sap.ui.define(["sap/m/MessageToast"], (MessageToast) => ({

    async isAuthorized(oModel) {
        try {
            // To Fetch the Firebase user details 
            await new Promise((resolve, reject) => {
                oModel.setHeaders({ "Content-Type": "application/json", "X-CSRF-Token": this.getCookie("XSRF-TOKEN") });
                oModel.callFunction("/checkSession", {
                    "method": "GET",
                    success: function () {
                        MessageToast.show("Successfully Authenticated!");
                        resolve(true);
                    },
                    error: function () {
                        reject(false);
                    }
                });
            })

        } catch (err) {
            return false;
        }
    },

    // To get the CSRF-TOKEN from the local cookies
    getCookie: function (cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res
    }
}));