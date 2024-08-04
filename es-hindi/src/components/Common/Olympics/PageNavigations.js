import { olympics_year } from "api/Constant";

const olympics_Navigation = [
  { title: `Olympics ${olympics_year} Home`, path: "/sports/olympics/" },
  { title: `शेड्यूल`, path: "/sports/olympics/schedule/" },
  { title: `नतीजे`, path: "/sports/olympics/results/" },
  { title: `पदक तालिका`, path: "/sports/olympics/medals-tally/" },
  { title: `न्यूज`, path: "/sports/olympics/news/" },
  { title: `फोटो`, path: "/sports/olympics/photos/" },
  { title: `वीडियो`, path: "/sports/olympics/videos/" },
];
const PageNavigations = (props) => {
  return (
    <>
      <div className="page_links">
        {olympics_Navigation?.map((item, index) => {
          return (
            <a
              className={item?.title === props?.title ? "active" : ""}
              href={item?.path}
              key={"nav_" + index}
            >
              {item?.title}
            </a>
          );
        })}
      </div>
      <style jsx>{`
        .page_links {
          width: 100%;
          display: flex;
          align-items: flex-end;
          padding: 0 20px;
          box-sizing: border-box;
          margin-bottom: 23px;
          border-bottom: 3px #e6e6e6 solid;
          background-color: #f5f5f5;
        }
        .page_links a {
          height: 42px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          color: #001d42;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: -0.32px;
          margin-right: 5px;
        }
        .page_links a.active {
          color: #ef4e37;
          font-weight: 700;
          border-bottom: 4px solid #ef4e37;
          margin-bottom: -3px;
        }
        .page_links a:last-child {
          margin-right: 0;
        }
        @media (max-width: 768px) {
          .page_links {
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
            padding: 0 10px;
            margin-bottom: 0;
          }
          .page_links a.active {
            color: #fff;
            background-color: #ef4e37;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
};
export default PageNavigations;
