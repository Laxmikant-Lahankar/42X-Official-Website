---
author: 42X Academy Team
slug: sap-security-incident-november-2026
seoTitle: "SAP Security Incident, November 2026 Explained | 42X Academy"
description: "SAP security news, November 2026: the GitHub 'suspicious activity', CVE-2025-42884 added to CISA KEV, and the Patch Day fixes SAP teams should check."
primaryKeyword: SAP security incident November 2026
secondaryKeywords:
  - SAP security vulnerability
  - CVE-2025-42884
  - SAP Note 3660969
  - SAP Security Patch Day November 2026
  - SAP NetWeaver vulnerability CISA KEV
  - SAP BASIS security
date: 2026-11-27T12:00:00.000+05:30
title: "SAP Security Incident and CVE-2025-42884: What SAP Teams Should Do Now"
intro: "Two pieces of SAP security news landed in the same week. On 26 November 2026, SAP confirmed it had found 'suspicious activity' and said it has found no evidence of unauthorized access to customer business data. Separately, on 20 November 2026, the US Cybersecurity and Infrastructure Security Agency (CISA) added an SAP NetWeaver flaw, CVE-2025-42884, to its catalog of actively exploited vulnerabilities. This post explains what is confirmed, what is only reported, and what SAP BASIS teams should check."
faqs:
  - question: "Was SAP hacked in November 2026?"
    answer: "SAP has not said that. On 26 November 2026, SAP confirmed it identified 'suspicious activity' and took measures to protect customers. According to dpa, which saw part of an internal letter, the activity concerned SAP's GitHub developer platform. Der Spiegel called it a hacking attack, but SAP did not confirm that description."
  - question: "Is SAP customer data affected?"
    answer: "SAP said: 'Based on our investigation to date, we have found no evidence of unauthorized access to customer business data.' No customer impact has been publicly confirmed by any source. The investigation was still ongoing as of 27 November 2026."
  - question: "What is CVE-2025-42884?"
    answer: "It is a JNDI injection vulnerability in SAP NetWeaver Enterprise Portal (EP-BASIS 7.50 and EP-RUNTIME 7.50). According to the CVE record, an unauthenticated attacker could cause the server to use an unintended JNDI provider, which could lead to disclosure or modification of server information. SAP rates it CVSS 6.5 (Medium). CISA added it to its Known Exploited Vulnerabilities catalog on 20 November 2026."
  - question: "Which SAP Note fixes CVE-2025-42884?"
    answer: "SAP Security Note 3660969, published on 11 November 2025. Onapsis, which found the flaw, also recommends SAP Note 3660659 as an extra layer of protection. Both notes are available to SAP customers through SAP for Me."
  - question: "Why does a 'Medium' SAP vulnerability matter?"
    answer: "Because exposure matters as much as the score. SAP rated CVE-2025-42884 at 6.5, while Onapsis originally rated it 10.0, explaining that the difference depends on what is available on the system at runtime. A year after the fix, CISA listed it as actively exploited. On internet-facing systems, 'Medium' notes deserve prompt attention."
  - question: "How do I check if my SAP system is patched?"
    answer: "Check whether the relevant SAP Security Notes are implemented on each system, for example through SAP's note tools and your support package level, and compare against SAP's monthly Security Patch Day page. SAP releases security notes on the second Tuesday of each month; the next is 8 December 2026. If an exposed system was unpatched for a while, patching alone is not enough: also check it for signs of compromise."
cta:
  heading: "Want to understand SAP systems from the inside?"
  text: "Book a free session to talk about SAP BASIS and the skills behind patching, users and system security. Live online from anywhere, or in class on J.M. Road, Pune."
  buttons:
    - label: Book a free session
      url: https://42xacademy.com/contact?intent=demo&src=blog-sap-security-incident-november-2026
    - label: View the SAP BASIS course
      url: https://42xacademy.com/courses/sap-basis
---
*Updated 27 November 2026. We'll update this post if SAP publishes new information.*

## SAP security news in November 2026: the short version

Three separate things happened this month, and they are easy to mix up:

| Date | What happened | Status |
|---|---|---|
| 10 November 2026 | SAP's monthly Security Patch Day, including four flaws rated CVSS 10.0 | Fixes released; no exploitation reported |
| 20 November 2026 | CISA added SAP NetWeaver flaw CVE-2025-42884 to its Known Exploited Vulnerabilities catalog | Fix available since November 2025 |
| 26 November 2026 | SAP confirmed "suspicious activity", reportedly on its GitHub developer platform | Under investigation; no evidence of access to customer business data, per SAP |

