import { IJSONSchema } from "classui/Components/Form/Schema";

export const Details: IJSONSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		name: {
			type: "string",
			minLength: 5
		},
		affiliation: {
			type: "string"
		},
		designation: {
			type: "string"
		},
		dob: {
			type: "string",
			pattern: "^[0-9]{2}/[0-9]{2}/[0-9]{4}$"
		},
		gender: {
			enum: ["male", "female"]
		},
		mobile_number: {
			type: "string",
			pattern: "^[0-9]{10}$"
		},
		id: {
			type: "string",
			format: "email"
		},

		employment_records: {
			type: "string"
		},
		education_qualification: {
			type: "string"
		},

		area_of_research: {
			type: "string"
		},
		research_experience: {
			type: "string"
		},
		best_research_paper1: {
			type: "string"
		},
		best_research_paper2: {
			type: "string"
		},
		broad_area_of_research: {
			enum: [
				"Physical Sciences",
				"chemical Sciences",
				"Biological Sciences",
				"Engineering Sciences",
				"Medical Sciences",
				"Earth & Atmospheric Sciences",
				"Mathematical Science"
			]
		},

		contribution: {
			type: "string"
		},
		reason: {
			type: "string"
		},
		vision: {
			type: "string"
		},
		fulfil: {
			type: "string"
		},
		other: {
			type: "string"
		},
		referer1_name: {
			type: "string"
		},
		referer1_email: {
			type: "string",
			format: "email"
		},
		referer2_name: {
			type: "string"
		},
		referer2_email: {
			type: "string",
			format: "email"
		}
	},
	required: [
		"id",
		"name",
		"affiliation",
		"designation",
		"dob",
		"gender",
		"mobile_number",
		"employment_records",
		"education_qualification",
		"area_of_research",
		"research_experience",
		"best_research_paper1",
		"best_research_paper2",
		"broad_area_of_research",
		"contribution",
		"reason",
		"vision",
		"fulfil",
		"other",

		"referer1_name",
		"referer1_email",
		"referer2_name",
		"referer2_email"
	]
};
