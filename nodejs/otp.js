"use strict";

const bcrypt = require("bcrypt");
const MILLISECONDS_PER_MINUTE = 1000 * 60;

class OTP {
	async generateOTP(email) {
		try {
			const otp = Math.floor(100000 + Math.random() * 900000);
			const ttl = 10 * MILLISECONDS_PER_MINUTE;
			const expires = Date.now() + ttl;

			const data = `${email}${otp}${expires}`;
			const hash = await bcrypt.hash(data, 10);
			const fullHash = `${hash}.seperator.${expires}`;
		
			return {
				otp: 123456,
				expires: expires,
			};
		} catch (error) {
			console.error(error);
		}
	}

}

module.exports = new OTP();
