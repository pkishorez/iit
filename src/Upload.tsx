import * as React from "react";
import { Promise } from "es6-promise";
import * as $ from "jquery";

export function uploadImage(files: any, name: string) {
	return new Promise((resolve, reject) => {
		let formData = new FormData();
		formData.append("filename", name);
		$.each(files, (key: any, value) => {
			formData.append("userPhoto", value);
		});
		$.ajax({
			url: `/api/photo`,
			type: "POST",
			data: formData,
			error: (xhr: any) => {
				reject("Error uploading image");
			},
			success: (response: any) => {
				resolve({
					msg: "Image uploaded.",
					data: response.data
				});
			},
			cache: false,
			contentType: false,
			processData: false
		});
	});
}

interface IProps {
	filename: string;
	label?: string;
	onChange: (img: string) => void;
}
interface IState {
	message: string;
}
export class Image extends React.Component<IProps, IState> {
	ref: any;
	constructor(props: any) {
		super(props);
		this.state = {
			message: ""
		};
	}
	getRef = (r: any) => {
		this.ref = r;
	};
	submit = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			message: "Uploading..."
		});
		uploadImage(e.target.files, this.props.filename)
			.then((d: any) => {
				this.setState({
					message: d.msg
				});
				this.props.onChange(d.data);
			})
			.catch(msg => this.setState({ message: msg }));
	};
	render() {
		return (
			<div style={{ marginBottom: 15 }}>
				<input
					type="hidden"
					value={this.props.filename}
					name="filename"
				/>
				<div
					style={{
						fontSize: 13,
						marginBottom: 5,
						fontWeight: 900
					}}
				>
					{this.props.label}
				</div>
				<input type="file" name={"userPhoto"} onChange={this.submit} />
				<div
					style={{
						color: "green"
					}}
				>
					{this.state.message}
				</div>
			</div>
		);
	}
}
