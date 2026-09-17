# Universal Hypergraphia Identity and Component System

Status: approved for specification and review
Owner: main integration agent
Scope: Hypergraphia Studio, Juan Licerio portfolio, RGVXR, and XR Sandbox

## Goal

Create one identity system for the studio and the artist.

The system must preserve the RGVXR interaction quality while supporting different layouts, voices, and runtimes.

The system must prevent duplicated tokens, project metadata, and AR interaction logic.

## Brand architecture

### Juan Licerio

The personal identity represents authorship, artistic practice, engineering experience, biography, and selected work.

The personal site uses first-person language.

### Hypergraphia Studio

The studio identity represents multidisciplinary production, collaborators, public installations, grants, museums, and contracting.

The studio site uses collective language.

### Project identities

RGVXR, River Pierce AR, Triqueta, Forget Me Not, and future installations remain project identities.

Each project can have a title, visual language, and case-study page.

Each project must link to its parent identity and verified source material.

`Hypergraphia Studio` is the public studio identity.

`XR Sandbox` is the authoring product name.

`Hypergraphia` names the authored experience family.

`RGVXR` and `CarrouselXR` become migration aliases, not peer public identities.

## Product surfaces

| Surface | Mode | Primary user goal |
| --- | --- | --- |
| RGVXR gallery | Immersive | Explore heritage objects and enter AR |
| Hypergraphia Studio | Studio | Understand capability and request a collaboration |
| Juan Licerio portfolio | Experience | Understand authorship and review case studies |
| XR Sandbox | Authoring | Create, test, and launch XR experiences |

The system shares behavior and tokens across surfaces.

The system does not force one layout onto every surface.

## Visual system

### Token layers

1. Core tokens define spacing, type scale, radii, borders, motion, and focus states.
2. Immersive tokens define black surfaces, glass panels, white controls, and low-noise navigation.
3. Studio tokens define black and white surfaces, violet emphasis, Space Grotesk display type, and DM Mono metadata.
4. Portfolio tokens define an editorial surface with the same type roles and project rhythm.
5. Authoring tokens define dense cards, blue-white text, coral action states, asset counts, and revision labels.

Semantic tokens must separate identity accents from operational status colors.

Studio violet must not replace success, warning, error, or live-state colors.

### Typography

- Space Grotesk serves major Hypergraphia and portfolio headings.
- Inter or a system sans serves controls and long body copy.
- DM Mono serves metadata, project IDs, labels, and technical values.

Display type must not replace control text.

### Color

Black and white remain the foundation.

Violet marks active states and studio emphasis.

Light mode inverts the surface and preserves the same semantic roles.

Color tokens must support contrast checks in both themes.

## Shared component contracts

The first component set includes:

- `XRCarousel`
- `InfoPanel`
- `ARButton`
- `PreviousNextControls`
- `ProgressDots`
- `StatusPill`
- `ProjectCard`
- `ProjectMeta`
- `AssetList`
- `LaunchSheet`
- `QRLaunchPanel`
- `TargetInstructions`
- `LoadingState`
- `ErrorState`
- `ThemeToggle`

The XR layer also includes `XRPrompt`, `PlacementReticle`, `ManipulationRing`, and `DebugOverlay`.

RGVXR supplies the interaction reference for the carousel, panel, AR button, dots, loading state, error state, and status bar.

Hypergraphia supplies the editorial type, spacing, theme, and project-page language.

XR Sandbox supplies the authoring states, launch flow, asset list, and revision data.

The neural-live status model supplies explicit `WAITING`, `LIVE`, `STALE`, `ENDED`, and `ERROR` states.

## Runtime boundary

The shared system uses CSS custom properties and small ECMAScript modules.

Vanilla Web Components provide framework-neutral primitives.

React wrappers adapt the primitives for XR Sandbox.

Existing applications keep their current runtime until migration proves stable.

The system does not require a full framework rewrite.

## Shared project schema

Every project record must support:

