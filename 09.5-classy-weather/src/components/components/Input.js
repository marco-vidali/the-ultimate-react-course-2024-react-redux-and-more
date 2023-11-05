export default function Input({ location, onChangeLocation }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search from location..."
        value={location}
        onChange={(e) => onChangeLocation(e.target.value)}
      />
    </div>
  );
}
