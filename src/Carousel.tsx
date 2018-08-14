import { css } from "classui/Emotion";
import React = require("react");

var slideIndex = 1;

// Next/previous controls
function plusSlides(n: any) {
	showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n: any) {
	showSlides((slideIndex = n));
}

function showSlides(n: any) {
	var i;
	var slides: any = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		// dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	// dots[slideIndex - 1].className += " active";
}

const cls = css`
	* {
		box-sizing: border-box;
	}

	/* Slideshow container */
	.slideshow-container {
		/* max-width: 1000px; */
		position: relative;
		margin: auto;
	}

	/* Hide the images by default */
	.mySlides {
		display: none;
	}

	/* Next & previous buttons */
	.prev,
	.next {
		cursor: pointer;
		position: absolute;
		top: 50%;
		width: auto;
		margin-top: -22px;
		padding: 16px;
		color: white;
		font-weight: bold;
		font-size: 18px;
		transition: 0.6s ease;
		border-radius: 0 3px 3px 0;
	}

	/* Position the "next button" to the right */
	.next {
		right: 0;
		border-radius: 3px 0 0 3px;
	}

	/* On hover, add a black background color with a little bit see-through */
	.prev:hover,
	.next:hover {
		background-color: rgba(0, 0, 0, 0.8);
	}

	/* Caption text */
	.text {
		color: #f2f2f2;
		font-size: 15px;
		padding: 8px 12px;
		position: absolute;
		bottom: 8px;
		width: 100%;
		text-align: center;
	}

	/* Number text (1/3 etc) */
	.numbertext {
		color: #f2f2f2;
		font-size: 12px;
		padding: 8px 12px;
		position: absolute;
		top: 0;
	}

	/* The dots/bullets/indicators */
	.dot {
		cursor: pointer;
		height: 15px;
		width: 15px;
		margin: 0 2px;
		background-color: #bbb;
		border-radius: 50%;
		display: inline-block;
		transition: background-color 0.6s ease;
	}

	.active,
	.dot:hover {
		background-color: #717171;
	}

	/* Fading animation */
	.fade {
		-webkit-animation-name: fade;
		-webkit-animation-duration: 1.5s;
		animation-name: fade;
		animation-duration: 1.5s;
	}

	@-webkit-keyframes fade {
		from {
			opacity: 0.4;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fade {
		from {
			opacity: 0.4;
		}
		to {
			opacity: 1;
		}
	}
`;

interface IProps {
	slides: {
		img: string;
	}[];
}
export class Carousel extends React.Component<IProps> {
	componentDidMount() {
		showSlides(slideIndex);
	}
	render() {
		return (
			<div className={cls}>
				{/* <!-- Slideshow container --> */}
				<div className="slideshow-container">
					{/* <!-- Full-width images with number and caption text --> */}
					{this.props.slides.map((s, i) => (
						<div key={i} className="mySlides fade">
							<div className="numbertext">
								{i + 1} / {this.props.slides.length}
							</div>
							<img src={s.img} style={{ width: "100%" }} />
							<div className="text">
								{this.props.slides.map((s, i) => (
									<span
										key={i}
										className={`dot ${
											slideIndex - 1 === i ? "active" : ""
										}`}
										onClick={() => currentSlide(i + 1)}
									/>
								))}
							</div>
						</div>
					))}

					{/* <!-- Next and previous buttons --> */}
					<a className={"prev"} onClick={() => plusSlides(-1)}>
						&#10094;
					</a>
					<a className="next" onClick={() => plusSlides(1)}>
						&#10095;
					</a>
				</div>
				<br />

				{/* <!-- The dots/circles --> */}
			</div>
		);
	}
}
