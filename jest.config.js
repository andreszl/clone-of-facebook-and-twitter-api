module.exports = {
	verbose: true,
	roots: [
		'<rootDir>',
	],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
	],
};
