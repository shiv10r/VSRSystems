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

