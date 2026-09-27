# ST-G smart ionizing bar — source notes

Catalogue page 11. Provenance and rules: [`README.md`](README.md).
Product page: `/products/static-eliminator/st-g-series`.

## What the catalogue page says

**Heading:** `MODEL: ST-G (AC INTEGRATED)`

**Product introduction, quoted:** the ST-G series smart ionizing bar uses
**Pulse-AC** mode for high efficiency and a small form factor. Pulse-AC
alternately applies "+" and "−" high voltage to **a single electrode pin** to
generate ions of both polarities.

This is the model-named source text for the discharge description. It supports
the wording already on the page. It is product documentation, not an
independent measurement, and the page does not claim more than that.

## Published in the product data

| Field | Value | What it does and does not establish |
|---|---|---|
| Discharge mode | Pulse-AC, alternating polarity on one electrode pin | Supported by the page-11 heading and introduction |
| Input | DC 24 V | This is the **supply**. It is not the discharge mode and not the emitter voltage |
| Power | 12 W | |
| Output | 6.5 kV | **Peak, peak-to-peak and RMS are not defined anywhere.** Never written as ±6.5 kV, never converted, never set beside another brand's kV number |
| Ion balance | ±50 V | The bar's own offset. Not the residual left on the customer's material |
| Static elimination time | 1 s | A catalogue rating. Initial and final voltage, distance and air speed are not given |
| Working distance | 30–1000 mm | Does **not** establish 1 s across that whole range |
| Operating temperature | 0–45 °C | |
| Operating humidity | 15–75 % RH, no condensation | |
| Dimensions | 30 × 82 × 300 mm | 300 mm is the shortest length. The axis order and the customisable range are not given |
| Protection | Abnormal-discharge alarm with high-voltage cut-off | |
| Interface | Network port for industrial interconnection | **No protocol is named.** Do not name one |

## Not published — to confirm with the factory

1. **What 6.5 kV measures.** Vmax, Vmin and Vpp as three separate numbers, and
   the measurement reference point (pin to ground, pin to pin, or to the work).
   Vpp = Vmax − Vmin, so a single figure does not give the single-side
   amplitude: +4 kV / −2.5 kV is as much 6.5 kVpp as ±3.25 kV is.
2. **Test conditions behind the 1 s rating.** Initial surface voltage, cut-off
   voltage, distance, air speed, and the instrument.
3. **Over what part of the 30–1000 mm range the 1 s rating holds.**
4. **The paired `AC pulse / DC pulse` wording** in the parameter table — a
   selectable dual mode, or one table reused across the series. This is not to
   be called a typo.
5. **Length options.** The shortest is 300 mm; the step, the maximum and the
   axis order of 30 × 82 × 300 mm are not stated.
6. **The network port's protocol**, and what the alarm actually signals on it.
7. **Current model and catalogue revision** — whether v3 is the shipping one.

## Claims that must not appear

- **2× neutralizing speed, 150 % more ion generation, 30 % energy saving.**
  All three are published without a comparison model or test conditions. They
  were removed from the feature bullets on the ST-G, ST-E and ST-F pages. The
  2× and 2.5× ratings remain in the three-way comparison table, where they are
  labelled as ratings and carry the note that neither is published with a
  comparison model or test conditions.
- **±6.5 kV**, or any peak/RMS/peak-to-peak suffix on the 6.5 kV figure.
- **Any cross-brand voltage comparison.** No competitor is named anywhere on
  the site, and the counterpart model is unknown.
- **Confirmation by a person.** The discharge mode rests on catalogue page 11,
  not on anything said in conversation.

## Page review — what was changed and what was left alone

**Changed:** the three comparative bullets, as above.

**Left alone deliberately.** The page already states the supply and the emitter
voltage separately, already labels the 1 s decay as rated with its missing
conditions, already separates ion balance from the customer's residual surface
voltage, and already describes Pulse-AC on a single pin. It needs no further
qualification, and no internal to-confirm list belongs on it.
