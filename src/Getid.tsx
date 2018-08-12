import * as React from "react";
import { Form } from "classui/Components/Form/index";
import { TextField, Button } from "classui/Components";
import { Submit } from "classui/Components/Form/Submit";
import { ClassUI } from "classui";

export const GetID = (props: any) => {
	return (
		<Form
			style={{
				flexGrow: 1,
				width: `calc(100vw)`,
				maxWidth: 300
			}}
			autocomplete="off"
			onSubmit={data => {
				props.setID(data.id);
				ClassUI.history.push(`/details/${data.id}`);
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
			<Button onClick={() => ClassUI.history.push("/details")}>
				New Registration.
			</Button>
			<h3>Registration ID</h3>
			<TextField name="id" label="Enter ID" />
			<Submit value="Submit" />
		</Form>
	);
};
