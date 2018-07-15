import * as React from "react";
import { Form, Select } from "classui/Components/Form";
import { Submit } from "classui/Components/Form/Submit";
import { TextField, Badge, Button } from "classui/Components";
import { Card } from "classui/Components/Base/Card";
import { Image } from "./Upload";
import { ClassUI } from "classui";

export interface ILoginProps {
	id: any;
}

export class Login extends React.Component<ILoginProps, any> {
	onSubmit = (data: any) => {
		$.post("/post", {
			id: this.props.id,
			...data
		}).then(alert);
	};
	constructor(props: any) {
		super(props);
		const id = props.match.params.id;
		if (!id) {
			ClassUI.history.push("/setID");
		}
	}
	public render() {
		const id = (this.props as any).match.params.id;
		return (
			<div>
				<Form
					onSubmit={this.onSubmit}
					schema={{
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
							}
						},
						required: ["name", "father_name", "dob"]
					}}
				>
					<Button
						style={{ fontSize: 12 }}
						onClick={() => {
							ClassUI.history.push("/setID");
						}}
					>
						change {id}
					</Button>
					<h3>IIT Form Data </h3>
					<TextField name="name" label="Name" />
					<TextField name="father_name" label="Father Name" />
					<TextField name="dob" label="Date Of Birth" />
					<Select
						nonEditable
						name="username"
						options={["kishore"]}
						label="Education Qualification"
					/>
					<TextField name="username" type="area" label="Address" />
					<Image label="User Document" filename="user_doc" />
					<Image label="User Image" filename="user_image" />
					<Image label="Hello" filename="hello" />
					<Submit />
				</Form>
			</div>
		);
	}
}
