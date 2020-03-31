import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  cuid: { type: 'String', required: true },
  content: { type: 'String', required: true },
  author: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateUpdated: { type: 'Date' },
});

const postSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  comments: [commentSchema],
});

export default mongoose.model('Post', postSchema);
