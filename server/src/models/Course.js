import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['video', 'document', 'quiz', 'text'],
    required: true,
  },
  content: {
    type: String, // URL for video/document or text content
  },
  duration: {
    type: Number, // Duration in minutes
    default: 0,
  },
  order: {
    type: Number,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Module title is required'],
    trim: true,
  },
  description: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  lessons: [lessonSchema],
}, { timestamps: true });

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      maxlength: [5000, 'Description cannot be more than 5000 characters'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Course category is required'],
      enum: [
        'programming',
        'design',
        'business',
        'marketing',
        'data-science',
        'web-development',
        'mobile-development',
        'other',
      ],
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    thumbnail: {
      type: String,
      default: 'https://via.placeholder.com/400x300',
    },
    price: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    duration: {
      type: Number, // Total duration in hours
      default: 0,
    },
    modules: [moduleSchema],
    prerequisites: [String],
    learningOutcomes: [String],
    tags: [String],
    language: {
      type: String,
      default: 'English',
    },
    maxStudents: {
      type: Number,
      default: null, // null means unlimited
    },
    enrollmentCount: {
      type: Number,
      default: 0,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ instructor: 1, status: 1 });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ createdAt: -1 });

// Virtual for total lessons
courseSchema.virtual('totalLessons').get(function () {
  return this.modules.reduce((total, module) => total + module.lessons.length, 0);
});

// Update publishedAt when status changes to published
courseSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
    this.isPublished = true;
  }
  next();
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
