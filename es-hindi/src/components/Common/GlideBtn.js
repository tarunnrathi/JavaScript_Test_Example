// import Link from "next/link";

const GlideBtn = ({
  //   isMobile = false,
  data = [],
  className = "trndstorynewbullet",
}) => {
  return (
    <>
      <div data-glide-el="controls[nav]" className={className}>
        {data.map((item, index) => (
          <button
            key={`${item?.story_id}-${index}`}
            type="button"
            data-glide-dir={`=${index}`}
          ></button>
        ))}
      </div>
    </>
  );
};

export default GlideBtn;
