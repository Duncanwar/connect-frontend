const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.MONGOURI;

export const devDb = async () => {
	try {
		return await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
	} catch (error) {
		throw new Error(error);
	}
};
