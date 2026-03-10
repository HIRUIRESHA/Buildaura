import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

// Enums for status and project type
const statusEnum = [
  "pending",
  "pending_approval",
  "approved",
  "rejected",
  "in_progress",
  "hold",
  "completed",
  "cancelled"
];

const projectTypeEnum = [
  "residential",
  "commercial",
  "industrial",
  "infrastructure",
  "renovation"
];

const priorityEnum = ["low", "medium", "high", "urgent"];

const projectCartSchema = new Schema(
  {
    projectName: { 
      type: String, 
      required: [true, "Project name is required"], 
      trim: true,
      maxLength: [100, "Project name cannot exceed 100 characters"]
    },

    // Reference to the client (ObjectId)
    client: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Client reference is required"] 
    },

    // Reference to the company (ObjectId)
    company: { 
      type: Schema.Types.ObjectId, 
      ref: "Company", 
      required: [true, "Company reference is required"] 
    },

    startDate: { 
      type: Date, 
      required: [true, "Start date is required"],
      validate: {
        validator: function(value) {
          // Allow dates in the past for existing projects
          if (this.isNew) {
            return value > new Date();
          }
          return true;
        },
        message: "Start date must be in the future for new projects"
      }
    },

    budget: { 
      type: Number, 
      required: [true, "Budget is required"], 
      min: [1, "Budget must be greater than 0"],
      max: [10000000, "Budget cannot exceed 10,000,000"],
      set: value => parseFloat(value) 
    },

    description: { 
      type: String, 
      required: [true, "Description is required"], 
      trim: true,
      minLength: [10, "Description must be at least 10 characters long"],
      maxLength: [1000, "Description cannot exceed 1000 characters"]
    },

    projectType: { 
      type: String, 
      enum: {
        values: projectTypeEnum,
        message: "Project type must be one of: residential, commercial, industrial, infrastructure, renovation"
      }, 
      required: [true, "Project type is required"] 
    },

    status: { 
      type: String, 
      enum: {
        values: statusEnum,
        message: "Status must be one of: pending, pending_approval, approved, rejected, in_progress, hold, completed, cancelled"
      }, 
      default: "pending" 
    },

    // keep track of status changes
    statusHistory: [
      {
        status: { 
          type: String, 
          enum: statusEnum, 
          required: [true, "Status history status is required"] 
        },
        changedAt: { 
          type: Date, 
          default: Date.now 
        },
        changedBy: { 
          type: Schema.Types.ObjectId, 
          ref: "User",
          required: [true, "User who changed status is required"]
        },
        notes: {
          type: String,
          trim: true,
          maxLength: [500, "Status change notes cannot exceed 500 characters"],
          default: ""
        }
      }
    ],

   
    estimatedEndDate: {
      type: Date,
      validate: {
        validator: function(value) {
          return !value || value > this.startDate;
        },
        message: "Estimated end date must be after start date"
      }
    },

    priority: {
      type: String,
      enum: {
        values: priorityEnum,
        message: `Priority must be one of: ${priorityEnum.join(", ")}`
      },
      default: "medium"
    },

    tags: [{
      type: String,
      trim: true,
      maxLength: [20, "Tag cannot exceed 20 characters"]
    }],

    isActive: {
      type: Boolean,
      default: true
    },

    actualEndDate: {
      type: Date,
      validate: {
        validator: function(value) {
          return !value || value > this.startDate;
        },
        message: "Actual end date must be after start date"
      }
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  { 
    timestamps: true,
    toJSON: { 
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: { 
      virtuals: true,
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// // Add pagination plugin
// projectCartSchema.plugin(mongoosePaginate);

//  project duration (in days)
projectCartSchema.virtual('durationDays').get(function() {
  if (this.estimatedEndDate && this.startDate) {
    const diffTime = Math.abs(this.estimatedEndDate - this.startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return null;
});

// actual duration if project is completed
projectCartSchema.virtual('actualDurationDays').get(function() {
  if (this.actualEndDate && this.startDate) {
    const diffTime = Math.abs(this.actualEndDate - this.startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return null;
});

// client name
projectCartSchema.virtual('clientName').get(function() {
  return this.client ? `${this.client.firstName} ${this.client.lastName}` : '';
});

// company name
projectCartSchema.virtual('companyName').get(function() {
  return this.company ? this.company.name : '';
});

// Index for better query performance
projectCartSchema.index({ client: 1, status: 1 });
projectCartSchema.index({ company: 1, status: 1 });
projectCartSchema.index({ status: 1 });
projectCartSchema.index({ startDate: 1 });
projectCartSchema.index({ projectType: 1 });
projectCartSchema.index({ priority: 1 });
projectCartSchema.index({ isActive: 1 });
projectCartSchema.index({ createdAt: -1 });

// Auto-populate client and company whenever a find query runs
projectCartSchema.pre(/^find/, function (next) {
  // Only populate if not already populated
  if (this.options.populate !== false) {
    this.populate([
      { path: "client", select: "firstName lastName email userId" },
      { path: "company", select: "name email address phone" }
    ]);
  }
  next();
});

// Middleware to add initial status history entry
projectCartSchema.pre('save', function(next) {
  if (this.isNew) {
    this.statusHistory = this.statusHistory || [];
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date(),
      changedBy: this.client,
      notes: "Project created"
    });
  }
  
  // If status is being updated, add to history
  if (this.isModified('status') && !this.isNew) {
    this.statusHistory.push({
      status: this.status,
      changedAt: new Date(),
      changedBy: this._update.$set?.updatedBy || this.client,
      notes: `Status changed to ${this.status}`
    });
  }
  next();
});

// get projects by status
projectCartSchema.statics.findByStatus = function(status) {
  return this.find({ status }).populate("client company");
};

// get projects by client
projectCartSchema.statics.findByClient = function(clientId) {
  return this.find({ client: clientId }).populate("client company");
};

// get projects by company
projectCartSchema.statics.findByCompany = function(companyId) {
  return this.find({ company: companyId }).populate("client company");
};

// get active projects
projectCartSchema.statics.findActive = function() {
  return this.find({ isActive: true }).populate("client company");
};

// update progress
projectCartSchema.methods.updateProgress = function(progress, userId, notes = "") {
  this.progress = progress;
  this.statusHistory.push({
    status: this.status,
    changedAt: new Date(),
    changedBy: userId,
    notes: notes || `Progress updated to ${progress}%`
  });
  return this.save();
};

// complete project
projectCartSchema.methods.completeProject = function(userId, notes = "") {
  this.status = "completed";
  this.progress = 100;
  this.actualEndDate = new Date();
  this.statusHistory.push({
    status: "completed",
    changedAt: new Date(),
    changedBy: userId,
    notes: notes || "Project completed"
  });
  return this.save();
};

export default model("ProjectCart", projectCartSchema);