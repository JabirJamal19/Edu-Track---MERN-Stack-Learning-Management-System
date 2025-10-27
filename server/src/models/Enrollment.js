import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedLessons: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
    status: {
      type: String,
      enum: ['active', 'completed', 'dropped', 'suspended'],
      default: 'active',
    },
    completedAt: Date,
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    certificateUrl: String,
    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
      createdAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique enrollment
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ student: 1, status: 1 });
enrollmentSchema.index({ course: 1 });

// Update lastAccessedAt
enrollmentSchema.methods.updateLastAccessed = function () {
  this.lastAccessedAt = new Date();
  return this.save();
};

// Calculate and update progress
enrollmentSchema.methods.updateProgress = async function (totalLessons) {
  if (totalLessons > 0) {
    this.progress = Math.round((this.completedLessons.length / totalLessons) * 100);
    
    // Mark as completed if progress is 100%
    if (this.progress === 100 && this.status === 'active') {
      this.status = 'completed';
      this.completedAt = new Date();
    }
  }
  return this.save();
};

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
