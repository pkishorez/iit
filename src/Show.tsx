import * as React from "react";
import _ = require("lodash");
import { ClassUI } from "classui";
import { Card } from "classui/Components";
import * as $ from "jquery";

export interface ShowProps {}

export default class ShowDetails extends React.Component<ShowProps, any> {
	constructor(props: any) {
		super(props);
		const id = props.match.params.id;
		if (!id) {
			ClassUI.history.push("/setID");
		}
		this.state = {
			data: {}
		};
		$.getJSON(`/api/getDetails/${id}`, {
			id
		})
			.then(data => {
				this.setState({
					data: data.data
				});
			})
			.catch(data => {
				ClassUI.history.push(`/getDetails/${id}`);
			});
	}
	public render() {
		return (
			<div style={{ maxWidth: 500, width: "100%" }}>
				<h3>{this.state.data ? "Details" : "Loading..."}</h3>
				{Object.keys(this.state.data).map(k => {
					if (_.isString(this.state.data[k])) {
						return (
							<div>
								<b>{k}</b> : {this.state.data[k]}
							</div>
						);
					}
				})}
				<h4>Email successfully sent to the referred email id.</h4>
			</div>
		);
	}
}
