import { useEffect, useMemo, useState } from "react";
import "./Equipment.css";

const defaultKit = [
  { id: "balls", name: "Size 4 footballs", required: 12, reason: "One ball per pair plus spares." },
  { id: "cones", name: "Flat marker cones", required: 24, reason: "Recovery lanes, target gates and pitch boundaries." },
  { id: "red-bibs", name: "Red bibs", required: 7, reason: "One team for opposed activities." },
  { id: "blue-bibs", name: "Blue bibs", required: 7, reason: "Second team for opposed activities." },
  { id: "mini-goals", name: "Mini goals", required: 4, reason: "Transition targets and conditioned games." },
  { id: "poles", name: "Agility poles", required: 6, reason: "Recovery gates and scanning cues." },
  { id: "first-aid", name: "First-aid kit", required: 1, reason: "Mandatory safety item." },
];

const startingInventory = [
  { id: "balls", name: "Size 4 footballs", category: "Balls", total: 24, available: 18, out: 6, maintenance: 0, location: "Equipment Room A", code: "SCSC-BALL-04" },
  { id: "cones", name: "Flat marker cones", category: "Markers", total: 60, available: 44, out: 16, maintenance: 0, location: "Shelf A2", code: "SCSC-CONE-FLAT" },
  { id: "red-bibs", name: "Red bibs", category: "Bibs", total: 20, available: 14, out: 6, maintenance: 0, location: "Locker B1", code: "SCSC-BIB-RED" },
  { id: "blue-bibs", name: "Blue bibs", category: "Bibs", total: 20, available: 12, out: 8, maintenance: 0, location: "Locker B2", code: "SCSC-BIB-BLUE" },
  { id: "mini-goals", name: "Mini goals", category: "Goals", total: 6, available: 4, out: 2, maintenance: 0, location: "Storage Cage", code: "SCSC-GOAL-MINI" },
  { id: "poles", name: "Agility poles", category: "Agility", total: 12, available: 8, out: 4, maintenance: 0, location: "Equipment Room A", code: "SCSC-POLE-AG" },
  { id: "first-aid", name: "First-aid kit", category: "Safety", total: 5, available: 3, out: 2, maintenance: 0, location: "Medical Cabinet", code: "SCSC-FIRST-AID" },
  { id: "pump", name: "Electric ball pump", category: "Accessories", total: 2, available: 1, out: 1, maintenance: 0, location: "Equipment Desk", code: "SCSC-PUMP-EL" },
];

const startingTransactions = [
  { id: 1, itemId: "balls", item: "Size 4 footballs", quantity: 6, coach: "Lisa Pitsos", team: "U11 Wallabies", status: "Checked out", due: "Today · 8:30 PM" },
  { id: 2, itemId: "blue-bibs", item: "Blue bibs", quantity: 8, coach: "Daniel Brooks", team: "U13 Boys", status: "Checked out", due: "Today · 8:00 PM" },
  { id: 3, itemId: "poles", item: "Agility poles", quantity: 4, coach: "Alicia Tran", team: "U12 Girls", status: "Overdue", due: "Yesterday · 8:00 PM" },
];

