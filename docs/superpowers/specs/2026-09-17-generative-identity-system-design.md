# Hypergraphia Generative Identity System

Status: prototype implemented and verified
Owner: Hypergraphia Studio
Scope: Three.js generative studies, static case studies, installations, and future XR scenes

## Purpose

Hypergraphia needs an identity that can change without losing recognition.

The identity must behave as a flexible visual language, not as one fixed logo or image.

The system must support generative art, parametric studies, public installations, portfolio documentation, and XR scenes.

The identity is a construct for portrayal. It keeps one recognizable grammar while it reconfigures modules for each project.

Supporting records:

- [Research record](../../research/2026-09-17-generative-identity-and-immersive-studios.md)
- [Readiness roadmap](../../roadmaps/2026-09-17-generative-lab-readiness.md)

## Research references

- [Generative Gestaltung — Creative Coding for the Web](https://www.hartmut-bohnacker.de/projects/generative-design-2-0) translates Processing examples into browser-based p5.js studies.
- [Generative Design on GitHub](https://github.com/generative-design) publishes the code packages that support the book and its examples.
- [TwoPoints.Net](https://new.twopoints.net/) applies flexible systems across identity, editorial, and type design.
- [Flexible Visual Systems](https://flexiblevisualsystems.info/) frames identity as a flexible system with components, assets, and applications.
- [Hyperobjects Workbench](https://hyperobjects.design/workbench) demonstrates live interactive generative design with geometry controls.

## Design principles

1. **Rules create identity.** A scene changes through a controlled rule set.
2. **Seeds create repeatability.** The same seed and parameters reproduce the same state.
3. **Components create scale.** Small scene modules combine into larger installations.
4. **Applications create context.** The same system can serve a studio page, portfolio case study, or XR scene.
5. **The interface stays quiet.** UI text uses the Hypergraphia monochrome system.
6. **The artwork can change.** Generative color belongs inside the scene, not inside operational text.

## System layers

### Construct model

The construct keeps four stable layers:

1. **Rules** — seed, type, motion, color, and generator version.
2. **Structure** — space, depth, relation, and spatial composition.
3. **Portrayal** — mesh, Gaussian splat, video, image, or data field.
4. **Manifestation** — web, portfolio, XR, installation, or museum context.

The portrayal layer can change without changing the identity grammar.

The manifestation layer can change without changing the portrayal contract.

### Components

- `SceneCanvas`
- `PresetTabs`
- `ParameterPanel`
- `SeedControl`
- `PaletteControl`
- `CaptureButton`
- `StatusLine`
- `ProvenanceList`

### Assets

- Flow strands
- Orbit rings
- Contour lines
- Particle fields
- Ribbons
- Glyph grids
- Data paths
- Architectural volumes

### Applications

- Studio case studies
- Personal portfolio pages
- Public installation proposals
- Museum and theatre visualizations
- AR image-target scenes
- XR Sandbox authoring manifests

## Scene contract

Every generator should accept a shared record:

```json
{
  "id": "river-field-study",
  "generator": "flow-field",
  "version": "0.1.0",
  "seed": 42,
  "params": {
    "density": 0.58,
    "tension": 0.62,
    "depth": 0.44,
    "motion": 0.24
  },
  "palette": "signal",
  "quality": "auto"
}
```

The URL should preserve the scene, seed, and palette.

```text
/generative-system-demo.html?scene=flow&seed=42&palette=signal
```

## Runtime rules

- Use Three.js for browser scenes.
- Use seeded randomness for reproducible output.
- Use `InstancedMesh` when repeated geometry needs scale.
- Keep the XR renderer boundary separate from the editorial shell.
- Preserve dark and light modes.
- Respect `prefers-reduced-motion`.
- Keep UI text monochrome.
- Record generator version and renderer metadata with captures.

## Current prototype

The prototype lives at [`generative-system-demo.html`](../../../generative-system-demo.html).

It now presents the identity as a construct with Rules, Structure, Portrayal, and Manifestation stages.

It includes a portrayal switcher for Field, Object, Splat, and Narrative modules.

The separate generative lab includes flow, orbit, and contour generators.

It supports density, tension, depth, motion, palette, seed, capture, and theme controls.

It links back to the shared component demo and the studio surfaces.

## Idea library

The Generative Gestaltung library provides eight families for the next system passes:

| Source family | Hypergraphia use |
| --- | --- |
| P.1 Color | Palette, material, and light roles |
| P.2 Shape | Parametric objects and architectural forms |
| P.3 Type | Variable signage and spatial narrative |
| P.4 Image | Scanned objects and image-derived fields |
| M.1 Random and noise | Natural texture, particles, and uncertainty |
| M.2 Oscillation figures | Audio-reactive motion and living lines |
| M.5 Data trees | Heritage relationships and place-based maps |
| M.6 Dynamic data structure | Interactive narratives and museum systems |

The current prototype maps color, noise, and oscillation into existing controls.

The next generator pass should add shape, type, image, data trees, and dynamic structures.

## Next implementation phases

1. Extract the generator contract into a reusable module.
2. Add a shared token file for static sites and XR Sandbox.
3. Add capture metadata and downloadable JSON state.
4. Add a Three.js XR adapter after asset and target manifests pass verification.
5. Add case-study presets for River Pierce, Triqueta, and future heritage studies.
