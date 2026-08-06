# MatchVision Frontend QA Register

Permanent quality register for MatchVision frontend development.

- Register created: 5 August 2026
- Current baseline: Post Sprint 4E / Match Workspace refinement
- Scope: Administrator, Coach, Parent and Player portals
- Owner: MatchVision Product and Frontend QA
- Policy: Never delete historical issues. Update status, resolution sprint and regression result.

## Verification status

This baseline combines source-level interaction tracing, route and permission review, responsive CSS review, production compilation and static control inventory.

- `npm run lint`: Passed
- `npm run build`: Passed
- `git diff --check`: Passed
- JSX button elements inventoried: 379
- Active buttons without a click handler or submit behavior: 0
- Handler-free legacy buttons: 1 in unused `components/Topbar.jsx`
- Forms/submit workflows identified: 6
- Explicit navigation calls identified: 33
- Demo, future-ready or coming-soon references requiring intentional treatment: 35
- Rendered browser walkthrough: Pending because no browser backend was available during register creation
- Physical mobile-device walkthrough: Pending

Statuses used in this register:

- **Verified** — behavior and destination are directly traceable and validation passes.
- **Fixed — regression required** — implementation is repaired, but rendered regression testing remains required.
- **Open** — confirmed implementation or workflow issue.
- **Intentional preview** — incomplete behavior is visibly described as demonstration or coming soon.
- **Browser validation required** — source is connected, but visual or interactive behavior needs rendered confirmation.

## Historical issue register

| ID | Interaction | Role | Originally | Current status | Resolution/history |
|---|---|---|---|---|---|
| QA-H001 | Open Team Evidence | Parent | Appeared to do nothing | Fixed — regression required | Now routes to `child-analysis`; fixed after Sprint 4E. |
| QA-H002 | Open Team Evidence | Coach | Appeared to do nothing | Fixed — regression required | Now routes to team-level `analysis`; fixed after Sprint 4E. |
| QA-H003 | Open Team Evidence | Player | Internal tab handoff was not visible | Fixed — regression required | Now routes to personal `analysis`. |
| QA-H004 | Open Team Evidence | Administrator | Internal tab handoff was not visible | Fixed — regression required | Now routes to club/team `analysis`. |
| QA-H005 | Team Hub demo role selector | All | Called an inert role setter | Fixed — regression required | Now preserves account permissions and displays explicit feedback. |
| QA-H006 | Dashboard attendance confirmation | Parent/Player | Detailed workflow embedded on dashboard | Fixed — regression required | Attending saves immediately; not attending opens Attendance. |
| QA-H007 | Coach replacement management | Coach | Full management workflow cluttered dashboard | Fixed — regression required | Detailed workflow moved to Team Operations; dashboard is a launcher. |
| QA-H008 | AI video during processing | Coach/Admin upload | Preview disappeared during analysis | Fixed — regression required | Preview remains visible and autoplaying throughout processing. |
| QA-H009 | AI Match Briefing | All | Report appeared abruptly | Fixed — regression required | Automatic role-aware briefing precedes report. |
| QA-H010 | AI report role isolation | Parent/Player | Squad exposure risk | Fixed — regression required | Shared report restricts rendering to linked/owned player. |
| QA-H011 | Match Library analysed record | All | Selected match did not restore intelligence | Fixed — regression required | Match Workspace archive now renders inside existing Match Library. |
| QA-H012 | Dashboard first impression | All | Match Centre was not first | Fixed — regression required | Match Centre now renders before AI and role context. |
| QA-H013 | Workflow return path | All | Workflows relied on menu/history | Fixed — regression required | Shared contextual return and breadcrumb bar added. |
| QA-H014 | Workflow completion feedback | All | Several saves ended with transient toast only | Fixed — regression required | Attendance, replacement, AI and session workflows have next-step choices. |

## Open critical issues

