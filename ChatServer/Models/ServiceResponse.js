const mongoose = require("mongoose");

const ServiceResponseSchema = mongoose.Schema(
  {
    success: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    data: {
      type: Object,
      required: false,
    },
  },
  {
    autoCreate: false,
  }
);

const ServiceResponse = mongoose.model(
  "ServiceResponse",
  ServiceResponseSchema
);
module.exports = ServiceResponse;
