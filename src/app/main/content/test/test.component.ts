import {Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, ApplicationRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { AgmCoreModule,MapsAPILoader } from '@agm/core';

declare var google: any;
@Component({
  selector: 'app-test',  
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  locInput='';
  
  submitted = false;
  onSubmit() { this.submitted = true; }
  
//  keyDownFunction(event) {
//      if (event.keyCode == 13) {
//          document.getElementById("submitBtnLocation").click();
//      }
//  }  
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public currentAddress: string;
  private geoCoder;
  
  
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}
  
  ngOnInit() {
    //set google maps defaults
    // this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
  
     
        navigator.geolocation.getCurrentPosition((position) => {     
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;      
          this.zoom = 12;
          this.geoCoder.geocode({'location': {lat: position.coords.latitude, lng: position.coords.longitude }}, (results, status) => {
           // console.log(results);          
            if (status === 'OK') {
              console.log(results[0]);
              if (results[0]) {
                //this.zoom = 12;           
                this.currentAddress=results[0].formatted_address;        
              } 
            }
          });
         // console.log(position);
        });
       // let latlng = {lat: this.latitude, lng: this.longitude};
       
    //create search FormControl
    this.searchControl = new FormControl();
    
    //set current position
   // this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // Fetch GeoCoder for reverse geocoding
      this.geoCoder = new google.maps.Geocoder;
    
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng(); 
          this.currentAddress =place[0].formatted_address;
          this.zoom = 12;
        });
      });
    });
  }
  
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    let locationdetails = JSON.stringify($event);
    let details = JSON.parse(locationdetails);
    console.log(details.coords.lat);
    console.log(details.coords.lng);
    //this.latitude = 13.00;
    //this.longitude = 25.201;
    this.geoCoder.geocode({'location': {lat: details.coords.lat, lng: details.coords.lng }}, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          console.log('aaaa');
          this.currentAddress = results[0].formatted_address;
          // this.searchElementRef.nativeElement.value = results[0].formatted_address);
          // console.log(this.searchElementRef.nativeElement.value);
          // infowindow.setContent(results[0].formatted_address);
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  

}