| ID | Area | Roles | Status | Reason / impact | Required outcome |
|---|---|---|---|---|---|
| QA-C001 | Match Workspace upload path | Coach/Admin | Open | Analysing a new file from the legacy Match Library upload controls archives the result against `selectedMatchRecord`, overwriting that selected match workspace instead of creating a new match record. | Every upload path must create a unique match ID and immutable workspace. |
| QA-C002 | Role-safe report actions | Parent/Player/Admin | Open | `MatchIntelligenceReport` always displays “Open Session Builder.” App renders Session Builder only for Coach and excludes it from fallback rendering, so restricted roles can reach blank content. | Hide or replace this action according to role. |
| QA-C003 | Attendance workflow duplication | All attendance users | Open | The Attendance route renders `TeamOperations` and the older `AttendancePage` together, creating two attendance experiences and potentially conflicting updates. | Present one authoritative attendance workflow. |
| QA-C004 | Commercial persistence | All | Open | “Permanent” Match Workspaces use browser localStorage. Records are device-specific, clearable and capacity-limited. | Backend persistence, tenancy, access control and media storage required before production. |

## Open high-priority issues

| ID | Area | Roles | Status | Reason / impact |
|---|---|---|---|---|
| QA-HIGH001 | Historical workspace accuracy | All | Open | Pre-existing analysed matches receive generated baseline snapshots based partly on the latest intelligence, not the exact historical output originally generated. |
| QA-HIGH002 | Workspace statistical fidelity | All | Open | Several player detail metrics remain static across players and matches, so archived workspaces are not truly exact snapshots. |
| QA-HIGH003 | Match Centre opponent | All | Open | “Next” mode names Bentleigh Greens while opponent artwork and identity remain hard-coded as Oakleigh United. |
| QA-HIGH004 | Match metadata persistence | Coach/Admin | Open | Edited titles, tags and deleted state are component state only and are lost on remount. Workspace title is not updated with edits. |
| QA-HIGH005 | Context return stack | All | Open | Shared return navigation stores one origin rather than a route stack; multi-step workflows can return to stale context. |
| QA-HIGH006 | Breadcrumb hierarchy | All | Open | Breadcrumb grouping is page-ID based rather than role-aware. AI Analysis belongs to different hubs by role. |
| QA-HIGH007 | AI upload durability | All upload roles | Open | Local video object URLs do not survive refresh. Match metadata persists, but the original uploaded video does not. |
| QA-HIGH008 | AI provenance | All | Open | Deterministic demo statistics can read as genuine computer-vision output without metric-level evidence or provenance. |
| QA-HIGH009 | Consent workflow | Parent/Player | Open | Match upload is available without a complete child-video consent, safeguarding and approval workflow. |
| QA-HIGH010 | Admin reporting discoverability | Administrator | Open | Admin Club, Club Pulse, Football Intelligence and Club Reports overlap without a single reporting definition. |
| QA-HIGH011 | Personal information architecture | Parent/Player | Open | Profile, Journey, Development, Stats, AI, Awards and Achievements are fragmented across many destinations. |
| QA-HIGH012 | Generic fallback masking | All | Open | Placeholder fallback can make a missed component connection appear “navigation connected” instead of exposing a routing defect. |
| QA-HIGH013 | Continue Previous Analysis | All | Open | The action jumps directly to complete state and bypasses normal processing/briefing continuity. |
| QA-HIGH014 | Report duplication | All | Open | AI Studio already renders the completed report, then offers “View Match Intelligence Report,” creating two presentations of the same result. |
| QA-HIGH015 | Team Hub density | Coach/Admin | Open | Team availability, coach replacement, squad, development, AI insights and roadmap occupy one very long page. |

## Open medium-priority issues

