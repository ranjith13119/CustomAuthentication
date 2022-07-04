sap.ui.define([
    "sap/ui/model/json/JSONModel",
], function (JSONModel) {
    "use strict";

    // Firebase-config retrieved from the Firebase-console
    const firebaseConfig = {
        apiKey: "AIzaSyDT509pgwtJz6fmFBYBbr0tEp1ft6UB_9U",
        authDomain: "customauthcapapp.firebaseapp.com",
        projectId: "customauthcapapp",
        storageBucket: "customauthcapapp.appspot.com",
        messagingSenderId: "392049199261",
        appId: "1:392049199261:web:50e4fc43ac0bba71eaac74"
    };

    return {
        initializeFirebase: function () {
            // Initialize Firebase with the Firebase-config
            firebase.initializeApp(firebaseConfig);

            // Create a Firestore reference
            const firestore = firebase.firestore();

            // Firebase services object
            const oFirebase = {
                firestore: firestore
            };

            // Create a Firebase model out of the oFirebase service object which contains all required Firebase services
            var fbModel = new JSONModel(oFirebase);

            // Return the Firebase Model
            return fbModel;
        }
    };
});