```json
{
  "id": "river-pierce-ar",
  "title": "River Pierce Foundation AR Showcase",
  "description": "Verified project description",
  "cover": null,
  "template": "image-target",
  "tracking": {
    "mode": "image-target",
    "targetAsset": "mindTarget"
  },
  "assets": [],
  "links": {
    "caseStudy": "/projects/river-pierce.html",
    "launch": null,
    "source": "https://www.riverpierce.org/event-details/the-teaching-of-the-hands-experimental-documentary-screening-panel-discussion"
  },
  "status": "published",
  "theme": "immersive"
}
```

RGVXR metadata and XR Sandbox manifests require adapters into this schema.

Portfolio and Hypergraphia project pages consume the same records.

Claims and dates remain attached to verified source fields.

## Repository boundary

Create a dedicated package named `hypergraphia-system` for identity tokens, themes, and framework-neutral UI primitives.

Keep the XR Sandbox manifest schema and XR runtime as the canonical runtime boundary.

The shared package must not duplicate XR rendering, tracking, or private server state.

RGVXR supplies importable assets and selected viewer behavior through an adapter.

Hypergraphia and the personal portfolio remain static presentation layers.

Each consuming repository keeps its page composition and deployment configuration.

## Migration order

1. Inventory existing RGVXR, Hypergraphia, portfolio, and XR Sandbox components.
2. Reuse the existing XR Sandbox manifest schema as the canonical runtime schema.
3. Add adapters for RGVXR metadata and static presentation records.
4. Extract identity tokens without changing visible behavior.
5. Implement framework-neutral primitives.
6. Add React wrappers for XR Sandbox.
7. Migrate the RGVXR gallery first.
8. Migrate Hypergraphia Studio and the portfolio.
9. Connect the XR Sandbox authoring surface.
10. Verify desktop, mobile, keyboard, reduced motion, and AR entry states.

## Delegation plan

The main agent owns scope, integration, and final verification.

Read-only advisors inspect identity, accessibility, runtime boundaries, and source evidence.

Workers use exclusive boundaries:

- Foundation worker: tokens and schemas
- Immersive worker: RGVXR components
- Editorial worker: Hypergraphia and portfolio adapters
- Sandbox worker: React wrappers and authoring states
- Verification worker: visual, accessibility, link, and runtime checks

Superconductor can manage the durable team run.

OMP can run typed scouts, focused workers, and review agents.

No worker may edit another worker's boundary.

## Acceptance criteria

- One token source controls all four surfaces.
- One project schema represents RGVXR and XR Sandbox records.
- RGVXR keeps its carousel and AR entry behavior.
- Hypergraphia keeps its editorial studio identity.
- The personal site keeps its authorship identity.
- XR Sandbox keeps its operational authoring flow.
- Keyboard focus and reduced-motion behavior remain available.
- Each surface passes desktop and mobile visual review.
- No unverified project claims enter the shared content registry.
- RGVXR metadata preserves author, technologies, instructions, status, visibility, unlock methods, location, and license.
- Location metadata maps to `geoTrigger` when the target experience supports geofencing.
- Hypergraphia migration does not start until its GLB and MindAR assets have a verified source.

## Risks

- RGVXR uses vanilla HTML and inline CSS.
- Hypergraphia uses static HTML, CSS, JavaScript, and Three.js.
- XR Sandbox uses React, TypeScript, Vite, StyleX, and Astryx components.
- Project metadata has different shapes across repositories.
- The local XR Sandbox build currently shows a styling regression.
- RGVXR currently shows an empty model source for the selected Carrizo Bear project.
- The current RGVXR migration drops several metadata fields.
- The supplied Hypergraphia website does not contain the GLB and MindAR artifacts expected by the migration script.
- Three.js versions differ between modern, MindAR, and model-viewer paths.
- RGVXR exposes repository files through its Express static root and must not serve as the public runtime boundary.

These risks require adapter layers and bounded migrations.
