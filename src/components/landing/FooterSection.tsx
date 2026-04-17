"use client";

import TripleReveal from "@/components/landing/TripleReveal";
import { FOOTER_BODY } from "@/components/landing/content";
import GradualBlur from "@/components/ui/GradualBlur";

export default function FooterSection() {
  return (
    <section className="boc-section boc-endnote js-footer-stage">
      <div className="boc-footer-box">
        <h2 className="boc-footer-title js-footer-title">CLOUD IDEAS. REAL IMPACT.</h2>

        <TripleReveal
          wrapperClassName="boc-endnote-wrap"
          textClassName="boc-endnote-text"
        >
          {FOOTER_BODY}
        </TripleReveal>

        <GradualBlur
          target="parent"
          position="bottom"
          height="7rem"
          strength={2.2}
          divCount={6}
          curve="bezier"
          exponential
          opacity={1}
          className="boc-footer-blur"
        />
      </div>
    </section>
  );
}
