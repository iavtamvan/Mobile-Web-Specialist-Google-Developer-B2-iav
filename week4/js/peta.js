let findLocation = (x,y) => {
	// console.log(x,y);
	for(let i=0; i< places.length;i++) {
		if(places[i].lokasi[0]==x &&
			places[i].lokasi[1]==y) {
			return i;
		}
	}
	return -1;
}

let showLocation = e => {
	// console.log(" you clicked "+e.latlng.lat+" dan " + e.latlng.lng);

	let ix = findLocation(e.latlng.lat,e.latlng.lng);
	if (ix >= 0) {
		img.src = places[ix].gambar;
		par.textContent = places[ix].review;
	}
}

let initMarkers = () => {
	places = JSON.parse(localStorage.getItem('places')) || [];
	for (const p of places) {
		var marker = L.marker(p.lokasi).addTo(mymap).bindPopup(p.sponsor);
		marker.on('click',showLocation);
	}
}

// IIFE
(
	
	async () => {
		const url="data/peta.json";
		try {
			const resp = await(fetch(url));
			const resp2 = await resp.json();
			localStorage.setItem('places',JSON.stringify(resp2.places));
			initMarkers();
		} catch(err) {
			console.log(err);
		}
	}

)( );


let gmb = document.getElementById("gmb");
let rev = document.getElementById("review");
let img = document.createElement("img");
let par = document.createElement("p");
gmb.appendChild(img);
rev.appendChild(par);

let places = [];


