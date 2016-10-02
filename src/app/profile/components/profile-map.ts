import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MapService} from "../service/map-service";
import {ILocationPoint} from "../models/user";

@Component({
    selector: "profile-map",
    template: `
        <h4>Click on the map to set your location</h4>
        <div id="map"></div>
    `,
    styles: [
        `
        #map {
            height: 300px;
        }
    `
    ]
})
export class ProfileMapComponent implements OnInit {
    @Input() currentLocation;
    @Output() updateCurrentLocation = new EventEmitter();

    private map: any;
    private marker;

    constructor(private mapService: MapService){}

    ngOnInit(): void {
        // create map and register on click event
        this.map = this.mapService.createMap("map");
        this.map.on("click", this.onMapClick.bind(this));

        // subscribe to current location to update marker position
        this.currentLocation.subscribe(location => {

            if(location){
                this.replaceMarker(location)
            }
        })
    }

    replaceMarker(location: ILocationPoint){
        if(this.marker){
            // if marker is already present - remove
            this.map.removeLayer(this.marker);
        }
        // create new marker
        this.marker = this.mapService.createMarker(location, "Your position");
        this.map.addLayer(this.marker);
    }

    onMapClick(e) {
        let message = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        };
        this.updateCurrentLocation.next(message);
    }

}
