// In TypeScript, classes have a dual nature. When we make a class, we can use
// it to create an instance of that class, but we can also use a class (or more
// correctly, a variable that refers to a class which is what "User" and
// "Company" are) to refer to the type as well. There are several other things
// in TS that have this dual nature of simultaneously being a value and a type at
// the same time

// Instructions to every other class on how they can be an argument to
// Map.prototype.addMarker(). Effectively, we are inverting the dependencies of
// the Map class so that Map doesn't have dependecies of User or Company or any
// other class, but other classes who wish to work with Map have a dependency
// on this abstraction (the interface)
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  getMarkerContent(): string;
}

export class Map {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 2,
      center: { lat: 0, lng: 0 }
    });
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.getMarkerContent()
      });
      infoWindow.open(this.googleMap, marker);
    });
  }
}
