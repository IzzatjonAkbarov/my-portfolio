import Script from "next/script";

export default function AgentEmbed() {
  return (
    <Script
      id={"maf-agent-my-portfolio-weld-mu-75"}
      src={"https://makeagent.fast/embed.js?v=20260916-stable-launcher"}
      data-agent={"my-portfolio-weld-mu-75"}
      data-position={"bottom-right"}
      strategy="afterInteractive"
    />
  );
}
