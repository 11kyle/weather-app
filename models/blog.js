var mongoose = require('mongoose');

// Blog Schema
var BlogSchema = mongoose.Schema({
  title: {
	type: String, 
	require: true
  },
  author: {
	type: String, 
	default: 'Kyle Johnson'
  },
  body: {
	type: String 
  },
  pictures: { },
  tags: {
	type: String,
	enum: ['POLITICS', 'ECONOMY', 'EDUCATION']
  },
  posted: { 
	type: Date,
	default: Date.now
  }
}, {collection: 'blog-posts'});

// Blog Model
var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
