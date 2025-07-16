export default function Sidebar({ onSelect }) {
  const menuItems = ["overview", "lobby", "living", "bedroom", "gym", "garden"];
  return (
    <div className="absolute left-0 top-0 h-full w-48 bg-black bg-opacity-70 text-white z-30 p-4">
      <h2 className="text-xl font-bold mb-4">Explore</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item}>
            <button onClick={() => onSelect(item)} className="hover:text-red-400 transition">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}