| ID | Area | Status | Reason / impact |
|---|---|---|---|
| QA-M001 | Session Builder Edit | Open | Uses `window.prompt`, inconsistent with premium UI and difficult to validate/access. |
| QA-M002 | Match Library Edit/Delete | Open | Uses browser-native prompt/confirm dialogs. |
| QA-M003 | Success patterns | Open | Toasts, sticky notices, AI banners and workflow completion cards use several different visual patterns. |
| QA-M004 | Button language | Open | Uppercase commands, conversational actions and arrow labels are inconsistent. |
| QA-M005 | Small typography | Open | Many eyebrow and metadata labels use 7–9px text; rendered readability needs review. |
| QA-M006 | Inline legacy styling | Open | `PlaceholderPage.jsx` contains large inline-style systems that differ from newer components. |
| QA-M007 | Fixed event data | Open | Team, opponent, date, venue and coach data are repeated across components and can diverge. |
| QA-M008 | Search demo coupling | Open | Search results contain fixed Ava, Springvale and Oakleigh records rather than shared data. |
| QA-M009 | Empty states | Open | Several data-driven modules assume demo records and do not demonstrate zero-data behavior. |
| QA-M010 | AI failure states | Open | Unsupported video, processing failure, low-confidence analysis and retry flows are not represented. |
| QA-M011 | Modal accessibility | Browser validation required | Focus trapping, return focus and Escape behavior need rendered keyboard validation across every modal. |
| QA-M012 | Tab accessibility | Browser validation required | Custom tabs require ARIA selected/state and keyboard navigation verification. |
| QA-M013 | Document links | Browser validation required | Every View/Download asset path and filename must be clicked in production build. |
| QA-M014 | Mobile sticky context | Browser validation required | Sticky breadcrumb beneath sticky top bar may overlap at short viewport heights. |
| QA-M015 | AI timeline mobile height | Browser validation required | Long processing and briefing states need short-phone viewport testing. |

## Open low-priority and polish issues

| ID | Area | Status | Reason / impact |
|---|---|---|---|
| QA-L001 | Weather | Intentional preview | Coaching commitment displays “Weather coming soon.” |
| QA-L002 | Club video | Intentional preview | Watch Club Video produces a coming-soon notice. |
| QA-L003 | Volunteer registration | Intentional preview | Selection ends with future-release copy. |
| QA-L004 | Reward QR redemption | Intentional preview | Correctly marked coming soon. |
| QA-L005 | Canteen menu QR | Intentional preview | Correctly marked coming soon. |
| QA-L006 | Gallery sharing | Intentional preview | Secure sharing reports future availability. |
| QA-L007 | Gallery download | Intentional preview | Approved demo clip download reports disabled state. |
| QA-L008 | Club News images | Open | Uses temporary “CLUB IMAGE” artwork. |
| QA-L009 | Gallery visuals | Open | Several gallery items use generated tone blocks rather than real imagery. |
| QA-L010 | Legacy Topbar button | Open, inactive code | Unused `Topbar.jsx` contains a notification button with no handler. It is not imported by the active shell. |
| QA-L011 | Historical nav config | Open | `previousNavigationConfig` remains bundled as audit reference despite being runtime dead data. |
| QA-L012 | Fixed dates | Open | Demonstration dates will become stale unless centralized/configurable. |

## Role interaction checklist

### Administrator

| Surface / interaction family | Status | Notes |
|---|---|---|
| Login and Dashboard | Browser validation required | Source routes correctly; Match Centre is first. |
| Match Centre modes/actions | Open issue | QA-HIGH003 opponent mismatch. |
| Club AI / Football Intelligence launch | Verified | Routes to authorised intelligence surfaces. |
| Club selector | Verified | Controlled UI; one club currently available. |
| Club Operations summary | Verified | Shared Team Operations state. |
| AI Studio upload and archive | Fixed — regression required | Unique AI Studio match IDs archive correctly. |
| Match Library selection | Fixed — regression required | Workspace restores; legacy upload issue QA-C001 remains. |
| Team Hub and Team Operations | Browser validation required | Detailed controls connected. |
| Admin Club tabs | Verified by source | Component/tab routing is mapped. |
| Settings, Committee, Registrations | Verified by source | Connected pages; some remain foundation workflows. |
| Sponsors, Documents, Awards, Rewards | Verified by source | Correct existing destinations. |
| Volunteers, Equipment, Grounds, Notifications, Permissions | Verified by source | Correct routes; persistence varies by module. |
| Breadcrumb and return | Open issue | Single-origin limitation QA-HIGH005. |

### Coach

