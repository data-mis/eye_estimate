const Progressbar = (props) => {
  const { bgcolor, completed } = props;

  const styleContainer = {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0de",
    boderRadius: 50,
    margin: 50,
  };

  const styleFillter = {
    height: "100%",
    width: `${completed}`,
    backgroundColor: bgcolor,
    boderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  const styleLable = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={styleContainer}>
      <div style={styleFillter}>
        <span style={styleLable}>{`${completed}%`}</span>
      </div>
    </div>
  );
};
export default Progressbar;
