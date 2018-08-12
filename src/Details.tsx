import * as React from "react";
import { Form, Select, Checkbox, Radio } from "classui/Components/Form";
import { Submit } from "classui/Components/Form/Submit";
import { TextField, Badge, Button } from "classui/Components";
import { Overlay } from "classui/Overlay";
import { Card } from "classui/Components/Base/Card";
import { Image } from "./Upload";
import { ClassUI } from "classui";
import { Details } from "../common/schema";
import * as $ from "jquery";
import _ = require("lodash");
import { string } from "../node_modules/@types/prop-types";

export interface ILoginProps {
	id: any;
}
interface ILoginState {
	images: {
		userPhoto?: string;
	};
	data: any | undefined;
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
		// if (!id) {
		// 	ClassUI.history.push("/setID");
		// }
		this.state = {
			images: {},
			data: !!id ? undefined : {}
		};
		if (id) {
			$.getJSON(`/api/getDetails/${id}`)
				.then(data => {
					if (_.isEmpty(data.data)) {
						Overlay.feedback(
							`No details found for id ${id}.`,
							"error"
						);
						ClassUI.history.push("/");
						return;
					}
					this.setState({
						data: data.data
					});
				})
				.catch(data => {
					Overlay.feedback(`No details found for id ${id}.`, "error");
					ClassUI.history.push("/");
				});
		}
	}
	public render() {
		// render
		const id = (this.props as any).match.params.id;
		return (
			<Card
				style={{
					padding: 20
				}}
			>
				<div
					style={{
						maxWidth: 700
					}}
				>
					{this.state.data ? (
						<>
							{/* <Button
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
								Change ID : {id}
							</h4>
						</Button> */}
							<Form
								onSubmit={this.onSubmit}
								onError={err => {
									Overlay.feedback(err, "error");
								}}
								default={this.state.data}
								schema={{
									...Details,
									properties: {
										...Details.properties,
										agree: {
											const: true
										}
									}
								}}
							>
								<h2>Basic Details </h2>
								<TextField label="Name" name="name" />
								<TextField
									label="Affiliation"
									name="affiliation"
								/>
								<TextField
									label="Designation"
									name="designation"
								/>
								<TextField
									label="Date Of Birth : (dd/mm/yyyy)"
									name="dob"
								/>
								<div style={{ marginBottom: 10 }}>
									<b>Gender</b>
									<Radio
										inline
										name="gender"
										values={[
											{ label: "male", value: "male" },
											{ label: "female", value: "female" }
										]}
									/>
								</div>
								<TextField
									label="Mobile Number (10 digits)"
									name="mobile_number"
								/>
								<TextField
									label="Primary Email ID"
									name="email"
								/>
								<TextField
									name="postal_address"
									type="area"
									style={{
										height: 50
									}}
									label="Postal Address"
								/>
								<TextField
									name="employment_records"
									type="area"
									style={{
										height: 70
									}}
									label="Employment Records"
								/>
								<TextField
									name="education_qualification"
									type="area"
									style={{
										height: 70
									}}
									label="Education Qualification"
								/>
								<TextField
									name="area_of_research"
									type="area"
									style={{
										height: 70
									}}
									label="Areas of research (Use Maximum five keywords): *"
								/>
								<TextField
									name="research_experience"
									type="area"
									style={{
										height: 70
									}}
									label="Research Experience and Accomplishments* (Maximum 250 words)"
								/>{" "}
								<TextField
									name="best_research_papers"
									type="area"
									style={{
										height: 70
									}}
									label="Two Best Research Papers Summary (100 words each) explaining the impact of your research for common public:*"
								/>
								<b>Broad area of research.</b>
								<Select
									name="broad_area_of_research"
									label="Broad area of research."
									nonEditable
									options={[
										"Physical Sciences",
										"chemical Sciences",
										"Biological Sciences",
										"Engineering Sciences",
										"Medical Sciences",
										"Earth & Atmospheric Sciences",
										"Mathematical Science"
									]}
								/>
								<h2>General Questions</h2>
								<TextField
									name="reason"
									type="area"
									style={{
										height: 70
									}}
									label="1. Why do you want to join Indian National Young Academy of Sciences (INYAS)? *(50-100 words)"
								/>
								<TextField
									name="contribution"
									type="area"
									style={{
										height: 70
									}}
									label="2. Describe briefly about your contribution for advancement of Science in India?* (50-100 words)"
								/>
								<TextField
									name="vision"
									type="area"
									style={{
										height: 70
									}}
									label="3. Write your vision for improving the present status of Science/Research in your capacity?* (50-100 words)"
								/>
								<TextField
									name="fulfil"
									type="area"
									style={{
										height: 70
									}}
									label="4. Describe how you can fulfil your vision being a member of INYAS in next five years. *(50-100 words)"
								/>
								<TextField
									name="other"
									type="area"
									style={{
										height: 70
									}}
									label="5. Any other information which you think appropriate to support your application.* (Maximum 100 words)"
								/>
								<hr />
								<h2>
									Additional Information and Supporting
									Documents.
								</h2>
								<b>
									1. Please upload your CV here (in PDF format
									only) *(Maximum file size: 1 MB)
								</b>
								<Image
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
								<TextField
									name="mail"
									label="2. Name and details of two referee(s) to support your application (Please refer the guidelines)*:"
								/>
								{/*} <TextField
							// 	name="mail"
							// 	label="5. Any other information which you think appropriate to support your application.* (Maximum 100 words)"
							// />
							// <Select
							// 	nonEditable
							// 	name="username"
							// 	options={["kishore"]}
							// 	label="Education Qualification"
							// />
							// <TextField
							// 	name="username"
							// 	type="area"
							// 	label="Address"
							// />*/}
								<Checkbox name="agree">
									I declare to the best of my knowledge that
									the information provided in this application
									form is true. If any misleading or untrue
									information is found at any stage, this will
									lead cancellation of my application and my
									INYAS membership will be revoked.
								</Checkbox>
								<Submit value="Submit" />
							</Form>
						</>
					) : (
						"Loading..."
					)}
				</div>
			</Card>
		);
	}
}