| Surface / interaction family | Status | Notes |
|---|---|---|
| Login and Dashboard | Browser validation required | Match Centre-first source order verified. |
| Availability quick actions | Verified by source | Shared storage/events update. |
| Replacement coach workflow | Fixed — regression required | Assignment, handover, accept/decline and completion actions connected. |
| Open Team Evidence | Fixed — regression required | Routes to team AI Analysis. |
| AI Studio | Fixed — regression required | Video, processing, briefing, report and archive connected. |
| Match Library Workspace | Fixed — regression required | Full team/squad view restored per selected record. |
| Football Intelligence tabs/actions | Verified by source | Search, notes, preparation and session/equipment handoffs exist. |
| Drill Exchange filters/cards/upload | Browser validation required | Handlers and local persistence present. |
| Coach Profiles | Browser validation required | Interactive filters/profile presentation present. |
| Session Builder generate/save/edit | Open issue | Save works; edit uses native prompt QA-M001. |
| Equipment controls | Browser validation required | Inventory actions have handlers and feedback. |
| Recognition issue award | Browser validation required | Submit path and local recognition storage present. |

### Parent

| Surface / interaction family | Status | Notes |
|---|---|---|
| Login and linked-child Dashboard | Browser validation required | Selected child state is shared. |
| Attending quick action | Verified by source | Saves immediately and dispatches operational updates. |
| Not Attending handoff | Open issue | Correct route, but duplicate Attendance UI QA-C003. |
| Open Team Evidence | Fixed — regression required | Routes to `child-analysis`. |
| Team Hub privacy | Verified by source | Family mode restricts squad content; role preview is guarded. |
| Match Library filtering | Verified by source | Approved matches intersect linked player IDs. |
| Match Workspace | Open issue | Personal rendering is restricted, but Session Builder action can blank QA-C002. |
| Child AI Analysis | Open issue | Role-safe data; Session Builder action issue remains. |
| Highlights, Stats, Development | Verified by source | Existing role destinations. |
| Awards and Certificates | Verified by source | Existing profile records/assets used. |
| Messages and Calendar | Browser validation required | Interactive source implementations present. |
| Club information pages | Browser validation required | Events, documents, map, values, gallery, canteen connected. |

### Player

| Surface / interaction family | Status | Notes |
|---|---|---|
| Login and Dashboard | Browser validation required | Personal context source path verified. |
| Attendance quick actions | Verified by source | Shared operational state. |
| Open Team Evidence | Fixed — regression required | Routes to personal AI Analysis. |
| Team Hub | Verified by source | Family mode prevents squad analytics. |
| Match Library filtering | Verified by source | Player-owned approved records only. |
| Match Workspace | Open issue | Personal data restriction works; Session Builder action can blank QA-C002. |
| Profile, Stats and Development | Verified by source | Existing player pages. |
| Journey, Awards, Certificates, Rewards, Achievements | Verified by source | Connected destinations; rewards partly future-ready. |
| Highlights | Verified by source | Approved personal presentation. |
| Messages, Calendar, Club pages | Browser validation required | Source handlers present. |

## Shared component checklist

| Component | Interactions checked | Status |
|---|---|---|
| Desktop Sidebar | Links, sections, logout | Browser validation required |
| Mobile Drawer | Open, close, overlay, Escape, item selection, logout | Browser validation required |
| Global Search | Input, result selection, empty result | Verified by source |
| Workflow Navigation | Return, Dashboard breadcrumb | Open issue QA-HIGH005 |
| Match Centre | Live/Next/Recent and footer actions | Open issue QA-HIGH003 |
| Dashboard Event Card | Confirm and negative handoff | Verified by source |
| Team Operations | Availability, overrides, team sheet, checklist | Open issue QA-C003 |
| Coach Commitment | Availability, replacement, AI status, response buttons | Fixed — regression required |
| AI Studio | Upload, preview, analyse, briefing, result actions | Fixed — regression required |
| Match Intelligence Report | Player selection and downstream actions | Open issue QA-C002 |
| Match Library | Selection, upload, edit, tag, highlights, stats, delete | Open issues QA-C001/QA-HIGH004 |
| Match Workspace | Archive restoration and role filtering | Fixed — regression required |
| Workflow Completion | Destination actions | Browser validation required |
| Modals and lightboxes | Open, close, overlay, Escape, focus | Browser validation required |
| Filters and search controls | Controlled state and result filtering | Verified by source; rendered QA pending |

## Performance register

