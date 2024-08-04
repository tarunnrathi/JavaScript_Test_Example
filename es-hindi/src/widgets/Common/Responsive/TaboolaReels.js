const TaboolaReels = () => {
  return (
    <>
      <div id="taboola-mid-video-reel"></div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              window._taboola = window._taboola || [];
              _taboola.push({
              mode: 'video-reel-sc',
              container: 'taboola-mid-video-reel',
              placement: 'Mid Video Reel',
              target_type: 'mix'
              })`,
        }}
      ></script>
    </>
  );
};
export default TaboolaReels;