Each one is explained below, with sources. This post is educational and is not incident-response advice for any specific system.

## The GitHub incident: what SAP confirmed

On the evening of 26 November 2026, after a report by Der Spiegel, SAP issued a short statement. As quoted by [The Next Web](https://thenextweb.com/news/sap-security-incident-github-breach), SAP said: "SAP has identified suspicious activity and promptly implemented the necessary measures to protect its customers." SAP also told [SecurityWeek](https://www.securityweek.com/sap-confirms-cyberattack-source-code-reportedly-compromised/): "Based on our investigation to date, we have found no evidence of unauthorized access to customer business data."

According to the German news agency dpa, which saw part of an internal SAP letter, the activity concerned SAP's developer productivity and software delivery platform, GitHub. Employees were asked to check whether they needed to take security steps such as changing credentials ([WirtschaftsWoche](https://www.wiwo.de/unternehmen/it/cyberangriff-auf-sap-was-zum-vorfall-bei-github-bekannt-ist/100273210.html)).

SAP did not confirm Der Spiegel's description of a "hacking attack". It also has not said when the activity was found, what kind of activity it was, or which areas were affected.

### What is reported but not confirmed by SAP

Der Spiegel, citing an insider and an internal notice, reported that employee access tokens were stolen and used to copy and alter source code on GitHub, possibly with the help of AI tools. Handelsblatt reported that SAP replaced signing keys and limited GitHub access. These claims come from press reports summarised by [SecurityWeek](https://www.securityweek.com/sap-confirms-cyberattack-source-code-reportedly-compromised/) and The Next Web. SAP has not confirmed them, and none of the reports says that altered code reached software delivered to customers.

### What is still unknown

Who was responsible, how access was obtained, which repositories were involved and whether any shipped software was affected are all unknown. SecurityWeek and The Next Web report that no link has been established to earlier 2026 incidents. If your organisation runs SAP, follow SAP's official communications through your usual support channels rather than social media summaries.

## CVE-2025-42884: an SAP NetWeaver flaw now listed as actively exploited

For SAP administrators, this is the more practical story. On 20 November 2026, [CISA added CVE-2025-42884](https://www.cisa.gov/news-events/alerts/2026/11/20/cisa-adds-four-known-exploited-vulnerabilities-catalog) to its Known Exploited Vulnerabilities (KEV) catalog. The [KEV entry](https://www.cisa.gov/known-exploited-vulnerabilities-catalog?field_cve=CVE-2025-42884) gives US federal agencies a due date of 23 November 2026 and the required action "Apply mitigations in accordance with vendor instructions".

**What it is.** According to the official CVE record published by SAP, CVE-2025-42884 is a JNDI injection vulnerability in SAP NetWeaver Enterprise Portal. It affects EP-BASIS 7.50 and EP-RUNTIME 7.50. An unauthenticated attacker could make the portal use an unintended JNDI provider, which "could further lead to disclosure or modification of information about the server". SAP rates it CVSS 6.5 (Medium).

**The fix.** SAP released Security Note 3660969 on 11 November 2025, a full year before the KEV listing.

**Why the score differs.** Security firm [Onapsis](https://onapsis.com/blog/cve-2025-42884-sap-netweaver-jndi-injection-rce/), which reported the flaw to SAP, originally rated it CVSS 10.0. Onapsis says the gap from SAP's 6.5 "mainly reflects which gadgets are assumed to be available at runtime", and that remote code execution is possible under certain conditions.

**Exploitation.** Onapsis reports that it observed exploitation attempts from early November 2026, and that most recorded attempts failed. No attacker has been named and no victims have been publicly identified. Onapsis recommends applying SAP Note 3660969 and, as defence in depth, SAP Note 3660659.

We have deliberately left out technical attack details. Administrators who need detection guidance should use the Onapsis advisory and SAP's notes directly.

## November 2026 Security Patch Day: four CVSS 10.0 fixes

SAP releases security notes on the second Tuesday of each month. On 10 November 2026, according to [SAP's Patch Day page](https://support.sap.com/en/my-support/knowledge-base/security-notes-news/november-2026.html), it published 35 new Security Notes, 4 GitHub security advisories and 3 updates to earlier notes. Four issues carried the maximum CVSS score of 10.0:

- **CVE-2026-76964**, memory corruption in SAP NetWeaver AS ABAP (Internet Communication Manager, ICM)
- **CVE-2026-89126**, memory corruption in SAP Web Dispatcher
- **CVE-2026-89103**, broken access control in SAP Gateway (named "PROXYGATE" by Onapsis)
- **CVE-2026-120017**, missing authentication in the SAML2 service provider of SAP NetWeaver AS ABAP

See SAP's Patch Day page for the matching note numbers and affected releases. As of 27 November 2026, none of the sources we reviewed reported these four being exploited. The [Canadian Centre for Cyber Security](https://cyber.gc.ca/en/alerts-advisories/sap-security-advisory-november-2026-monthly-rollup-av26-1137) also issued an advisory (AV26-1137) urging administrators to review SAP's page and apply the updates. [SecurityWeek](https://www.securityweek.com/sap-patches-critical-icm2shell-proxygate-vulnerabilities/) notes that exposure to PROXYGATE depends on how the Gateway's access control lists are configured.

## Earlier in 2026: the wider pattern

This is not the first SAP-related security story this year. On 29 April 2026, [BleepingComputer reported](https://www.bleepingcomputer.com/news/security/official-sap-npm-packages-compromised-to-steal-credentials/) that four official SAP npm packages used in CAP and MTA development had been published with credential-stealing code. In August, a critical SAP Commerce Cloud flaw (CVE-2026-58231, fixed in SAP Note 3771065) drew exploitation attempts three days after its patch, [according to BleepingComputer](https://bleepingcomputer.com/news/security/max-severity-sap-commerce-cloud-flaw-now-targeted-in-attacks).

The common thread is not that SAP is unusually insecure. Large enterprise systems are valuable targets, and the gap between "patch released" and "attackers try it" is getting shorter.

## What SAP BASIS teams should check

These are high-level steps drawn from SAP, CISA and researcher guidance. Your own landscape, contracts and security team should decide the details.

1. **Make Patch Day a monthly routine.** SAP [recommends implementing security notes "at a priority"](https://support.sap.com/securitynotes). The next Patch Day is 8 December 2026. Keep support packages and kernels current, because SAP provides fixes only for supported levels.
2. **Don't skip "Medium" notes on exposed systems.** CVE-2025-42884 was rated Medium and was listed as actively exploited a year later. Judge priority by exposure as well as score.
3. **Use the CISA KEV catalog as a signal.** If an SAP CVE appears there, treat it as urgent.
4. **Reduce internet exposure.** Avoid exposing AS Java, ICM, Web Dispatcher and Gateway services to untrusted networks unless the business truly needs it, and block portal services you don't use.
5. **Harden the SAP Gateway.** Configure the Gateway access control lists so that only trusted hosts can connect.
6. **Restrict outbound traffic** from application servers to what they actually need.
7. **Remember that patching is not cleaning.** Onapsis points out that a patch does not remove anything an attacker may already have left behind. Check exposed systems that were unpatched for signs of compromise.
8. **Protect developer credentials.** Use least privilege and short-lived tokens for developer, CI and automation accounts, and pin and verify build dependencies.

## Why these skills matter for SAP careers

Every item on that checklist is everyday SAP BASIS work: applying notes and support packages, upgrading kernels, managing users and roles, configuring the Gateway and Web Dispatcher, and monitoring systems. Weeks like this show why companies running SAP need people who understand the platform, not just the business processes on top of it.

If you are new to this area, start with our guide [what is SAP BASIS](/blog/what-is-sap-basis), which explains the role and daily tasks. Our [SAP BASIS course](/courses/sap-basis) covers users and roles, transports, background jobs, HANA, monitoring, patches, kernel upgrades and security basics over about 12.5 weeks. Developers can look at the [SAP ABAP course](/courses/sap-abap) and our roadmap on [how to become an SAP ABAP developer](/blog/how-to-become-sap-abap-developer). Not sure which track suits you? Read [which SAP module to choose](/blog/which-sap-module-to-choose) or compare all [courses](/courses).

A training course is a starting point, not a security certification. Our course certificate is not an SAP certification.

42X Academy is an independent training provider and is not affiliated with SAP SE.

## Next step

If you would like to work on the systems side of SAP, [book a free session](/contact?intent=demo) with a mentor. Join live online classes from anywhere, or the classroom on J.M. Road, Pune.
