---
name: Bug report
about: Report a bug/issue
title: 'Bug: <title>'
labels: bug, needs triage
---

<!--

WARNING: Please read this carefully to avoid submitting useless bug reports that will be ignored.

If you do not include at least the YTAF version and enough information to determine your webOS version, your issue may be closed without a response.

Check existing issues to see if there is already one covering your problem.

The more information you include, the better.

However, you must include *at least* the YTAF (YouTube Ad-Free) version and:
- webOS version, or
- firmware version (sometimes referred to as "software version" on TV) *and* either OTAID (preferred) or SoC

-->

## YTAF information

<!--

  Example:

  - YTAF version: 0.3.3

-->

- YTAF version:

## TV information

<!--

  Example:

  - webOS version: 6.3.2
  - Firmware version: 03.34.65
  - OTAID: HE_DTV_W21P_AFADATAA
  - SoC: k7lp
  - Model: 50UP7670PUC

-->

- webOS version:
- Firmware version:
- OTAID:
- SoC:
- Model:

<!--

This information can all be found in /var/run/nyx/device_info.json and /var/run/nyx/os_info.json.

In `device_info.json`:
  * SoC: `device_name`
  * OTAID: `hardware_id`
  * model: `product_id`

In `os_info.json`:
  * webOS version: `core_os_release`
  * firmware version: `webos_manufacturing_version`

If you do not have access to those files, the webOS version can always be found somewhere in the settings menu.

-->

## Issue description

<!--

Describe the bug/issue and how to reproduce it. Provide as much information as possible. For example, include screenshots or links to videos that trigger the problem.

Please also check whether you are able to open the YTAF options panel using the green button and include that information here.

-->
