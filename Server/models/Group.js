import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  emails: {
    type: [String],
    default: []
  },
}, {
  timestamps: true
});

export default mongoose.model('Group', GroupSchema);
