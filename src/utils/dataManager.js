import {db} from "./config";

const getSuperfromFirebase = async () => {
    return new Promise(function(resolve, reject) {
        let ref = db.ref("/features");
        let message_array = ref.once('value', async (snapshot) => {
            let markers = {
                "allMarkers": [],
                "nightMarkers": [],
            };
            snapshot.forEach((sup) => {
                let newSuper = {
                    geometry: {
                        type: sup.val().geometry.type,
                        coordinates: {
                            longitude: sup.val().geometry.coordinates[0],
                            latitude: sup.val().geometry.coordinates[1],
                        },
                    },
                    properties: sup.val().properties,
                    type: sup.val().type,
                }
                markers.allMarkers.push(newSuper)
                if (newSuper.properties.SN_Obert24h === "0") {
                    markers.nightMarkers.push(newSuper)
                }
                /*if(Math.random()<0.15){
                    clustMarkers.push(newSuper);
                }*/
            });
            resolve(markers);
        })
    });
}

export default getSuperfromFirebase;