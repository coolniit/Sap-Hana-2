/*

   Copyright 2016 SAP Mentors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/

function prepareRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    xhr.setRequestHeader("X-CSRF-Token", csrfToken);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    return xhr;
}

function createEvent(Location, EventDate, StartTime, EndTime) {
    var create = {
        "ID": eventID,
        "Location": Location,
        "EventDate": EventDate,
        "StartTime": StartTime,
        "EndTime": EndTime,
        "MaxParticipants": 80,
        "HomepageURL": null
    };
    var xhr = prepareRequest("POST", "/com/sap/sapmentors/sitreg/odataorganizer/service.xsodata/Events");
    xhr.send(JSON.stringify(create));
    return xhr;
}

function registerAsOrganizer(UserName) {
    var register = {
        "UserName"           : UserName,
        "Status"             : "P", // Pending
	    "RequestTimeStamp"   : "/Date(1475942400000)/",
	    "StatusSetTimeStamp" : "/Date(1475942400000)/",
	    "History.CreatedBy"  : UserName,
	    "History.CreatedAt"  : "/Date(1475942400000)/",
	    "History.ChangedBy"  : UserName,
	    "History.ChangedAt"  : "/Date(1475942400000)/"
    };
    var xhr = prepareRequest("POST", "/com/sap/sapmentors/sitreg/odataparticipant/service.xsodata/RegisterAsOrganizer");
    xhr.send(JSON.stringify(register));
    return xhr;
}

function addCoOrganizer(_EventID, _UserName) {
    var create = {
        "EventID": _EventID,
        "UserName": _UserName,
        "Active": "Y"
    };
    var xhr = prepareRequest("POST", "/com/sap/sapmentors/sitreg/odataorganizer/service.xsodata/CoOrganizers");
    xhr.send(JSON.stringify(create));
    return xhr;
}

function updateEvent(url) {
    var xhr = prepareRequest("PATCH", url);
    var change = {
        "MaxParticipants": MaxParticipants
    };
    xhr.send(JSON.stringify(change));
    return xhr;
}
