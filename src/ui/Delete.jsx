function Delete({ w = "40px", disabled = false, onClick = () => {} }) {
  return (
    <button
      style={{ border: "none", cursor: "pointer" }}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <img width={w} src="/delete.svg" alt="" />
    </button>
  );
}

export default Delete;
