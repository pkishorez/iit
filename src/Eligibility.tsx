import * as React from "react";
import { Card } from "../node_modules/classui/Components";

export const Eligibility = (props: any) => {
	return (
		<div
			style={{
				width: "100vw",
				maxWidth: 1000,
				padding: 10,
				margin: 10,
				fontSize: 16
			}}
		>
			<h2>Eligibility.</h2>
			<div>
				Applications are invited from young, independent researchers
				working in any areas of Science and Engineering who have proven
				track record of excellence in their respective research area
				along with a demonstrated passion of Science outreach,
				promotion, communication and leadership.
				<br />
				<div style={{ marginTop: 20 }}>
					<b> Minimum Qualification:</b>
				</div>
				Applicants should
				<ul style={{ padding: 10 }}>
					<li>
						1. hold of PhD degree in any discipline of pure and
						applied Sciences and Engineering and be less than 40
						years of age as on 31 st December 2018.
					</li>
					<li>
						2. be citizens of India, and be living and working in
						India at present.
					</li>
					<li>
						3. hold an academic position (either temporary or
						permanent)
					</li>
					<li>
						4. Two Letters of support are necessary for a valid
						application.
						<div>
							The letters can be provided by
							<ul
								style={{
									marginLeft: 10,
									listStyle: "square inside"
								}}
							>
								<li>
									Fellows of any Indian Academy of Science/
									Engineering
								</li>
								<li>
									Directors/ heads of institutes (present
									employer)
								</li>
								<li>
									Heads/ chairpersons of departments in
									Universities (present employer)
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};