export default function Equipment({ role = "coach", user, onNavigate }) {
  const [inventory, setInventory] = useState(startingInventory);
  const [kit, setKit] = useState(defaultKit);
  const [sessionName, setSessionName] = useState("Defensive transitions and compact recovery");
  const [transactions, setTransactions] = useState(startingTransactions);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All status");
  const [reserved, setReserved] = useState(false);
  const [modal, setModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("matchvisionSavedSession") || "null");
      const recommended = JSON.parse(localStorage.getItem("matchvisionRecommendedSession") || "null");
      if (saved?.title) setSessionName(saved.title);
      else if (recommended?.title) setSessionName(recommended.title);
      if (Array.isArray(saved?.equipment)) setKit(saved.equipment);
      else if (Array.isArray(recommended?.equipment)) setKit(recommended.equipment);
    } catch {
      // Demo defaults remain available.
    }
  }, []);

  const filtered = useMemo(() => inventory.filter((item) => {
    const text = `${item.name} ${item.category} ${item.location} ${item.code}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory = category === "All categories" || item.category === category;
    const matchesStatus = status === "All status" || (status === "Available" && item.available > 0) || (status === "Checked out" && item.out > 0) || (status === "Maintenance" && item.maintenance > 0);
    return matchesSearch && matchesCategory && matchesStatus;
  }), [inventory, search, category, status]);

  const readiness = useMemo(() => {
    const required = kit.reduce((sum, item) => sum + item.required, 0);
    const ready = kit.reduce((sum, item) => {
      const stock = inventory.find((entry) => entry.id === item.id);
      return sum + Math.min(item.required, stock?.available || 0);
    }, 0);
    return required ? Math.round((ready / required) * 100) : 100;
  }, [inventory, kit]);

  const shortages = kit.filter((item) => (inventory.find((entry) => entry.id === item.id)?.available || 0) < item.required);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  }

  function checkout(item, amount) {
    if (!item || amount < 1 || amount > item.available) return;
    setInventory((current) => current.map((entry) => entry.id === item.id ? { ...entry, available: entry.available - amount, out: entry.out + amount } : entry));
    setTransactions((current) => [{ id: Date.now(), itemId: item.id, item: item.name, quantity: amount, coach: user?.name || "Lisa Pitsos", team: "U11 Wallabies", status: "Checked out", due: "Today · 8:30 PM" }, ...current]);
    setModal(null);
    notify(`${amount} × ${item.name} checked out`);
  }

  function checkoutCompleteKit() {
    const items = kit.map((required) => {
      const stock = inventory.find((entry) => entry.id === required.id);
      return { stock, amount: Math.min(required.required, stock?.available || 0) };
    }).filter((entry) => entry.stock && entry.amount > 0);

    setInventory((current) => current.map((entry) => {
      const match = items.find((item) => item.stock.id === entry.id);
      return match ? { ...entry, available: entry.available - match.amount, out: entry.out + match.amount } : entry;
    }));

    setTransactions((current) => [
      ...items.map((entry, index) => ({ id: Date.now() + index, itemId: entry.stock.id, item: entry.stock.name, quantity: entry.amount, coach: user?.name || "Lisa Pitsos", team: "U11 Wallabies", status: "Checked out", due: "Today · 8:30 PM" })),
      ...current,
    ]);
    notify(`${items.length} equipment groups checked out for the AI session`);
  }

  function returnTransaction(transaction) {
    setInventory((current) => current.map((entry) => entry.id === transaction.itemId ? { ...entry, available: entry.available + transaction.quantity, out: Math.max(0, entry.out - transaction.quantity) } : entry));
    setTransactions((current) => current.map((entry) => entry.id === transaction.id ? { ...entry, status: "Returned", due: "Returned just now" } : entry));
    setModal(null);
    notify(`${transaction.item} returned`);
  }

  function markMaintenance(item) {
    setInventory((current) => current.map((entry) => entry.id === item.id ? { ...entry, available: Math.max(0, entry.available - 1), maintenance: entry.maintenance + 1 } : entry));
    setModal(null);
    notify(`${item.name} sent for inspection`);
  }

  return (
    <div className="equipment-page">
      <section className="equipment-hero">
        <div>
          <span>EQUIPMENT CONTROL · AI SESSION LINK</span>
          <h2>The session plan prepares the equipment room automatically.</h2>
          <p>MatchVision converts recommended drills into a kit list, checks availability, records collection and return, and alerts the club to shortages or overdue items.</p>
        </div>
        <div className="readiness-score"><strong>{readiness}%</strong><span>Session equipment ready</span><small>{shortages.length ? `${shortages.length} shortage alert${shortages.length === 1 ? "" : "s"}` : "Everything available"}</small></div>
      </section>

      <section className="equipment-alert-row">
        <div><span>✦ AI SESSION DETECTED</span><strong>{sessionName}</strong><p>Equipment calculated from selected drills, session length and player count.</p></div>
        <button className="equipment-primary" type="button" onClick={() => { setReserved(true); notify(shortages.length ? "Kit reserved; shortages highlighted" : "Complete AI kit reserved"); }}>Reserve AI kit</button>
        <button className="equipment-secondary" type="button" onClick={checkoutCompleteKit}>Check out complete kit</button>
      </section>

      <div className="equipment-metrics">
        <article><span>Total assets</span><strong>{inventory.reduce((sum, item) => sum + item.total, 0)}</strong><small>All categories</small></article>
        <article><span>Available now</span><strong>{inventory.reduce((sum, item) => sum + item.available, 0)}</strong><small>Ready for collection</small></article>
        <article><span>Checked out</span><strong>{inventory.reduce((sum, item) => sum + item.out, 0)}</strong><small>Assigned to coaches</small></article>
        <article className="warning"><span>Overdue</span><strong>{transactions.filter((item) => item.status === "Overdue").length}</strong><small>Needs follow-up</small></article>
        <article><span>Maintenance</span><strong>{inventory.reduce((sum, item) => sum + item.maintenance, 0)}</strong><small>Unavailable</small></article>
      </div>

      <section className="equipment-panel">
        <div className="equipment-heading"><div><span>AI-RECOMMENDED KIT</span><h3>Equipment required for the saved session</h3></div><button type="button" onClick={() => onNavigate?.("session-builder")}>Edit session →</button></div>
        <div className="kit-grid">
          {kit.map((required) => {
            const stock = inventory.find((item) => item.id === required.id);
            const available = stock?.available || 0;
            const shortage = Math.max(0, required.required - available);
            return (
              <article className={shortage ? "kit-card shortage" : "kit-card"} key={required.id}>
                <div><span>{shortage ? "SHORTAGE" : reserved ? "RESERVED" : "AVAILABLE"}</span><strong>{required.required}</strong></div>
                <h3>{required.name}</h3><p>{required.reason}</p>
                <footer><span>{available} available</span><b>{shortage ? `${shortage} short` : "Ready"}</b></footer>
                <button className="equipment-secondary" type="button" onClick={() => shortage ? notify(`AI alternative: borrow ${shortage} or reduce one station`) : (setSelectedItem(stock), setQuantity(required.required), setModal("checkout"))}>{shortage ? "View AI alternative" : "Check out item"}</button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="equipment-toolbar">
        <label><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search item, location or asset code..." /></label>
        <select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option><option>Balls</option><option>Markers</option><option>Bibs</option><option>Goals</option><option>Agility</option><option>Safety</option><option>Accessories</option></select>
        <select value={status} onChange={(event) => setStatus(event.target.value)}><option>All status</option><option>Available</option><option>Checked out</option><option>Maintenance</option></select>
        <button className="equipment-secondary" type="button" onClick={() => setModal("scan")}>▣ Scan equipment</button>
        {role === "admin" && <button className="equipment-primary" type="button" onClick={() => notify("Add asset form opened")}>+ Add asset</button>}
      </section>

      <section className="equipment-panel">
        <div className="equipment-heading"><div><span>LIVE INVENTORY</span><h3>Equipment availability</h3></div><small>{filtered.length} equipment groups</small></div>
        <div className="inventory-table">
          <div className="inventory-row inventory-header"><span>Equipment</span><span>Location</span><span>Total</span><span>Available</span><span>Out</span><span>Actions</span></div>
          {filtered.map((item) => (
            <div className="inventory-row" key={item.id}>
              <div><strong>{item.name}</strong><small>{item.code}</small></div><span>{item.location}</span><strong>{item.total}</strong><strong className={item.available ? "ready" : "zero"}>{item.available}</strong><span>{item.out}</span>
              <div className="row-actions"><button disabled={!item.available} onClick={() => { setSelectedItem(item); setQuantity(1); setModal("checkout"); }}>Check out</button><button onClick={() => { setSelectedItem(item); setModal("maintenance"); }}>Issue</button></div>
            </div>
          ))}
        </div>
      </section>

      <section className="equipment-panel">
        <div className="equipment-heading"><div><span>CHECK-OUT REGISTER</span><h3>Active equipment movements</h3></div></div>
        <div className="transaction-grid">
          {transactions.map((transaction) => (
            <article key={transaction.id} className={transaction.status === "Overdue" ? "overdue" : ""}>
              <span>{transaction.status}</span><h3>{transaction.item}</h3><p>{transaction.quantity} items · {transaction.coach} · {transaction.team}</p><small>Due: {transaction.due}</small>
              {transaction.status !== "Returned" && <button className="equipment-secondary" onClick={() => { setSelectedItem(transaction); setModal("return"); }}>Check in / Return</button>}
            </article>
          ))}
        </div>
      </section>

      {modal && <div className="equipment-modal-backdrop" onClick={() => setModal(null)}><section className="equipment-modal" onClick={(event) => event.stopPropagation()}>
        <header><div><span>EQUIPMENT CONTROL</span><h2>{modal === "checkout" ? "Check out equipment" : modal === "return" ? "Check in equipment" : modal === "maintenance" ? "Report an issue" : "Scan equipment code"}</h2></div><button onClick={() => setModal(null)}>×</button></header>
        {modal === "checkout" && <div className="modal-body"><h3>{selectedItem?.name}</h3><label><span>Quantity</span><input type="number" min="1" max={selectedItem?.available || 1} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} /></label><p>{selectedItem?.available} currently available. Due after tonight’s session.</p><button className="equipment-primary" onClick={() => checkout(selectedItem, quantity)}>Confirm check-out</button></div>}
        {modal === "return" && <div className="modal-body"><h3>{selectedItem?.item}</h3><p>Return {selectedItem?.quantity} items checked out by {selectedItem?.coach}.</p><button className="equipment-primary" onClick={() => returnTransaction(selectedItem)}>Confirm return</button></div>}
        {modal === "maintenance" && <div className="modal-body"><h3>{selectedItem?.name}</h3><textarea defaultValue="Damaged or requires inspection" /><button className="equipment-primary" onClick={() => markMaintenance(selectedItem)}>Record maintenance issue</button></div>}
        {modal === "scan" && <div className="modal-body scan-demo"><div>▣</div><h3>Scanner ready</h3><p>Demo scan result: SCSC-BALL-04 · Size 4 footballs</p><button className="equipment-primary" onClick={() => { const item = inventory.find((entry) => entry.id === "balls"); setSelectedItem(item); setQuantity(1); setModal("checkout"); }}>Use scanned item</button></div>}
      </section></div>}

      {toast && <div className="equipment-toast">{toast}</div>}
    </div>
  );
}