| ID | Finding | Priority | Status |
|---|---|---|---|
| QA-P001 | Main JS bundle approximately 723 KB minified | High | Open |
| QA-P002 | CSS bundle approximately 247 KB | Medium | Open |
| QA-P003 | Springvale logo approximately 218 KB | Medium | Open |
| QA-P004 | No route-level code splitting | High | Open |
| QA-P005 | `PlaceholderPage.jsx` is a large multi-page module | Medium | Open |
| QA-P006 | Match archives in localStorage will grow with every upload | High | Open |

## Accessibility register

| ID | Finding | Priority | Status |
|---|---|---|---|
| QA-A001 | Keyboard and focus audit for all modals | High | Browser validation required |
| QA-A002 | Mobile drawer focus containment | High | Browser validation required |
| QA-A003 | Colour contrast audit | High | Browser validation required |
| QA-A004 | Custom tab keyboard behavior | Medium | Browser validation required |
| QA-A005 | AI live-region verbosity | Medium | Browser validation required |
| QA-A006 | Minimum text size/readability | Medium | Browser validation required |
| QA-A007 | Native prompt/confirm replacement | Medium | Open |
| QA-A008 | Reduced-motion behavior | Low | Implemented; browser validation required |

## Frontend health score

| Area | Score / 10 | Baseline note |
|---|---:|---|
| Navigation | 7.2 | Broad and connected; return stack and naming need work. |
| Dashboard UX | 8.0 | Match Centre-first hierarchy is strong. |
| Coach Experience | 7.9 | Best-connected workflow; dense Team Hub remains. |
| Parent Experience | 7.2 | Clear dashboard; Attendance duplication is serious. |
| Player Experience | 7.1 | Motivating content but fragmented personal architecture. |
| Administrator Experience | 7.0 | Comprehensive but overlapping and partly foundation-level. |
| AI Workflow | 8.1 | Strong narrative; provenance and restricted downstream actions need correction. |
| Workflow Continuity | 6.9 | Completion/return improved; several critical handoffs remain. |
| Mobile Experience | 7.2 | Strong source-level rules; physical device validation outstanding. |
| Commercial Readiness | 6.4 | Excellent guided demo, not ready for operational production. |
| Overall Frontend Quality | **7.3** | Strong product vision with four critical frontend/backend-boundary issues. |

## Sprint close summary

### New issues discovered during register creation

- QA-C001: Legacy Match Library analysis overwrites selected workspace.
- QA-C002: Session Builder action can produce blank content for non-coach roles.
- QA-C003: Duplicate Attendance experiences render together.
- QA-C004: localStorage does not meet permanent commercial archive requirements.
- QA-HIGH001/002: Historical and player-level archive data are not exact generated snapshots.
- QA-HIGH003: Match Centre opponent mismatch.
- QA-HIGH004: Match metadata actions are not persistent.

### Issues fixed before this register

- Open Team Evidence for all roles.
- Dashboard attendance and coach commitment simplification.
- AI persistent preview and Match Briefing.
- Role-aware Match Intelligence.
- Match Workspace archive and selection.
- Match Centre-first dashboard order.
- Context return, breadcrumbs and completion choices.

### Remaining issues

- Critical: 4
- High: 15
- Medium: 15
- Low/polish: 12
- Performance: 6
- Accessibility/browser validation: 8

### Critical blockers before MatchVision V2 backend work

1. Correct Match Library’s secondary upload/archive behavior.
2. Remove role-invalid Session Builder actions from shared reports.
3. Consolidate Attendance into one workflow.
4. Define backend persistence and authorization for permanent match records.

## Recommended next sprint

Run a narrow **Frontend Critical Workflow Stabilization Sprint** with no new features:

1. Fix QA-C001, QA-C002 and QA-C003.
2. Add automated route/role tests for all shared report actions.
3. Add an automated unique-workspace regression test for consecutive uploads.
4. Test all four roles in a rendered browser at desktop, tablet and mobile widths.
5. Update this register in place; do not remove historical entries.

## Mandatory future sprint close procedure

Every sprint must:

1. Run lint, production build and `git diff --check`.
2. Test every modified interaction for all permitted roles.
3. Re-test adjacent workflow entry and return paths.
4. Add newly discovered issues to this register.
5. Update resolved issues with sprint name and regression status.
6. Report new issues, fixed issues, remaining issues and critical blockers.
7. Recalculate the Frontend Health Score.

