import * as React from "react";
import { Form, Select } from "classui/Components/Form";
import { Submit } from "classui/Components/Form/Submit";
import { TextField, Badge, Button } from "classui/Components";
import { Overlay } from "classui/Overlay";
import { Card } from "classui/Components/Base/Card";
import { Image } from "./Upload";
import { ClassUI } from "classui";
import { Details } from "../common/schema";
import * as $ from "jquery";

export interface ILoginProps {
	id: any;
}
interface ILoginState {
	images: {
		userPhoto?: string;
	};
	data?: {};
}

export class Login extends React.Component<ILoginProps, ILoginState> {
	onSubmit = (data: any) => {
		const id = (this.props as any).match.params.id;
		$.post("/api/submit", {
			id: (this.props as any).match.params.id,
			...data,
			images: {
				...this.state.images
			}
		})
			.then(data => {
				if (data.error) {
					Overlay.feedback(data.error, "error");
					return;
				}
				Overlay.feedback("Successfully updated data.", "success");
				ClassUI.history.push(`/showDetails/${id}`);
			})
			.catch(e => {
				Overlay.feedback(e, "error");
			});
	};
	constructor(props: any) {
		super(props);
		const id = props.match.params.id;
		if (!id) {
			ClassUI.history.push("/setID");
		}
		this.state = {
			images: {}
		};
		$.getJSON(`/api/getDetails/${id}`)
			.then(data => {
				this.setState({
					data: data.data
				});
			})
			.catch(data => {
				this.setState({
					data: data
				});
			});
	}
	public render() {
		// render
		const id = (this.props as any).match.params.id;
		return (
			<div>
				{this.state.data ? (
					<>
						<Button
							style={{ fontSize: 12, marginBottom: 10 }}
							onClick={() => {
								ClassUI.history.push("/setID");
							}}
						>
							<h4
								style={{
									margin: 0,
									padding: 0
								}}
							>
								ID : {id}
							</h4>
						</Button>
						<Form
							onSubmit={this.onSubmit}
							default={this.state.data}
							schema={Details}
						>
							<h3>IIT Form Data </h3>
							<TextField name="name" label="Name" />
							<TextField name="father_name" label="Father Name" />
							<TextField name="dob" label="Date Of Birth" />
							<TextField name="mail" label="Reference Mail ID" />
							<Select
								nonEditable
								name="username"
								options={["kishore"]}
								label="Education Qualification"
							/>
							<TextField
								name="username"
								type="area"
								label="Address"
							/>
							<Image
								label="User Document"
								onChange={img => {
									this.setState({
										images: {
											...this.state.images,
											userPhoto: img
										}
									});
								}}
								filename="user_doc"
							/>
							<Submit value="Submit" />
						</Form>
					</>
				) : (
					"Loading..."
				)}
			</div>
		);
	}
}
