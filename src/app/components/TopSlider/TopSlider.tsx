const slideText = "OPEN ACCESS JOURNAL"
import styles from './TopSlider.module.css'
const TopSlider = () => {
    return (
            <div className="row">
                <div className="col-md-12 text-center ">
                    <p className={styles.SliderText + " text-start "}> {slideText}</p>
                </div>
            </div>
    );
};

export default TopSlider;
