var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

/* Fill out these functions using Mongoose queries*/
var findLibraryWest = function() {
  Listing.find( { name : 'Library West' }, (err, listing) => {
    if(err) throw err;

    console.log(listing);
  });
};

var removeCable = function() {
  Listing.findOneAndRemove( { code : 'CABL' }, (err, listing) => {
    if(err) throw err;
    console.log(listing);
  });
};

var updatePhelpsLab = function() {
  Listing.findOneAndUpdate( 
    { name : 'Phelps Laboratory' }, 
    { address : 'Phelps Lab, Gainesville, FL 32603, United States' } , 
    (err, listing) => {
      if(err) throw err;
      console.log(listing);
    });
};

var retrieveAllListings = function() {
  Listing.find({}, function(err, listings) {
    if (err) throw err;

    console.log(listings);
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
