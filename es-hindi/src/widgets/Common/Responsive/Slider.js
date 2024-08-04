import React, { useEffect, useState } from "react";
import Glide from '@glidejs/glide';
import "node_modules/@glidejs/glide/dist/css/glide.core.min.css";
import "node_modules/@glidejs/glide/dist/css/glide.theme.min.css";

const Slider = (prop) => {
    // const [slides, setSlides] = useState([]);

    useEffect(() => {
        new Glide('.glide').mount();
    }, []);

    return (
        <div className="glide">
            <div data-glide-el="track" className="glide__track">
                <ul className="glide__slides">
                    {
                        prop.slides.map((slide, key) => {
                            <li className="glide__slide">
                                <a href={slide.href ? slide.href : '#'}>{slide.title}</a>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Slider;
