"use client";

import { useCallback, useMemo, useState } from "react";
import { roi } from "@/content/roi";
import { aud, int, pct } from "@/lib/format";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Slider } from "@/components/ui/Slider";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";

export function RoiCalculator() {
  const [leads, setLeads] = useState(roi.inputs.leads.default);
  const [closeRate, setCloseRate] = useState(roi.inputs.closeRate.default);
  const [clientValue, setClientValue] = useState(roi.inputs.clientValue.default);

  const current = leads * (closeRate / 100) * clientValue;
  const improved = leads * ((closeRate + roi.lift) / 100) * clientValue;
  const delta = improved - current;

  const fmtAud = useCallback((n: number) => aud(n), []);

  const deltaLine = useMemo(() => roi.labels.delta(aud(delta)), [delta]);

  return (
    <section className="bg-bone py-section-y">
      <Container>
        <SectionHeader
          eyebrow={roi.eyebrow}
          heading={roi.headline}
          lead={roi.sub}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 rounded-lg border border-ink/10 bg-bone-warm p-6 shadow-sm sm:p-7 md:mt-14 md:p-10 lg:grid-cols-2 lg:gap-16">
          {/* Inputs */}
          <div className="flex flex-col justify-center gap-9">
            <Slider
              label={roi.inputs.leads.label}
              min={roi.inputs.leads.min}
              max={roi.inputs.leads.max}
              step={roi.inputs.leads.step}
              value={leads}
              display={int(leads)}
              onChange={setLeads}
            />
            <Slider
              label={roi.inputs.closeRate.label}
              min={roi.inputs.closeRate.min}
              max={roi.inputs.closeRate.max}
              step={roi.inputs.closeRate.step}
              value={closeRate}
              display={pct(closeRate)}
              onChange={setCloseRate}
            />
            <Slider
              label={roi.inputs.clientValue.label}
              min={roi.inputs.clientValue.min}
              max={roi.inputs.clientValue.max}
              step={roi.inputs.clientValue.step}
              value={clientValue}
              display={aud(clientValue)}
              onChange={setClientValue}
            />
          </div>

          {/* Output */}
          <div className="flex flex-col justify-center gap-6 border-t border-ink/10 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <div className="grid grid-cols-1 gap-6 min-[420px]:grid-cols-2">
              <div>
                <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
                  {roi.labels.current}
                </p>
                <p className="mt-2 text-caption text-ink-muted">
                  {roi.labels.monthly}
                </p>
                <p className="mt-1 font-mono text-h3 tracking-[-0.02em] tabular-nums text-ink-soft">
                  <AnimatedNumber value={current} format={fmtAud} />
                </p>
              </div>
              <div>
                <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-navy">
                  {roi.labels.improved}
                </p>
                <p className="mt-2 text-caption text-ink-muted">
                  {roi.labels.monthly}
                </p>
                <p className="mt-1 font-mono text-h2 font-medium tracking-[-0.03em] tabular-nums text-navy">
                  <AnimatedNumber value={improved} format={fmtAud} />
                </p>
              </div>
            </div>

            <p
              aria-live="polite"
              className="rounded border border-accent/30 bg-accent/10 p-4 text-body text-ink"
            >
              {deltaLine}
            </p>
          </div>
        </div>

        <p className="mt-10 text-center font-display text-h2 font-light text-ink">
          {roi.closer}
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            href={roi.cta.href}
            variant="primary"
            size="lg"
            block
            className="mx-auto h-auto min-h-14 max-w-xl whitespace-normal py-3 text-center leading-snug"
          >
            {roi.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
