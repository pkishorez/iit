import * as React from "react";
import { Form } from "classui/Components/Form/index";
import { TextField } from "classui/Components";
import { Submit } from "classui/Components/Form/Submit";
import { ClassUI } from "classui";

export const GetID = (props: any) => {
	return (
		<Form
			autocomplete="off"
			onSubmit={data => {
				props.setID(data.id);
				ClassUI.history.push("/details");
			}}
			schema={{
				type: "object",
				properties: {
					id: {
						type: "string",
						minLength: 5
					}
				}
			}}
		>
			<h3>Registration ID</h3>
			<TextField name="id" label="Enter ID" />
			<Submit />
		</Form>
	);
};
