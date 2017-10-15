var mongoose = require('mongoose');

// Product Schema
var ProductSchema = mongoose.Schema({
  name: {
	type: String, 
	require: true
  },
  description: {
	type: String,
  },
  color: {
	type: String 
  },
  picture: {
	data: Buffer,
	contentType: String
  },
  category: {
	type: String
  },
  size: {
	type: String  
  },
  price: {
	  type: Number,
	  require: true
  },
  quantity: {
	  type: Number,
	  default: 1
  }
}, {collection: 'products'});

// Product Model
var Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
