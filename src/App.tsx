import * as React from "react";
import { ClassUI, NavBar, NavbarRemain } from "classui";
import { Card } from "classui/Components/Base/Card";
import { Button } from "classui/Components";
import { Login } from "./Details";
import { createStore } from "redux";
import { Switch, Route } from "react-router";
import { GetID } from "./Getid";
import ShowDetails from "./Show";
import { Dashboard } from "./Dashboard";

interface IAppState {
	userid?: string;
}
export class App extends React.Component<any, IAppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			userid: undefined
		};
	}
	setID = (userid: any) => {
		this.setState({
			userid
		});
	};
	render() {
		return (
			<ClassUI theme="green" fullHeight enableRouting>
				<NavBar
					dummy
					fixed
					width={1024}
					style={{ height: 50 }}
					logo="IIT"
				>
					<NavbarRemain />
					<Button onClick={() => ClassUI.history.push("/setID")}>
						Registration
					</Button>
					<Button onClick={() => ClassUI.history.push("/dashboard")}>
						Dashboard
					</Button>
				</NavBar>
				<div
					style={{
						minHeight: "calc(100vh - 50px)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Switch>
						<Route path="/dashboard" component={Dashboard} />

						<Route
							render={() => (
								<Card
									style={{
										padding: 20
									}}
								>
									<Switch>
										<Route
											path="/details/:id"
											component={Login}
										/>
										<Route
											path="/showDetails/:id"
											component={ShowDetails}
										/>
										<Route
											render={() => (
												<GetID setID={this.setID} />
											)}
										/>
									</Switch>
								</Card>
							)}
						/>
					</Switch>
				</div>
			</ClassUI>
		);
	}
}
