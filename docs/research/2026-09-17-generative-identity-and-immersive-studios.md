# Hypergraphia Generative Identity Research

Status: verified research record
Review date: 2026-09-17
Owner: Hypergraphia Studio

## Purpose

This record documents the generative identity research completed for Hypergraphia Studio.

It separates verified reference material from current implementation and future targets.

The research supports generative design, immersive media, public heritage, XR, installations, and portfolio documentation.

## Research method

- Review official project and studio pages.
- Prefer primary sources over commentary.
- Record the source URL beside each finding.
- Treat visual comparison as a production benchmark, not as a claim of artistic equivalence.

## Core references

| Source | Verified signal | Hypergraphia use |
| --- | --- | --- |
| [Generative Gestaltung 2](http://www.generative-gestaltung.de/2/) | Browser sketches and code examples cover color, shape, type, image, noise, oscillation, data trees, and dynamic structures. | Generator families and study prompts. |
| [Hartmut Bohnacker project page](https://www.hartmut-bohnacker.de/projects/generative-design-2-0) | The project translates Processing studies into browser-based p5.js work. | Browser-first experimentation and teaching reference. |
| [Generative Design GitHub](https://github.com/generative-design) | The organization publishes source packages for the generative design examples. | Source code reference and reproducible studies. |
| [TwoPoints.Net](https://new.twopoints.net/) | The studio applies flexible systems across identity, editorial, and type design. | Identity system reference. |
| [Flexible Visual Systems](https://flexiblevisualsystems.info/) | The Components, Assets, Application method treats identity as a flexible system. | Shared system vocabulary. |
| [Hyperobjects Workbench](https://hyperobjects.design/workbench) | The workbench provides live coding, geometry controls, and interactive generative design. | Authoring interface reference. |

## Immersive studio references

### Refik Anadol Studio

[Refik Anadol Studio](https://refikanadolstudio.com/studio/) uses data as a primary material.

The studio combines machine intelligence, architecture, live audio-visual performance, and immersive installation.

Its team includes artists, architects, data scientists, researchers, engineers, sound designers, and generative designers.

Hypergraphia should study this production model, not copy its visual style.

### Universal Everything

[Universal Everything](https://www.universaleverything.com/profile) builds bespoke generative languages.

Those systems evolve across audiences, spaces, and contexts.

This reference supports one Hypergraphia grammar with many project configurations.

### FIELD.IO

[FIELD.IO](https://field.io/work/nike-generative-surface) describes a generative display system.

The system composes and animates content in real time from an updateable asset database.

The project also records rules for brand behavior and motion.

This supports a Hypergraphia manifest with rules, assets, behaviors, and applications.

### Marshmallow Laser Feast

[Water Body](https://marshmallowlaserfeast.com/project/water-body/) combines scientific data, spatial sound, large-scale visualization, and visitor interaction.

The work compresses long environmental cycles into a short visual experience.

This supports heritage and ecological projects based on time, place, and data relationships.

### Squidsoup

[Squidsoup](https://www.squidsoup.org/) combines light, sound, physical space, digital space, and responsive interaction.

Its work demonstrates how a digital rule system can become a physical environment.

This supports Hypergraphia installation proposals and event-scale experiences.

### teamLab

[teamLab](https://flowers-bombing-home.teamlab.art/) describes an interdisciplinary practice.

Its teams include artists, programmers, engineers, CG animators, mathematicians, and architects.

Its work treats visitors as participants and allows artworks to move across spaces.

This supports Hypergraphia’s art, engineering, film, and interaction model.

### Moment Factory

[Moment Factory public spaces](https://momentfactory.com/collections/public-spaces) combines video, lighting, architecture, sound, and public-space production.

This reference is less generative-art specific.

It provides a useful benchmark for systems integration, AV production, and public deployment.

## Current Hypergraphia implementation

The repository contains two related surfaces.

### Universal component demo

File: [`system-demo.html`](../../system-demo.html)

The demo contains:

- Surface modes for immersive, studio, portfolio, and authoring contexts.
- Shared carousel, information panel, AR button, status model, and theme control.
- Project rows, case-study content, authoring cards, and identity hierarchy.
- Dark and light modes.

### Generative system demo

File: [`generative-system-demo.html`](../../generative-system-demo.html)

The lab contains:

- Flow, orbit, and contour generator presets.
- Seeded randomness.
- Density, tension, depth, and motion controls.
- Signal, mono, and earth palettes.
- URL state for scene, seed, and palette.
- Dark and light themes.
- Reduced-motion support.
- PNG capture.
- Idea Library mapping the eight Generative Gestaltung families.
- Construct model for Rules, Structure, Portrayal, and Manifestation.
- Portrayal state controls for Field, Object, Splat, and Narrative.

## Current limits

The generative lab remains a browser prototype.

- Motion uses slow group rotation and does not deform geometry over time.
- Geometry uses line primitives, basic materials, and a wireframe core.
- The lab has no live audio, sensor, OSC, MIDI, or public data input.
- The lab has no Gaussian splat loader or object adapter.
- The lab has no shader library, trail system, post-processing, or volumetric renderer.
- The lab has no spatial audio or installation synchronization.
- Capture saves PNG output but does not save a JSON provenance record.
- The XR adapter remains a future phase.

These limits are expected for the current prototype.

They define the next production work.

## Repository record

The recent commits document the implementation sequence:

| Commit | Change |
| --- | --- |
| `701eabf` | Document universal Hypergraphia identity system. |
| `dd08039` | Add universal component system demo. |
| `1d64b73` | Use monochrome component demo text. |
| `cc6876c` | Add generative identity system prototype. |
| `e30160b` | Add Generative Gestaltung idea library. |
| `924b074` | Show modular identity construct in system demo. |

## Verification record

The following checks passed during this research cycle:

- Local HTTP response returned `200 OK` for the system demo.
- `git diff --check` returned no whitespace errors.
- Browser reload showed the construct heading and four-stage map.
- The portrayal switcher changed the active state to Gaussian splat.
- Light mode rendered the construct section with dark text.
- Dark mode restored correctly.

## Source boundary

The sources above describe reference practices and public project information.

They do not prove Hypergraphia capability, funding, partnership, or client status.

Those claims require separate project records and source verification.
