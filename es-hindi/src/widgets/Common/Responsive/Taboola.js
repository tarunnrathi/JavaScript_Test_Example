const Taboola = (props) => {
  //console.log("props55",props)
  const tabStyle = props.isMobile && props.position;
  return (
    <>
      <div
        className="TABOOLA"
        style={tabStyle ? { minHeight: "300px" } : { minHeight: "600px" }}
      >
        <div id={props.id}></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window._taboola = window._taboola || [];
        _taboola.push({
          mode: "${props.mode}",
          container: "${props.container}",
          placement: "${props.placement}",
          target_type: 'mix'
        })
        `,
          }}
        ></script>
      </div>
    </>
  );
};
export default Taboola;
