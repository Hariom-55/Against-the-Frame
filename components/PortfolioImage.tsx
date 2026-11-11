"use client";
import Image from "next/image";
import { useState } from "react";

export default function PortfolioImage({ file, alt, lead }: { file: string; alt: string; lead?: boolean }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={`pf-img${lead ? " lead" : ""}`}>
      {missing ? (
        <span>Add image:<br />public/portfolio/{file}</span>
      ) : (
        <Image src={`/portfolio/${file}`} alt={alt} fill sizes="(max-width: 820px) 100vw, 55vw" onError={() => setMissing(true)} />
      )}
    </div>
  );
}
