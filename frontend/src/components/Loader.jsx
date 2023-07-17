import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

function Loader() {
  return (
    <>
      <div style={override}>
        <RingLoader
          color="#0183c7"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}

export default Loader;
