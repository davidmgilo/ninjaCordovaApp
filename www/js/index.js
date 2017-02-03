/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.logDeviceInfo();
        this.receivedEvent('deviceready');
        this.prepareNativeNotification();
        this.fastclick();
        alert('Hola que tal');
        if(navigator.vibrate){
            console.log(navigator.vibrate);
        }else {
            alert('Vibrate not supported')
        }
        this.changePicture();
        this.addLocation();
        this.addToContacts();

    },

    addToContacts : function() {
    // event.preventDefault();
        console.log('addToContacts');
        if (!navigator.contacts) {
            alert("Contacts API not supported", "Error");
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName: 'Sergi', familyName: 'Tur'};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', '679525478', false);
        phoneNumbers[1] = new ContactField('mobile', '12123123', true);
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    },

    addLocation : function() {
    //event.preventDefault();
        if(!navigator.geolocation){
            alert('Geolocation not supported');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            function(position) {
                alert(position.coords.latitude + ',' + position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    },

    changePicture: function() {
    // event.preventDefault();
    if (!navigator.camera) {
        alert("Camera API not supported", "Error");
        return;
    }
    var options =   {   quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
        encodingType: 0     // 0=JPG 1=PNG
    };

        navigator.camera.getPicture(
            function(imgData) {
                $('.media-object', this.$el).attr('src', "data:image/jpeg;base64,"+imgData);
            },
            function() {
                alert('Error taking picture', 'Error');
         },
        options);

        return false;
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    logDeviceInfo: function () {
        console.log(device)
    },

    prepareNativeNotification: function () {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        } else {
            console.log('No suportat notifications natives');
        }
    },

    fastclick: function () {
        FastClick.attach(document.body);
    }
};

app.initialize();