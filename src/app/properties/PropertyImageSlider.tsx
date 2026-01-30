import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

interface PropertySliderProps {
    images: string[];
    name: string;
}

function PropertyImageSlider({ images, name }: PropertySliderProps) {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1, spacing: 5 },
    });

    return (
        <div ref={sliderRef} className="keen-slider">
            {images.map((img, i) => (
                <div
                    key={i}
                    className="keen-slider__slide relative h-56 sm:h-72 md:h-72"
                >
                    <Image
                        src={img}
                        alt={`${name}-${i}`}
                        fill
                        className="object-cover rounded-t-xl md:rounded-l-xl"
                    />
                </div>
            ))}
        </div>
    );
}

export default PropertyImageSlider;
