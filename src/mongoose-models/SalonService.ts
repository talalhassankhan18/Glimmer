import mongoose, { Schema, Document, Types, Model } from "mongoose";

// Define the TypeScript interface for the service document
interface ISalonService extends Document {
  salonId: Types.ObjectId;
  userId: Types.ObjectId;
  serviceName: string;
  price: number;
  duration: string; // You may switch to a `number` type if duration is in minutes
  category: string;
  gender: "Male" | "Female" | "Unisex";
  createdAt: Date;
  updatedAt: Date;
}

// Define the Service schema
const salonServiceSchema = new Schema<ISalonService>(
  {
    salonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salon",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceName: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      minlength: [3, "Service name must be at least 3 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      validate: {
        validator: function (value: string) {
          return /^[0-9]+ (minutes|hours)$/.test(value);
        },
        message: "Duration must be a valid string like '30 minutes' or '2 hours'",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unisex"],
      required: [true, "Gender is required"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
const SalonServiceModel: Model<ISalonService> =
  mongoose.models.SalonService ||
  mongoose.model<ISalonService>("SalonService", salonServiceSchema);

export default SalonServiceModel;
