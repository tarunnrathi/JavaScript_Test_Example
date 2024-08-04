import moment from "moment";
export const recordsCountWithPostType = (records = []) => {
  const recordsType = {
    text: 0,
    photogallery: 0,
    videos: 0,
    webStory: 0,
  };
  records?.map((item) => {
    if (item.post_type === "text") {
      recordsType.text = recordsType.text + 1;
    }
    if (item.post_type === "photogallery") {
      recordsType.photogallery = recordsType.photogallery + 1;
    }
    if (item.post_type === "videos") {
      recordsType.videos = recordsType.videos + 1;
    }
    if (item.post_type === "webStory") {
      recordsType.webStory = recordsType.webStory + 1;
    }
  });
  return recordsType;
};
export const recordsGroupByWithTime = (records = []) => {
  const recordsGroupBy = {};
  records?.map((item) => {
    const getHour = moment(item?.created_at).format("YYYY-MM-DD HH");
    if (recordsGroupBy[getHour]) {
      recordsGroupBy[getHour].push(item);
    } else {
      recordsGroupBy[getHour] = new Array(item);
    }
  });
  return recordsGroupBy;
};
export function NewsSVG() {
  return (
    <svg
      id="News1_D"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_1575"
            data-name="Rectangle 1575"
            width="22"
            height="22"
            fill="none"
          />
        </clipPath>
      </defs>
      <g id="Group_31" data-name="Group 31" clip-path="url(#clip-path)">
        <path
          id="Path_65"
          data-name="Path 65"
          d="M5.413,12.629V8.838c0-.394.135-.532.521-.532h6.624c.387,0,.522.138.522.532V16.42c0,.4-.136.533-.542.533H5.955c-.413,0-.542-.132-.542-.554v-3.77"
          fill="#2c2c2c"
        />
        <path
          id="Path_66"
          data-name="Path 66"
          d="M2.639,21.44a.457.457,0,0,0-.07-.035,1.5,1.5,0,0,1-1.194-1.541V4.61c0-.416.13-.54.551-.54H3.577V1.081c0-.38.138-.522.512-.522h16.03c.365,0,.507.142.507.507v9.625a.984.984,0,0,1-.007.163.405.405,0,0,1-.8-.007,1.521,1.521,0,0,1-.005-.224V1.39H4.393V19.508a2.228,2.228,0,0,1-.171,1.117H18.969c.591,0,.841-.251.841-.844v-5.16a1.736,1.736,0,0,1,0-.2.405.405,0,0,1,.806,0,1.389,1.389,0,0,1,0,.2V19.76a1.517,1.517,0,0,1-1.234,1.655c-.011,0-.021.016-.03.025ZM2.191,4.887v14.9a1.735,1.735,0,0,0,0,.2.673.673,0,0,0,.463.591.693.693,0,0,0,.919-.718V5.059c0-.058-.008-.116-.012-.173Z"
          fill="#2c2c2c"
        />
        <path
          id="Path_67"
          data-name="Path 67"
          d="M12.1,19.239H5.819a.407.407,0,0,1-.009-.813H18.241q.092,0,.183,0a.405.405,0,0,1,.009.806,1.672,1.672,0,0,1-.224.006H12.1"
          fill="#2c2c2c"
        />
        <path
          id="Path_68"
          data-name="Path 68"
          d="M13.6,4.873c-.149.482-.285.921-.423,1.357a.69.69,0,0,1-.156.278.465.465,0,0,1-.782-.3c-.105-.505-.2-1.011-.3-1.518-.072-.373-.146-.745-.217-1.119a.413.413,0,0,1,.282-.511l.021-.006a.406.406,0,0,1,.482.313.186.186,0,0,1,.006.034c.089.417.169.837.261,1.3.033-.08.055-.123.069-.168.12-.38.238-.759.357-1.146a.412.412,0,0,1,.4-.341.419.419,0,0,1,.408.335c.133.423.26.848.433,1.274.079-.4.156-.807.238-1.21a.414.414,0,0,1,.438-.39.419.419,0,0,1,.243.1.447.447,0,0,1,.12.468c-.1.5-.2,1-.3,1.5-.073.365-.144.732-.22,1.1a.468.468,0,0,1-.451.42.476.476,0,0,1-.475-.37c-.12-.379-.232-.765-.349-1.147-.021-.069-.049-.136-.089-.245"
          fill="#2c2c2c"
        />
        <path
          id="Path_69"
          data-name="Path 69"
          d="M6.23,4.842v1.3c0,.311-.16.5-.414.494s-.4-.19-.4-.489V3.536A.417.417,0,0,1,5.7,3.075a.409.409,0,0,1,.5.216c.371.534.74,1.07,1.139,1.647.01-.1.021-.142.021-.19V3.505a.408.408,0,0,1,.355-.455.471.471,0,0,1,.053,0,.413.413,0,0,1,.406.42l0,.027q.008,1.3,0,2.61a.462.462,0,0,1-.31.474.453.453,0,0,1-.538-.228q-.53-.76-1.054-1.523l-.044.01"
          fill="#2c2c2c"
        />
        <path
          id="Path_70"
          data-name="Path 70"
          d="M17.522,6.637a1.711,1.711,0,0,1-1.206-.509.411.411,0,0,1-.041-.58l0,0a.4.4,0,0,1,.566-.031c.011.01.022.02.032.031a.924.924,0,0,0,.638.274.5.5,0,0,0,.255-.051c.08-.05.181-.139.19-.217a.312.312,0,0,0-.164-.225c-.274-.133-.559-.244-.843-.357a.893.893,0,0,1-.614-.831.956.956,0,0,1,.555-.944,1.57,1.57,0,0,1,1.675.252.406.406,0,0,1-.479.648,2.674,2.674,0,0,0-.459-.209.612.612,0,0,0-.336.029.269.269,0,0,0-.132.176c-.008.033.07.108.124.131.242.106.491.2.734.3a1.1,1.1,0,0,1,.766,1.127,1.186,1.186,0,0,1-1.075.983c-.061.008-.123.007-.19.01"
          fill="#2c2c2c"
        />
        <path
          id="Path_71"
          data-name="Path 71"
          d="M9.819,3.862v.57h.616a.409.409,0,1,1,.079.814.521.521,0,0,1-.079,0H9.82v.569h.664c.3,0,.475.152.481.406s-.174.408-.475.409H9.446a.4.4,0,0,1-.456-.342.418.418,0,0,1,0-.106q0-1.346,0-2.691a.405.405,0,0,1,.356-.449.394.394,0,0,1,.1,0q.53,0,1.06,0a.4.4,0,0,1,.451.35.608.608,0,0,1,0,.061c0,.248-.175.4-.461.4H9.812"
          fill="#2c2c2c"
        />
        <path
          id="Path_72"
          data-name="Path 72"
          d="M16.526,9.122H14.8c-.3,0-.485-.154-.491-.4s.183-.416.492-.416h3.5c.3,0,.485.152.491.4s-.185.417-.492.418H16.525"
          fill="#2c2c2c"
        />
        <path
          id="Path_73"
          data-name="Path 73"
          d="M16.555,10.264h1.75c.3,0,.483.158.484.4s-.184.41-.474.411H14.793c-.294,0-.482-.159-.484-.405s.183-.409.475-.41h1.771"
          fill="#2c2c2c"
        />
        <path
          id="Path_74"
          data-name="Path 74"
          d="M16.526,13.037H14.8c-.3,0-.485-.154-.491-.4s.183-.416.492-.416h3.5c.3,0,.485.152.491.4s-.185.417-.492.418H16.525"
          fill="#2c2c2c"
        />
        <path
          id="Path_75"
          data-name="Path 75"
          d="M16.525,14.995H14.8c-.3,0-.485-.156-.489-.4s.183-.414.492-.414h3.5c.3,0,.484.152.489.4s-.19.416-.493.416H16.524"
          fill="#2c2c2c"
        />
        <path
          id="Path_76"
          data-name="Path 76"
          d="M16.57,16.137H18.3c.308,0,.5.164.491.418s-.19.4-.491.4H14.8c-.3,0-.485-.153-.491-.4s.183-.417.491-.417h1.771"
          fill="#2c2c2c"
        />
        <path
          id="Path_77"
          data-name="Path 77"
          d="M20.624,12.635a.406.406,0,1,1-.4-.41h.011a.412.412,0,0,1,.391.41"
          fill="#2c2c2c"
        />
      </g>
    </svg>
  );
}
export function PhotoGallerySVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
    >
      <g id="Photo1_D" transform="translate(0.366 0.366)">
        <rect
          id="Rectangle_1563"
          data-name="Rectangle 1563"
          width="22"
          height="22"
          transform="translate(-0.366 -0.366)"
          fill="none"
        />
        <path
          id="Path_30"
          data-name="Path 30"
          d="M20.519,13.295c-.032.112-.062.226-.1.339a2.017,2.017,0,0,1-1.843,1.4c-.092,0-.183,0-.274,0-4.524,0-9.05-.009-13.575.007a2.163,2.163,0,0,1-2.09-1.287,2.058,2.058,0,0,1-.112-.884q-.011-5.028,0-10.054A3.4,3.4,0,0,1,2.55,2.4,2.018,2.018,0,0,1,4.445.646c.1,0,.2,0,.294,0H18.292a2.031,2.031,0,0,1,2.2,1.7c0,.012.017.022.026.032Zm-1.357-3.5c0-.091.007-.13.007-.17q0-3.457,0-6.916a.679.679,0,0,0-.754-.715q-6.893,0-13.788,0a.683.683,0,0,0-.754.76q0,4.437,0,8.876c0,.05.01.1.019.179.074-.069.124-.117.173-.166q1.35-1.348,2.7-2.7a1.591,1.591,0,0,1,2.328.007c.339.343.682.684,1.034,1.036.3-.356.583-.7.865-1.036Q12.2,7.5,13.4,6.052a1.614,1.614,0,0,1,1.689-.6,1.752,1.752,0,0,1,.935.682c1.031,1.207,2.065,2.412,3.134,3.658M4.114,13.514a.738.738,0,0,0,.58.172H17.3c.394,0,.787.006,1.181,0a.663.663,0,0,0,.685-.7c0-.288-.01-.577,0-.865a.575.575,0,0,0-.162-.431q-2.036-2.365-4.063-4.736c-.225-.262-.32-.261-.545.01q-1.822,2.187-3.642,4.373a.694.694,0,0,1-1.152.046q-.716-.716-1.431-1.431c-.235-.237-.275-.237-.509,0q-1.707,1.7-3.414,3.414c-.048.048-.094.1-.141.151"
          transform="translate(1.115 0.284)"
          fill="#2c2c2c"
        />
        <path
          id="Path_31"
          data-name="Path 31"
          d="M15.749,18.236c-.3-.074-.789-.189-1.276-.32Q8.05,16.2,1.626,14.476A2.033,2.033,0,0,1,.109,11.92Q.847,9.045,1.6,6.177a.678.678,0,0,1,.619-.57.624.624,0,0,1,.672.431.979.979,0,0,1,0,.492q-.72,2.812-1.458,5.622c-.151.578.019.881.593,1.034q6.83,1.83,13.661,3.658a.681.681,0,0,0,.935-.548c.147-.583.288-1.17.436-1.755a.676.676,0,1,1,1.308.317c-.15.627-.3,1.255-.467,1.879a2.076,2.076,0,0,1-2.156,1.5"
          transform="translate(0.015 2.479)"
          fill="#2c2c2c"
        />
        <path
          id="Path_34"
          data-name="Path 34"
          d="M6.2,6.108A1.8,1.8,0,1,1,8,4.311,1.8,1.8,0,0,1,6.2,6.108M6.2,4.756a.445.445,0,0,0,.449-.434.449.449,0,0,0-.9-.02.447.447,0,0,0,.45.454"
          transform="translate(1.943 1.112)"
          fill="#2c2c2c"
        />
      </g>
    </svg>
  );
}
export function VideoSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
    >
      <g id="Video1_D" transform="translate(0.079 0.079)">
        <rect
          id="Rectangle_1564"
          data-name="Rectangle 1564"
          width="22"
          height="22"
          transform="translate(-0.079 -0.079)"
          fill="none"
        />
        <path
          id="Path_36"
          data-name="Path 36"
          d="M21.921,4.613V15.659a.743.743,0,0,0-.041.117,3.2,3.2,0,0,1-3.164,2.708q-7.756.007-15.511,0a3.207,3.207,0,0,1-3.1-2.394C.067,15.947.035,15.8,0,15.659V4.613A.734.734,0,0,0,.039,4.5,3.2,3.2,0,0,1,3.183,1.789q7.777-.009,15.555,0A3.192,3.192,0,0,1,21.8,4.142c.044.156.08.314.12.471M10.938,17.2H18.6a1.93,1.93,0,0,0,2.036-2.024q0-5.04,0-10.082A1.93,1.93,0,0,0,18.6,3.071H3.319A1.93,1.93,0,0,0,1.285,5.115v10.04A1.932,1.932,0,0,0,3.341,17.2h7.6"
          transform="translate(0 0.824)"
          fill="#2c2c2c"
        />
        <path
          id="Path_40"
          data-name="Path 40"
          d="M5.743,8.718c0-1.035,0-2.069,0-3.1a.689.689,0,0,1,.336-.668.677.677,0,0,1,.742.07Q9.282,6.562,11.749,8.1a.66.66,0,0,1,0,1.229Q9.286,10.873,6.82,12.414a.677.677,0,0,1-.742.073.686.686,0,0,1-.338-.666c.006-1.033,0-2.068,0-3.1m1.295,2.046,3.273-2.049L7.038,6.669Z"
          transform="translate(2.648 2.244)"
          fill="#2c2c2c"
        />
      </g>
    </svg>
  );
}
export function WebStory() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="23.467"
      viewBox="0 0 22 23.467"
    >
      <g id="Web_Story1_D" transform="translate(0 -0.5)">
        <rect
          id="Rectangle"
          width="22"
          height="23"
          transform="translate(0 0.5)"
          fill="none"
        />
        <g id="Group_1577" data-name="Group 1577" transform="translate(0 0.5)">
          <g
            id="Path_1431"
            data-name="Path 1431"
            transform="translate(5.133)"
            fill="none"
          >
            <path
              d="M2.347,0h7.04a2.347,2.347,0,0,1,2.347,2.347V21.12a2.347,2.347,0,0,1-2.347,2.347H2.347A2.347,2.347,0,0,1,0,21.12V2.347A2.347,2.347,0,0,1,2.347,0Z"
              stroke="none"
            />
            <path
              d="M 2.34666633605957 1.000003814697266 C 1.604106903076172 1.000003814697266 0.9999971389770508 1.604114532470703 0.9999971389770508 2.346664428710938 L 0.9999971389770508 21.12000274658203 C 0.9999971389770508 21.86255264282227 1.604106903076172 22.4666633605957 2.34666633605957 22.4666633605957 L 9.386667251586914 22.4666633605957 C 10.12922668457031 22.4666633605957 10.73333644866943 21.86255264282227 10.73333644866943 21.12000274658203 L 10.73333644866943 2.346664428710938 C 10.73333644866943 1.604114532470703 10.12922668457031 1.000003814697266 9.386667251586914 1.000003814697266 L 2.34666633605957 1.000003814697266 M 2.34666633605957 3.814697265625e-06 L 9.386667251586914 3.814697265625e-06 C 10.68269729614258 3.814697265625e-06 11.73333644866943 1.050634384155273 11.73333644866943 2.346664428710938 L 11.73333644866943 21.12000274658203 C 11.73333644866943 22.41602325439453 10.68269729614258 23.4666633605957 9.386667251586914 23.4666633605957 L 2.34666633605957 23.4666633605957 C 1.050637245178223 23.4666633605957 -2.86102294921875e-06 22.41602325439453 -2.86102294921875e-06 21.12000274658203 L -2.86102294921875e-06 2.346664428710938 C -2.86102294921875e-06 1.050634384155273 1.050637245178223 3.814697265625e-06 2.34666633605957 3.814697265625e-06 Z"
              stroke="none"
              fill="#2c2c2c"
            />
          </g>
          <path
            id="Path_1430"
            data-name="Path 1430"
            d="M2.933,0V17.6A2.748,2.748,0,0,1,0,15.086V2.514A2.748,2.748,0,0,1,2.933,0Z"
            transform="translate(0 3)"
            fill="#2c2c2c"
          />
          <path
            id="Path_1429"
            data-name="Path 1429"
            d="M0,0A2.748,2.748,0,0,1,2.933,2.514V15.086A2.748,2.748,0,0,1,0,17.6Z"
            transform="translate(19.067 3)"
            fill="#2c2c2c"
          />
        </g>
      </g>
    </svg>
  );
}
export function NewsSVGData() {
  return (
    <svg
      id="News1_D"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 22 22"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_1575"
            data-name="Rectangle 1575"
            width="22"
            height="22"
            fill="#ed1c24"
          />
        </clipPath>
      </defs>
      <g id="Group_31" data-name="Group 31" clip-path="url(#clip-path)">
        <path
          id="Path_65"
          data-name="Path 65"
          d="M5.413,12.629V8.838c0-.394.135-.532.521-.532h6.624c.387,0,.522.138.522.532V16.42c0,.4-.136.533-.542.533H5.955c-.413,0-.542-.132-.542-.554v-3.77"
          fill="#ed1c24"
        />
        <path
          id="Path_66"
          data-name="Path 66"
          d="M2.639,21.44a.457.457,0,0,0-.07-.035,1.5,1.5,0,0,1-1.194-1.541V4.61c0-.416.13-.54.551-.54H3.577V1.081c0-.38.138-.522.512-.522h16.03c.365,0,.507.142.507.507v9.625a.984.984,0,0,1-.007.163.405.405,0,0,1-.8-.007,1.521,1.521,0,0,1-.005-.224V1.39H4.393V19.508a2.228,2.228,0,0,1-.171,1.117H18.969c.591,0,.841-.251.841-.844v-5.16a1.736,1.736,0,0,1,0-.2.405.405,0,0,1,.806,0,1.389,1.389,0,0,1,0,.2V19.76a1.517,1.517,0,0,1-1.234,1.655c-.011,0-.021.016-.03.025ZM2.191,4.887v14.9a1.735,1.735,0,0,0,0,.2.673.673,0,0,0,.463.591.693.693,0,0,0,.919-.718V5.059c0-.058-.008-.116-.012-.173Z"
          fill="#ed1c24"
        />
        <path
          id="Path_67"
          data-name="Path 67"
          d="M12.1,19.239H5.819a.407.407,0,0,1-.009-.813H18.241q.092,0,.183,0a.405.405,0,0,1,.009.806,1.672,1.672,0,0,1-.224.006H12.1"
          fill="#ed1c24"
        />
        <path
          id="Path_68"
          data-name="Path 68"
          d="M13.6,4.873c-.149.482-.285.921-.423,1.357a.69.69,0,0,1-.156.278.465.465,0,0,1-.782-.3c-.105-.505-.2-1.011-.3-1.518-.072-.373-.146-.745-.217-1.119a.413.413,0,0,1,.282-.511l.021-.006a.406.406,0,0,1,.482.313.186.186,0,0,1,.006.034c.089.417.169.837.261,1.3.033-.08.055-.123.069-.168.12-.38.238-.759.357-1.146a.412.412,0,0,1,.4-.341.419.419,0,0,1,.408.335c.133.423.26.848.433,1.274.079-.4.156-.807.238-1.21a.414.414,0,0,1,.438-.39.419.419,0,0,1,.243.1.447.447,0,0,1,.12.468c-.1.5-.2,1-.3,1.5-.073.365-.144.732-.22,1.1a.468.468,0,0,1-.451.42.476.476,0,0,1-.475-.37c-.12-.379-.232-.765-.349-1.147-.021-.069-.049-.136-.089-.245"
          fill="#ed1c24"
        />
        <path
          id="Path_69"
          data-name="Path 69"
          d="M6.23,4.842v1.3c0,.311-.16.5-.414.494s-.4-.19-.4-.489V3.536A.417.417,0,0,1,5.7,3.075a.409.409,0,0,1,.5.216c.371.534.74,1.07,1.139,1.647.01-.1.021-.142.021-.19V3.505a.408.408,0,0,1,.355-.455.471.471,0,0,1,.053,0,.413.413,0,0,1,.406.42l0,.027q.008,1.3,0,2.61a.462.462,0,0,1-.31.474.453.453,0,0,1-.538-.228q-.53-.76-1.054-1.523l-.044.01"
          fill="#ed1c24"
        />
        <path
          id="Path_70"
          data-name="Path 70"
          d="M17.522,6.637a1.711,1.711,0,0,1-1.206-.509.411.411,0,0,1-.041-.58l0,0a.4.4,0,0,1,.566-.031c.011.01.022.02.032.031a.924.924,0,0,0,.638.274.5.5,0,0,0,.255-.051c.08-.05.181-.139.19-.217a.312.312,0,0,0-.164-.225c-.274-.133-.559-.244-.843-.357a.893.893,0,0,1-.614-.831.956.956,0,0,1,.555-.944,1.57,1.57,0,0,1,1.675.252.406.406,0,0,1-.479.648,2.674,2.674,0,0,0-.459-.209.612.612,0,0,0-.336.029.269.269,0,0,0-.132.176c-.008.033.07.108.124.131.242.106.491.2.734.3a1.1,1.1,0,0,1,.766,1.127,1.186,1.186,0,0,1-1.075.983c-.061.008-.123.007-.19.01"
          fill="#ed1c24"
        />
        <path
          id="Path_71"
          data-name="Path 71"
          d="M9.819,3.862v.57h.616a.409.409,0,1,1,.079.814.521.521,0,0,1-.079,0H9.82v.569h.664c.3,0,.475.152.481.406s-.174.408-.475.409H9.446a.4.4,0,0,1-.456-.342.418.418,0,0,1,0-.106q0-1.346,0-2.691a.405.405,0,0,1,.356-.449.394.394,0,0,1,.1,0q.53,0,1.06,0a.4.4,0,0,1,.451.35.608.608,0,0,1,0,.061c0,.248-.175.4-.461.4H9.812"
          fill="#ed1c24"
        />
        <path
          id="Path_72"
          data-name="Path 72"
          d="M16.526,9.122H14.8c-.3,0-.485-.154-.491-.4s.183-.416.492-.416h3.5c.3,0,.485.152.491.4s-.185.417-.492.418H16.525"
          fill="#ed1c24"
        />
        <path
          id="Path_73"
          data-name="Path 73"
          d="M16.555,10.264h1.75c.3,0,.483.158.484.4s-.184.41-.474.411H14.793c-.294,0-.482-.159-.484-.405s.183-.409.475-.41h1.771"
          fill="#ed1c24"
        />
        <path
          id="Path_74"
          data-name="Path 74"
          d="M16.526,13.037H14.8c-.3,0-.485-.154-.491-.4s.183-.416.492-.416h3.5c.3,0,.485.152.491.4s-.185.417-.492.418H16.525"
          fill="#ed1c24"
        />
        <path
          id="Path_75"
          data-name="Path 75"
          d="M16.525,14.995H14.8c-.3,0-.485-.156-.489-.4s.183-.414.492-.414h3.5c.3,0,.484.152.489.4s-.19.416-.493.416H16.524"
          fill="#ed1c24"
        />
        <path
          id="Path_76"
          data-name="Path 76"
          d="M16.57,16.137H18.3c.308,0,.5.164.491.418s-.19.4-.491.4H14.8c-.3,0-.485-.153-.491-.4s.183-.417.491-.417h1.771"
          fill="#ed1c24"
        />
        <path
          id="Path_77"
          data-name="Path 77"
          d="M20.624,12.635a.406.406,0,1,1-.4-.41h.011a.412.412,0,0,1,.391.41"
          fill="#ed1c24"
        />
      </g>
    </svg>
  );
}
export function PhotoGallerySVGData() {
  return (
    <svg
      id="Photo"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
    >
      <rect
        id="Rectangle_1563"
        data-name="Rectangle 1563"
        width="15"
        height="15"
        fill="#fff"
      />
      <path
        id="Path_30"
        data-name="Path 30"
        d="M15,9.415c-.022.078-.043.157-.068.235a1.4,1.4,0,0,1-1.278.968l-.19,0c-3.137,0-6.275-.006-9.412.005A1.5,1.5,0,0,1,2.6,9.734a1.427,1.427,0,0,1-.078-.613q-.008-3.486,0-6.971a2.356,2.356,0,0,1,.018-.291A1.4,1.4,0,0,1,3.855.645c.068,0,.136,0,.2,0h9.4A1.408,1.408,0,0,1,14.982,1.82c0,.008.012.015.018.022Zm-.941-2.427c0-.063.005-.09.005-.118q0-2.4,0-4.795a.471.471,0,0,0-.523-.5q-4.779,0-9.56,0a.474.474,0,0,0-.523.527q0,3.077,0,6.154c0,.035.007.07.013.124.051-.048.086-.081.12-.115q.936-.935,1.872-1.87a1.1,1.1,0,0,1,1.614,0c.235.238.473.474.717.718l.6-.718q.837-1,1.673-2.011a1.119,1.119,0,0,1,1.171-.414,1.215,1.215,0,0,1,.648.473c.715.837,1.432,1.672,2.173,2.536M3.626,9.567a.512.512,0,0,0,.4.119H12.77c.273,0,.546,0,.819,0a.459.459,0,0,0,.475-.483c0-.2-.007-.4,0-.6a.4.4,0,0,0-.112-.3q-1.411-1.639-2.817-3.284c-.156-.182-.222-.181-.378.007Q9.5,6.541,8.235,8.057a.481.481,0,0,1-.8.032q-.5-.5-.992-.992c-.163-.164-.191-.164-.353,0L3.724,9.462c-.033.033-.065.069-.1.105"
        fill="#ed1c24"
      />
      <path
        id="Path_31"
        data-name="Path 31"
        d="M10.93,14.363c-.208-.051-.547-.131-.885-.222Q5.592,12.95,1.138,11.756A1.41,1.41,0,0,1,.086,9.984Q.6,7.99,1.122,6a.47.47,0,0,1,.429-.395.433.433,0,0,1,.466.3.679.679,0,0,1,0,.341q-.5,1.95-1.011,3.9c-.1.4.013.611.411.717L10.892,13.4a.472.472,0,0,0,.648-.38c.1-.4.2-.811.3-1.217a.468.468,0,1,1,.907.22c-.1.435-.208.87-.324,1.3a1.439,1.439,0,0,1-1.495,1.039"
        fill="#ed1c24"
      />
      <path
        id="Path_34"
        data-name="Path 34"
        d="M5.648,5.006A1.246,1.246,0,1,1,6.891,3.76,1.25,1.25,0,0,1,5.648,5.006m0-.937a.309.309,0,0,0,.311-.3.312.312,0,0,0-.623-.014.31.31,0,0,0,.312.315"
        fill="#ed1c24"
      />
    </svg>
  );
}
export function VideoSVGData() {
  return (
    <svg
      id="Video1_D"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
    >
      <rect
        id="Rectangle_1564"
        data-name="Rectangle 1564"
        width="15"
        height="15"
        fill="#fff"
      />
      <path
        id="Path_36"
        data-name="Path 36"
        d="M15,3.72v7.559a.508.508,0,0,0-.028.08,2.191,2.191,0,0,1-2.165,1.853q-5.307,0-10.614,0A2.194,2.194,0,0,1,.072,11.574c-.026-.1-.048-.2-.072-.3V3.72a.5.5,0,0,0,.027-.08A2.19,2.19,0,0,1,2.178,1.788q5.322-.006,10.644,0a2.184,2.184,0,0,1,2.1,1.61c.03.107.055.215.082.322M7.485,12.334h5.243a1.321,1.321,0,0,0,1.393-1.385q0-3.449,0-6.9a1.321,1.321,0,0,0-1.392-1.385H2.271a1.321,1.321,0,0,0-1.392,1.4v6.87a1.322,1.322,0,0,0,1.407,1.4h5.2"
        fill="#ed1c24"
      />
      <path
        id="Path_40"
        data-name="Path 40"
        d="M5.742,7.5c0-.708,0-1.416,0-2.124a.471.471,0,0,1,.23-.457.463.463,0,0,1,.508.048Q8.164,6.025,9.852,7.079a.452.452,0,0,1,0,.841Q8.167,8.976,6.479,10.03a.463.463,0,0,1-.508.05.47.47,0,0,1-.231-.456c0-.707,0-1.415,0-2.123m.886,1.4,2.24-1.4L6.628,6.1Z"
        fill="#ed1c24"
      />
    </svg>
  );
}
export function LiveBlogSVGData() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
    >
      <g id="Live_D" transform="translate(-1020 -974)">
        <rect
          id="Rectangle_1565"
          data-name="Rectangle 1565"
          width="15"
          height="15"
          transform="translate(1020 974)"
          fill="#fff"
        />
        <circle
          id="Ellipse_549"
          data-name="Ellipse 549"
          cx="6"
          cy="6"
          r="6"
          transform="translate(1022 976)"
          fill="#ed1c24"
          opacity="0.2"
        />
        <circle
          id="Ellipse_550"
          data-name="Ellipse 550"
          cx="3"
          cy="3"
          r="3"
          transform="translate(1025 979)"
          fill="#ed1c24"
        />
      </g>
    </svg>
  );
}
export function WebStorySVGData() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
    >
      <g id="Web_Story_D" transform="translate(0 -0.5)">
        <rect
          id="Rectangle"
          width="15"
          height="16"
          transform="translate(0 0.5)"
          fill="#fff"
        />
        <g id="Group_1577" data-name="Group 1577" transform="translate(-3 -1)">
          <g
            id="Path_1431"
            data-name="Path 1431"
            transform="translate(6.5 1.5)"
            fill="none"
          >
            <path
              d="M1.6,0H6.4A1.6,1.6,0,0,1,8,1.6V14.4A1.6,1.6,0,0,1,6.4,16H1.6A1.6,1.6,0,0,1,0,14.4V1.6A1.6,1.6,0,0,1,1.6,0Z"
              stroke="none"
            />
            <path
              d="M 1.599999904632568 1 C 1.26915979385376 1 1 1.269160270690918 1 1.600000381469727 L 1 14.39999961853027 C 1 14.73083972930908 1.26915979385376 15 1.599999904632568 15 L 6.400000095367432 15 C 6.730839729309082 15 7 14.73083972930908 7 14.39999961853027 L 7 1.600000381469727 C 7 1.269160270690918 6.730839729309082 1 6.400000095367432 1 L 1.599999904632568 1 M 1.599999904632568 0 L 6.400000095367432 0 C 7.283659934997559 0 8 0.7163400650024414 8 1.600000381469727 L 8 14.39999961853027 C 8 15.28365039825439 7.283659934997559 16 6.400000095367432 16 L 1.599999904632568 16 C 0.7163400650024414 16 0 15.28365039825439 0 14.39999961853027 L 0 1.600000381469727 C 0 0.7163400650024414 0.7163400650024414 0 1.599999904632568 0 Z"
              stroke="none"
              fill="#ed1b25"
            />
          </g>
          <path
            id="Path_1430"
            data-name="Path 1430"
            d="M2,0V12a1.874,1.874,0,0,1-2-1.714V1.714A1.874,1.874,0,0,1,2,0Z"
            transform="translate(3 3.5)"
            fill="#ed1b25"
          />
          <path
            id="Path_1429"
            data-name="Path 1429"
            d="M0,0A1.874,1.874,0,0,1,2,1.714v8.571A1.874,1.874,0,0,1,0,12Z"
            transform="translate(16 3.5)"
            fill="#ed1b25"
          />
        </g>
      </g>
    </svg>
  );
}
export function Refresh() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.695"
      height="14.695"
      viewBox="0 0 14.695 14.695"
    >
      <path
        id="Refresh"
        d="M5.2-13.449A7.749,7.749,0,0,0,2.857-15,7.772,7.772,0,0,0,0-15.6a7.35,7.35,0,0,0-5.2,2.148,7.35,7.35,0,0,0-2.148,5.2A7.35,7.35,0,0,0-5.2-3.051,7.35,7.35,0,0,0,0-.9,7.248,7.248,0,0,0,4.533-2.471,7.32,7.32,0,0,0,7.09-6.4H5.2a5.437,5.437,0,0,1-2,2.621A5.645,5.645,0,0,1,0-2.75,5.432,5.432,0,0,1-3.889-4.361,5.432,5.432,0,0,1-5.5-8.25a5.432,5.432,0,0,1,1.611-3.889A5.432,5.432,0,0,1,0-13.75a5.33,5.33,0,0,1,2.148.43,5.178,5.178,0,0,1,1.719,1.2L.9-9.152H7.348V-15.6Z"
        transform="translate(7.348 15.598)"
        fill="#3e3e3e"
      />
    </svg>
  );
}
export function truncateString(str="", num) {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}