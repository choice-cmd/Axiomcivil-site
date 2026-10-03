---
title: "Why registration reports and control checks matter on federal marine work"
description: "What a point cloud registration report actually tells you, and why tying scans to a survey control network matters on marine and federal projects."
pubDate: 2026-09-30
author: Choice Sterling, PLS
draft: true
tags: [QA/QC, Point clouds, Marine]
---
When a point cloud leaves the office on any project, the first thing I look for is the registration report. On megaprojects and especially federal marine work, it's not paperwork for its own sake — it's how everyone downstream knows the scan is trustworthy before anyone builds off it.

## What a registration report is really telling you

A megaproject is too big for one scan setup. You take dozens of scans from different stands — on piers, on barges, on ladder stages over the water — and the software stitches them into one model. Registration is the step where all those individual scans get aligned into a single coordinate system. The report is the record of how well that alignment worked: how many setups, how they connect to each other, and the residuals showing where adjacent scans agree or disagree.

A report that only shows scan-to-scan error tells you the model is internally consistent — the pieces fit together. That's necessary, but on federal marine work it's not enough.

## Why control checks matter

Internal consistency means the cloud looks solid relative to itself. It doesn't mean it's correct in the real world. Two scans can register beautifully and still sit in the wrong place or at the wrong elevation if nothing ties them to survey control.

That's where control checks come in. You include surveyed control points — known coordinates with a known origin — in the scan, and the report shows how the registered cloud matches those points. On marine work this is where problems surface. Tides move the water, a dock can shift with load, a barge stage can settle between setups. None of that shows up in scan-to-scan registration, but it all shows up as a bad residual at a control point.

I've seen the difference this makes on federal contracts where the as-built record has to be defensible. The owner's rep and the project survey lead aren't asking whether the model looks clean on screen. They're asking whether it can be relied on for the next step — pile driving, precast placement, as-built verification of a wharf or dry dock.

## What I want in the report

A few things I expect before anyone treats a marine point cloud as final:

- A registration report with the error statistics spelled out, not buried.
- Control points included in the scan, and residuals reported against them.
- Independent check points withheld from the registration, with residuals reported separately from the control used to register.
- The control network itself documented, so the origin is traceable to primary control established in the contract documents, not just to an arbitrary setup.
- A check that the cloud agrees with the design geometry, not just with itself.

If any of those are missing, I flag it. On a multi-hundred-million-dollar federal marine project, a cloud that's off by the width of a rebar can turn into a costly change order downstream. Catching it in the report costs minutes.

## The marine part is the hard part

Registration is where the environment fights back on marine work. Reflective steel, wet surfaces, moving equipment, setups limited by where there's a stable place to stand. All of that creates noise and drift that isn't necessarily encountered on dry land. The report is where that shows up before it becomes a field problem. Good control checks are what separate a cloud you can build from, and one you're hoping is correct.

My experience includes work on federal marine projects — naval waterfront facilities, operational dry docks, and pier work at naval shipyards. None of that goes forward on a cloud that hasn't proven itself against control. The report is how we prove it.

If you're an owner's rep or a project manager on a marine job, the ask is simple: ask to see the registration report and the control residuals before you sign off on the scan. If they're not there, that's a conversation worth having — before the concrete goes in, not after.
