import { navigation } from "../data/navigation";

export default function PlaceholderPage({ page }) {
  const navItem = navigation.find((item) => item.id === page);

  return (
    <div className="placeholder-page">
      <div className="placeholder-icon">{navItem?.icon}</div>
      <span className="page-eyebrow">FRAMEWORK ACTIVE</span>
      <h2>{navItem?.label}</h2>
      <p>
        This module is connected to the MatchVision navigation framework and
        will be built next.
      </p>
      <div className="placeholder-status">
        <span />
        Navigation working correctly
      </div>
    </div>
  );
}
