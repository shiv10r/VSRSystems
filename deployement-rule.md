# VSR Systems — Deployment Guide (current: React + .NET API)

 is a web app for a construction/interior business — chat-based expense logging,
billing (parties, items, transactions, cash/bank, cheques), project management (tasks,
materials, attendance, MOM, design files), analytics, reports, and an optional open-source
DeepSeek AI chat. It is a **React frontend + .NET 10 API** backed by SQLite.

## Safety Rule

- Perform only safe development work: inspect and edit project files, and run low-risk static checks or builds only when explicitly permitted by the user.
- Do not unit test, launch, start, configure, or otherwise operate an MCP server or any local server unless the user explicitly asks in the current conversation.
- Do not run local unit tests unless the user explicitly asks to run them. The user may run them independently, or explicitly tell the assistant when to do so.
- Do not install software, packages, extensions, tools, or dependencies without explicit user approval.
- Do not access, browse, scan, or explore external systems, services, websites, networks, or resources without explicit user approval.
- Before any approved action that could alter the device, install software, consume resources, expose data, or otherwise create a risk, warn the user about the specific action and potential impact, then wait for confirmation.

Setup backend and front end of the application  for n fe willl be deployed but i  u setup be  code also it should folloe mnc architecture  controller , businsees layer reporitoy and ibusness i repo setup a sql  db locally but  on deployemet i will use sqllite on the website for now  so sql wil lcome in alter phase  
u have  full access to to this file path only  no harm should happen to my d evice or me in any terma whie ldeveloing alway do safe coding dont install  anyting  suspecious  

 pur my email in  contact  -shr1030cd@gmail.com
 dont write the test case or test on mcp dotn wate time i will do that u onyl develop

 setup evything in d drive 

## Development Execution Rule

- Limit initial mapping, repository exploration, and planning to a few minutes. Once the relevant files and root cause are identified, stop mapping and begin implementation.
- Break approved work into small, ordered coding chunks. Complete and statically verify each chunk before starting the next; do not delay implementation for exhaustive planning or repeated analysis.
- After completed work passes the approved static checks, commit the intended changes and push the current branch to its configured remote unless the user explicitly says not to push. Never force-push or rewrite shared history.
- Start implementation after the architecture and required safety decisions are clear.
- Break the work into ordered phase bundles. Each phase must produce a coherent, buildable part of the project.
- Resolve errors and blockers introduced in the current phase before moving to the next phase.
- Continue through the approved phases without repeatedly asking to proceed. Pause only when a new action requires explicit safety permission, an irreversible decision, or missing information that materially changes the result.
- Keep all project work inside `D:\Projects\VSR Systems`.
- Follow the existing restrictions: do not run tests or local servers, do not access external resources unless explicitly approved, and do not install unapproved or global software.
- Use the approved static checks after implementation phases: lint, TypeScript checking, and production build.
- Build the complete approved project, not an MVP, demo, skeleton, or partial placeholder release.
- Do not launch the application locally, run local browser checks, or run tests. The user will perform runtime testing.
- Keep agent communication and tool usage concise and implementation-focused to avoid wasting time or tokens.

## Session Correction Rules

- For an explicit `add`, `change`, `fix`, or `implement` request, begin editing in the same response after at most one focused context lookup. Do not block coding on brainstorming, design approval, plan writing, external research, or subagent execution unless the user explicitly requested that workflow.
- If a delegated implementation aborts twice, implement directly immediately. Do not launch another delegate for the same work.
- For a clear, scoped task, perform one brief context pass and start editing immediately. Do not create a design document, implementation plan, research task, or subagent delegation unless the user requests one or a missing architectural decision genuinely blocks coding.
- Before the first edit on a small task, use no more than two repository lookup calls. Read only the named file and its direct dependency or caller when needed.
- Do not repeatedly announce plans, skills, or intended tool usage. Prefer a short statement of the edit being made, then show concrete progress.
- Ask a clarifying question only when the missing answer would materially change the implementation. Do not ask for confirmation when the user has already given a clear implementation instruction.
- If a delegated task or tool approach aborts or fails, retry that approach at most once. After the second failure, stop delegating and implement the scoped change directly with the available local tools.
- Break larger work into coding chunks that each end with an edit and an approved static check. Do not spend multiple turns mapping the whole project before completing the first chunk.
- For external products, pricing, quotas, or account features, verify the current official documentation and the user's actual dashboard evidence before making a claim. Never describe a feature as free or available when the user's account shows an upgrade gate.
- Distinguish source-code completion from deployed behavior. Do not claim a hosted integration works until it has been deployed and verified; clearly name any owner-only dashboard step that remains.
- When the user corrects the process, apply the correction directly and concisely. Do not respond with performative agreement or repeat the same workflow that caused the complaint.
- After implementation, run only the repository-approved static checks, create focused commits, push the configured branch, and report the commit and push result without unnecessary recap.

u cant spend so much time in single taks like architecture planning or anything u have t ostart wroking and planning and plotting all together split  task in small chuks wokr untill its completed

