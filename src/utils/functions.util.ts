export function validPropeties<S = any>(properties: any, schema: S): properties is S {

	const errors: Error[] = [];

	Object.keys(schema).map((property) => {
		if (property in properties) {
			// console.log(property);
		} else {
			errors.push(new Error(`missing ${property}`));
			throw new Error(`missing ${property}`);
		}
	});

	if (errors.length > 0) {
		console.log(errors);
		throw errors;
	}

	return properties;
}
