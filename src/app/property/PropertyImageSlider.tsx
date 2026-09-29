import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

interface PropertySliderProps {
    images: string[];
    name: string;
}

function PropertyImageSlider({ images, name }: PropertySliderProps) {
    const validImages =
        Array.isArray(images) && images.length > 0
            ? images
            : ["/assets/about-gallery1.png"];

    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1, spacing: 5 },
    });

    return (
        <div ref={sliderRef} className="keen-slider h-full w-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden bg-gray-100">
            {validImages.map((img, i) => (
                <div
                    key={i}
                    className="keen-slider__slide relative w-full h-full min-h-[220px] overflow-hidden"
                >
                    <Image
                        src={img}
                        alt={`${name}-${i}`}
                        fill
                        unoptimized
                        className="object-cover object-center"
                    />
                </div>
            ))}
        </div>
    );
}

export default PropertyImageSlider;
