import { Schema, Document, model } from "mongoose";

export const name = "{{{modelUppercase}}}";

export interface {{{modelUppercase}}}Interface extends Document {
  
};

export const {{{modelUppercase}}}Schema = new Schema({

});

export const {{{modelUppercase}}} = model<{{{modelUppercase}}}Interface>(name, {{{modelUppercase}}}Schema);

// eslint-disable-next-line func-names
{{{modelUppercase}}}Schema.virtual("id").get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toString();
});

export const restifyOptions = {
  prefix: "",
  version: "",
  name: `${name}s`,
};
