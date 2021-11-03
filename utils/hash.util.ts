import crypto from 'crypto';

export const md5 = (value : string): string => {
	return crypto.createHash('md5').update(value).digest('hex') as string;
};
