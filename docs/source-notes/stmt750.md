# STMT750 brush and vacuum cleaning machine — source notes

Catalogue page 8. Provenance and rules: [`README.md`](README.md).
Product page: `/products/cleaning-machine/non-contact-cleaning-machine` —
**the URL is historical and stays.** The displayed name is Brush and Vacuum
Cleaning Machine, which is what the machine does.

Chosen as the cleaning example because its installation data is the most
complete in the catalogue. That is not a statement that it outperforms the
SMT600.

## Process

**Brush + vacuum suction + double-sided roller.** The brush rollers touch the
material — that is what the machine is, and the page says so. What it leaves
out is the adhesive transfer, not the contact.

Intended for **dry particle removal from PCB surfaces**: before dry-film
lamination, exposure, printing or press-lamination, and after cutting, drilling
or routing.

It is **not** a wet, solvent, flux-residue or ionic-contamination process, and
it must not be described as suitable for every populated board.

## Published in the product data

| Field | Value | What it does and does not establish |
|---|---|---|
| Cleaning width | 750 mm | |
| Line speed | 0–45 m/min, inverter controlled | |
| Brushes | Cotton-nylon / Tetolon (PET) fibre | **What the slash means is not stated.** Not "both are standard", and not a confirmed either/or |
| Cleaning rollers | Korean liquid-silicone adhesive rollers | |
| Paper | Low-static paper roll | |
| Roller gap | Self-adjusting between upper and lower brush rollers | |
| Static control | Elimination at both inlet and outlet; material **<100 V** | A catalogue value. No measurement point, instrument or initial voltage |
| Removal rate | **99.9 %** | A catalogue value. **No particle size, material, counting method or measurement point.** Not a guarantee under all conditions |
| Control | Touchscreen, counter, alarm; shuttle, forward/reverse, continuous, emergency stop | |
| Maintenance | Brushes, rollers and paper rolls withdraw on drawers | |
| Main machine supply | 220 V / 50 Hz, 350 W | |

### Dust collector VJ-2.2HLS — a separate item

| Field | Value | What it does and does not establish |
|---|---|---|
| Supply | 380 V / 50 Hz, 2.2 kW | **Number of phases is not given** |
| Airflow | 2200 m³/h | |
| Noise | **74 ±2 dB** | **No A-weighting basis.** The page said dB(A); corrected to dB |
| Filter | Toray filter cartridge × 1, 8 m² | **HEPA classification not established by the catalogue** — no filtration class is given either way, so none is to be stated in either direction |
| Filter cleaning | Manual shaker | |
| Collection | 30 L drawer |

**Listing the collector in the technical configuration does not mean a
quotation includes it.** Scope of supply is confirmed in the quotation, and
nothing in the repository establishes what a standard quotation covers.

## Not published — to confirm with the factory

1. **Basis for 99.9 %** — particle size range, substrate, counting method,
   before-and-after counts, repeats, ambient cleanliness, surface-inspection
   criterion.
2. **Basis for material <100 V** — measurement point (inlet or outlet side),
   instrument, initial voltage.
3. **What the brush slash means**, plus fibre diameter, density, rotation
   speed, contact depth and replacement interval.
4. **Board limits** — thickness range, maximum warp, minimum board size,
   whether the self-adjusting gap covers them.
5. **Installation** — final footprint, infeed and outfeed roller heights and
   pitch, clearance needed for roller service, and whether compressed air is
   required.
6. **Collector phases**, cartridge part number, filtration class and
   replacement interval; whether the 2200 m³/h is the collector's rating or
   measured at the machine inlet.
7. **Scope of supply** — whether the collector, rollers and paper are included
   by default.

## Claims that must not appear

- **HEPA**, or any filtration class for the Toray cartridge.
- **dB(A)** for either the machine or the collector.
- **Zero scratching, zero ESD, yield improvement, or a minimum removable
  particle size.**
- **Flux-residue, ionic-contamination, aqueous, solvent or ultrasonic
  cleaning**, or suitability for all populated boards.
- **A default scope of supply** inferred from what the spec table omits.

## Page review — what was changed and what was left alone

**Changed:** the collector noise reads 74 ±2 dB rather than dB(A); the brush
fibre is named as the catalogue names it — Cotton-nylon / Tetolon (PET) — and
the page no longer asserts that the slash means a choice between them.

**Left alone deliberately.** The page already labels 99.9 % as rated and names
the missing conditions, already states that the brushes touch the material,
already avoids HEPA and any filtration class, already asks the reader to
confirm the scope of supply in the quotation, and already describes the process
as dry with no solvent step. It does not need more qualification.
