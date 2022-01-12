
import bg from "../assets/img/bg1.svg"
const HomePage = () => {
  return (
    <div className="homepage-container">
      <img src={bg} alt="background" className="homepage-bg" />
        <p>Use course app for free now</p>
        <a href="/" target="_blank">Start</a>
    </div>
  );
};

export default HomePage;