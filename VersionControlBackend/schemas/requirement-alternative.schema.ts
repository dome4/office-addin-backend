import { Schema, model } from 'mongoose';

const CountrySchema = new Schema({
    isocode: String,
    name: String,
    description: String
});

const CitySchema = new Schema({
    name: String,
    description: String,
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
});


const LanguageSchema = new Schema({
    isocode: String,
    name: String
});


const Country = model('Country', CountrySchema);
const City = model('City', CitySchema);
const Language = model('Language', LanguageSchema);

export { Country, City, Language }
