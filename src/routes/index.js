import HomeSlider from '../components/HomeSlider';
import slider1 from '../images/hero-image-1.webp';
import slider2 from '../images/hero-image-2.webp';
function Index() {
    const sliderImages = [slider1, slider2];
    const slider2Images = [slider2, slider1];
    return (
        <div>
            <div className="mb-4 lg:mb-8">     
                <HomeSlider images={sliderImages} />
            </div>
            <div className="mb-4 lg:mb-8">      
                <HomeSlider images={slider2Images} />
            </div>
        </div>
    );
}

export default Index;