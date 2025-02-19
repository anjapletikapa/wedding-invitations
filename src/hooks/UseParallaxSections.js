import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useParallaxSections = () => {
	useEffect(() => {
		const getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);

		gsap.utils.toArray("section").forEach((section, i) => {
			section.bg = section.querySelector(".bg");

			gsap.fromTo(section.bg, {
					backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
				},
				{
					backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
					ease: "none",
					scrollTrigger: {
						trigger: section,
						start: () => i ? "top bottom" : "top top",
						end: "bottom top",
						scrub: true,
						invalidateOnRefresh: true
					}
				});
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);
};

export default useParallaxSections;
