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
        this.receivedEvent('deviceready');        
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        try {
            //console.log('Received Event: ' + EletropayPrinterCordovaPlugin.AndroidToast);    

            var androidToast = new EletroPayPrinterService();
            androidToast.start(
                function(msg) {
                    console.log(msg);
                    androidToast.add_command(["Line A \n Line B \n\n\n Line C\n\n\n..........", 24, 0, 0],
                        function(msg) {
                            console.log(msg);
                            androidToast.printer(
                                function(msg) {
                                    console.log(msg);                                  
                                },
                                function(err) {
                                    console.log(err);
                                }
                            );
                        },
                        function(err) {
                            console.log(err);
                        }
                    );
                },
                function(err) {
                    console.log(err);
                }
            );

            // setTimeout(function(){ 
            //     androidToast.show(
            //         'This is 2 msg',
            //         function(msg) {
            //             console.log(msg);
            //         },
            //         function(err) {
            //             console.log(err);
            //         }
            //     );
            //  }, 3000);

        } catch (error) {
            console.log('Received error: ' + error);
        }
        
    }
};

app.initialize();