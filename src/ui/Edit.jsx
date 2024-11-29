function Edit({ w = "40px", onClick = () => {}, disabled = false }) {
  return (
    <button
      disabled={disabled}
      style={{ border: "none" }}
      onClick={onClick}
      type="button"
    >
      <img width={w} style={{ cursor: "pointer" }} src="/edit.svg" />
    </button>
  );
}

export default Edit;
