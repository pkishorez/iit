import * as React from "react";
import { Card } from "../node_modules/classui/Components";
import { Carousel } from "./Carousel";

export const Home = (props: any) => {
	return (
		<div
			style={{
				alignSelf: "flex-start"
			}}
		>
			<Carousel
				slides={[
					{ img: "bundle/img/1.jpg" },
					{ img: "bundle/img/2.jpg" }
				]}
			/>
			<div
				style={{
					// padding: 20,
					margin: "0px 10px",
					width: "100vw",
					maxWidth: 1000
				}}
			>
				<div style={{ display: "flex" }}>
					<Card style={{ marginRight: 20 }}>
						<h2>
							Indian National Young Academy of Science (INYAS)
						</h2>
						<ul>
							<li>
								It is widely recognized that India has a very
								large proportion of young people. Sometimes
								called the ‘demographic dividend”, this offers
								us great potential for development, especially
								in the context of international competition.
								This is as true in science as in any other
								domain.
							</li>
							<li>
								Because India has established a number of new
								institutes such as IISERs, new IITs and several
								new Universities, we are in the happy situation
								of having a very large number of outstanding
								young scientists (in the age group 30-45 years),
								more than ever before. These young scientists
								have no mechanism to raise funds, implement
								programmes that are of interest to them,
								interact with and help each other and express
								their opinion about matters that concern them.
							</li>
							<li>
								In recognition of similar situations, there is a
								world-wide effort to establish ‘Young
								Academies’. There is now a Global Young Academy
								(GYA) and there are national young academies in
								over 22 countries, including Germany, Denmark,
								Israel, Malaysia, Egypt, Pakistan, Sri Lanka
								etc.
							</li>
							<li>
								The President of INSA constituted a committee
								with Rajesh Gopakumar, FNA as chair and Ranjini
								Bandyopadhyay (RRI, Bangalore) and Anindita
								Bhadra (IISER- Kolkata) as members, to advice
								INSA on if and how we should establish a young
								academy in India. This committee has submitted a
								report. Rajesh Gopakumar also made a
								presentation to the officers of INSA.
							</li>
							<li>
								In this backdrop the Council of INSA which met
								on 20th December, 2014, has approved the
								establishment of an academy of young scientists
								in India, as an activity of INSA. An outline of
								the approved procedures is given below.
							</li>
							<li>
								The young academy will be called ‘Indian
								National Young Academy of Science (INYAS)’.
							</li>
							<li>
								Twenty new members, not exceeding the age of 40
								years at the time of induction, shall be
								inducted as members of INYAS each year.
							</li>
							<li>
								Each person may remain a member for a fixed
								period of 5 years; thus at equilibrium the INYAS
								will have 100 members.
							</li>
							<li>
								The first 20 members will be selected by the
								council of INSA; this will be done by calling
								for applications from among INSA Young Scientist
								awardees up to the age of 40 years. A committee
								consisting of the President, six VicePresidents
								and Executive Director will select 20 members
								among the applicants for final approval by the
								council.
							</li>
							<li>
								Subsequently the INYAS will evolve their own
								procedures of adding new members each year.
							</li>
							<li>
								INSA will allocate Rs. 10 lakh per year for the
								organizational activities of INYAS.
							</li>
							<li>
								INSA will provide modest office space and
								administrative assistance to INYAS. Additional
								funding may be provided for specific programmes
								that fall within the broad activities of INSA.
							</li>
							<li>
								Members of INYAS shall elect a 7 member working
								group, from among their members (with one chair
								and 6 members) that will run the day-to-day
								activities of INYAS.
							</li>
							<li>
								INSA President, the six Vice-Presidents and
								Executive Director shall act as an Advisory
								Board for INYAS.
							</li>
							<li>
								An annual report of the activities of INYAS,
								including utilization of funds, shall be
								presented to the council of INSA every year in
								the December council meeting.
							</li>
							<li>
								It is proposed that INYAS will come into
								existence in the year 2015.
							</li>
						</ul>
					</Card>
					<Card style={{ flexBasis: 300, flexShrink: 0 }}>
						<h3>Events</h3>
					</Card>
				</div>
			</div>
		</div>
	);
};
