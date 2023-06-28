import AboutImg from "../images/5462433_2808319.jpg";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <img
          src={AboutImg}
          style={{ height: "500px", borderRadius: "25px" }}
          alt="HomeImage"
        />
        <div className="about-details">
          <p style={{ fontSize: "35px", textAlign: "center" }}>About Me</p>
          <p>Name : B. Tharusha Rehan Perera</p>
          <p>Age : 22 Years</p>
          <p>Degree : Undergraduate in BEng(Hons) Software Engineering</p>
          <p>University : Informatics Institute of Technology</p>
          <p>Email : tharushaperera088@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
