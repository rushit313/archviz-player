export default function FloorplanOverlay({ active }) {
  return (
    <div className="absolute bottom-6 right-6 w-80 z-40">
      <img
        src={`/images/floorplans/${active}.png`}
        alt="Floorplan"
        className="w-full h-auto shadow-xl"
      />
    </div>
  );
}