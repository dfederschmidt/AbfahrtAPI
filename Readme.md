# AbfahrtAPI

This is a small API written in node.js which provides access to the current departure times
of all bus stations in Tübingen.

## API endpoints

    GET /stations                   #Returns a JSON containing all stations.
    GET /stations/{id}              #Returns a JSON containing one station
    GET /stations/{id}/departures   #Returns an JSON array with the next departures

