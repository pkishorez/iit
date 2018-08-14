import * as React from "react";
import _ = require("lodash");
import { ClassUI } from "classui";
import * as $ from "jquery";
import { Overlay } from "classui/Overlay";
import { Anim } from "classui/Helper/Anim";
import { Card } from "classui/Components";

export interface ShowProps {}

export class Dashboard extends React.Component<ShowProps, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			data: []
		};
		$.getJSON(`/api/getDetails/all`)
			.then(data => {
				this.setState({
					data: data.data
				});
			})
			.catch(data => {
				Overlay.feedback("Error.", "error");
			});
	}
	public render() {
		{
			/* {JSON.stringify(this.state.data)} */
		}
		{
			/* <h3>{this.state.data ? "Details" : "Loading..."}</h3> */
		}
		return (
			<Anim
				style={{
					flexGrow: 1,
					width: `100vw`,
					maxWidth: 1024,
					display: "flex",
					alignSelf: "flex-start",
					flexWrap: "wrap",
					boxSizing: "border-box"
				}}
			>
				{this.state.data.map((data: any, i: number) => {
					const { _id, id, ...fields } = data;
					return (
						<div
							key={i}
							style={{
								flexGrow: 1,
								padding: 20,
								minWidth: 300
							}}
						>
							<Card>
								<h3>{id}</h3>
								{Object.keys(fields).map(k => {
									if (_.isString(data[k])) {
										return (
											<div key={k}>
												<b>{_.capitalize(k)}</b> :{" "}
												{_.capitalize(data[k])}
											</div>
										);
									}
								})}
							</Card>
						</div>
					);
				})}
			</Anim>
		);
	}
}
