import tvFrameSvg from "../../assets/TVFrame.png";

const TVVideoSection = ({ videoUrl, videoClassName }) => {
  return (
    <div
      data-aos="fade-left"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-offset="0"
      className="w-full flex flex-col justify-center items-center relative xl:my-[6.5%] 2xl:my-[6.5%]"
    >
      <img src={tvFrameSvg} alt="TV Frame" className="2xl:scale-150" />
      <video
        src={videoUrl}
        autoPlay
        muted
        className={`w-full h-full absolute top-[-7.5%] left-[-6.25%] rounded scale-[0.7] ${videoClassName}`}
      />
    </div>
  );
};

export default TVVideoSection;
