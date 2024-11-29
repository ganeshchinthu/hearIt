function Error({ children }) {
  const styles = {
    color: "red",
    padding: ".1rem .2rem",
    fontSize: "1.7rem",
  };

  return <p style={styles}>{children}</p>;
}

export default Error;
