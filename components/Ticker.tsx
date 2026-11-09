import { tickerNames } from "@/data/services";

export default function Ticker() {
  const loop = [...tickerNames, ...tickerNames, ...tickerNames, ...tickerNames];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="track">
        {loop.map((n, i) => (
          <span key={i} style={{ display: "contents" }}>
            <span>{n}</span>
            <s />
          </span>
        ))}
      </div>
    </div>
  );
}
