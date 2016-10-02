import {Injectable} from '@angular/core';
import "leaflet";
import {ILocationPoint} from "../models/user";

declare var L:any;
@Injectable()
export class MapService {

    createMap(selector: string) {
        let map = L.map(selector).setView([51.505, -0.09], 13);
        let tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			    maxZoom: 18,
			    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		    });
        map.addLayer(tiles);
        return map;
    }

    createMarker(location: ILocationPoint, text: string) {
        return new L.Marker(location).bindPopup(text)
    }
}
