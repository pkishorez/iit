import * as React from "react";
import { ClassUI, NavBar, NavbarRemain } from "classui";
import { Card } from "classui/Components/Base/Card";
import { Button } from "classui/Components";
import { Login } from "./Details";
import { createStore } from "redux";
import { Switch, Route, Redirect } from "react-router";
import { GetID } from "./Getid";
import ShowDetails from "./Show";
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";
import { Eligibility } from "./Eligibility";

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
	render() {
		return (
			<ClassUI theme="green" fullHeight enableRouting>
				<NavBar
					dummy
					fixed
					width={1024}
					style={{ height: 50 }}
					// logo="INYAS"
				>
					<img
						src="bundle/img/logo_white.png"
						style={{ paddingLeft: 10 }}
						height={35}
					/>

					<NavbarRemain />
					<Button onClick={() => ClassUI.history.push("/home")}>
						Home
					</Button>
					<Button
						onClick={() => ClassUI.history.push("/eligibility")}
					>
						Eligibility
					</Button>
					<Button onClick={() => ClassUI.history.push("/setID")}>
						Registration
					</Button>
					{/* <Button onClick={() => ClassUI.history.push("/dashboard")}>
						Dashboard
					</Button> */}
				</NavBar>
				<div
					style={{
						minHeight: "calc(100vh - 50px)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0px 20px 0px 20px"
					}}
				>
					<Switch>
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/home" component={Home} />
						<Route path="/eligibility" component={Eligibility} />
						<Route path="/details/:id" component={Login} />
						<Route path="/details" component={Login} />
						<Route
							path="/showDetails/:id"
							component={ShowDetails}
						/>
						<Route path="/setID" component={GetID} />
						<Route render={() => <Redirect to="/home" />} />
					</Switch>
				</div>
			</ClassUI>
		);
	}
}
