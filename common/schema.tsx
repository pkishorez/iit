import { IJSONSchema } from "classui/Components/Form/Schema";

export const Details: IJSONSchema = {
	type: "object",
	properties: {
		name: {
			type: "string",
			minLength: 5
		},
		father_name: {
			type: "string",
			minLength: 5
		},
		dob: {
			type: "string"
		},
		mail: {
			type: "string",
			format: "email"
		}
	},
	required: ["name", "father_name", "dob", "mail"]
};
