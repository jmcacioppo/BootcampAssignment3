'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

// Read file with json objects
var listingData = fs.readFileSync('listings.json', 'utf8');
listingData = JSON.parse(listingData);

// Loop through each object and save it into Listing model
for(var i = 0; i < listingData.entries.length; i++) {
  if(listingData.entries[i].coordinates !== undefined) {
    var temp = new Listing({
      code : listingData.entries[i].code,
      name : listingData.entries[i].name,
      coordinates : {
        latitude : listingData.entries[i].coordinates.latitude,
        longitude : listingData.entries[i].coordinates.longitude
      },
      address : listingData.entries[i].address
    });
  }
  else {
    var temp = new Listing({
      code : listingData.entries[i].code,
      name : listingData.entries[i].name
    });
  }

  // Save to mlab
  temp.save( (err) => {
    if(err) throw err;
    console.log("Saved!");
  });
}

