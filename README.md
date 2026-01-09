![scayle-logo-cr](https://cdn-prod.scayle.com/public/media/general/SCAYLE-Commerce-Engine-header.png)

<h1 align="center">
  SCAYLE Panel Icons Library
</h1>

<h4 align="center">
  <a href="https://scayle.dev/en/add-on-guide/getting-started/panel-icons-library">Documentation</a> |
  <a href="https://www.scayle.com/">Website</a>
</h4>

<p align="center">
  The SCAYLE <strong>Panel Icons Library</strong> offers all the Panel icons you know and love.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@scayle/panel-icons"><img src="https://img.shields.io/badge/icons-248-success" alt="Icons counter"></a>
  <a href="https://www.npmjs.com/package/@scayle/panel-icons"><img src="https://img.shields.io/npm/v/@scayle/panel-icons" alt="Latest Release"></a>
  <a href="https://www.npmjs.com/package/@scayle/panel-icons"><img src="https://img.shields.io/npm/dt/@scayle/panel-icons" alt="Total Downloads"></a>
  <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="SCAYLE's *Panel Icon Library* is released under the MIT license." /></a>
</p>

## Getting Started

Visit the [Add-On Developer Guide](https://scayle.dev/en/add-on-guide) to learn more on how to use the Panel icons.

Visit the [Docs](https://scayle.dev) to learn more about our system requirements.

## What is SCAYLE ?

[SCAYLE](https://scayle.com) is a full-featured e-commerce software solution that comes with flexible APIs. Within SCAYLE, you can manage all aspects of your shop, such as products, stocks, customers, and transactions.

Learn more about [SCAYLE’s architecture](https://scayle.dev/en/developer-guide/introduction/infrastructure) and [commerce modules](https://scayle.dev/en/getting-started) in the Docs.

## Installation

```shell
npm i -S @scayle/panel-icons
```

## Usage

The `icons/` directory contains all the icon files as svg. Do what you want with them.

## Upgrade guide from version 3.0.0 to 4.3.0

To upgrade your panel-icons library, change the version for @scayle/panel-icons to "^4.3.0"

#### New icons in version 4.3.0
- triangle-down
- triangle-left
- triangle-up

#### New icons in version 4.2.0
- product-ai

#### New icons in version 4.1.0
- column-settings

#### New icons in version 4.0.1
- sort-descending
- code
- logo-scayle
- logo-tradebyte
- logo-tradebyte-green
- logo-tradebyte-grey
- marketplaces
- shop
- sort-ascending

#### Breaking changes in version 4.0.0
- Undocumented icons have been removed

#### New icons in version 3.5.0
- pallet-boxes

#### New icons in version 3.3.0
- key-permissions

#### New icons in version 3.2.0
- clock
- device-tablet
- git-branch
- git-commit
- loading

#### New icons in version 3.1.0
- payments

## Upgrade guide from version 2.2.0 to 3.0.0

To upgrade your panel-icons library, change the version for @scayle/panel-icons to "^3.0.0"

#### The size of individual Icons has been standardized
- carrier
- list-view
- loyalty
- nested-list-view
- sust-cotton
- tile-view

#### New icons
- calculator
- check-circle
- revert

## Upgrade guide from version 1.4.2 to 2.0.0

To upgrade your panel-icons library, change the version for @scayle/panel-icons to "^2.0.0"

- Icon prefix ic- has been removed for all icon names
- 14 Icons have been renamed, see list below!
- 27 new Icons have been added, see list below
- The edit icon graphic has been updated slightly
- All Icon files have been moved from img folder to icons folder
- Updated generatePanelIcons method in your vite.config.ts (see README.md file)

Changed icon names
- 2fa-restore → two-fa-restore
- key-2 → key-framed
- logistics-1 → logistics-boxes-crane
- logistics-2 → logistics-box-trolley
- arrow-down → chevron-down
- arrow-left → chevron-left
- arrow-up → chevron-up
- arrow-right → chevron-right
- Edit icon graphic has been updated
- arrow-down-double → chevron-double-down
- arrow-left-double → chevron-double-left
- arrow-up-double → chevron-double-up
- arrow-right-double → chevron-double-right
- arrow-up-down-table → chevron-up-down-table
- arrow-up-down → chevron-up-down

## Icon Components

It's possible to automatically convert the icons into components using [unplugin-icons](https://github.com/antfu/unplugin-icons).
An example using Vue 3 and webpack can be seen in the [demo-add-on](https://github.com/scayle/demo-add-on-vite).
The plugin is also compatible with other frameworks and build tools.

__vite.config.ts__
```typescript 
import fs from 'fs';
import path from 'path';
import IconsPlugin from 'unplugin-icons/vite';

function generatePanelIcons() {
    const dir = path.join(path.dirname(require.resolve('@scayle/panel-icons')), 'icons');
    let icons: Record<string, string> = {};

    fs.readdirSync(dir).forEach(function (file: string) {
        const simpleName = file.replace('.svg', '');
        icons[simpleName] = fs.readFileSync(path.join(dir, file)).toString('utf8');
    });

    return icons;
}

/* ... */
{
    plugins: [
        /* ... */
        IconsPlugin({
            compiler: 'vue3',
            defaultClass: 'icon',
            customCollections: {
                panel: generatePanelIcons()
            }
        }),
    ]
}
```

Then inside the Vue single-file components, import and use the icon component.

```vue
<script lang="ts" setup>
import IconClose from '~icons/panel/close';
</script>
```

If you're using TypeScript, make sure to add `"unplugin-icons/types/vue"` to the types in your tsconfig.json.

It can also be combined with [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) to avoid the import step.

## Icons

| Name                       | Icon                                        | Filename                                 | Vue                                             |
|----------------------------|---------------------------------------------|------------------------------------------|-------------------------------------------------|
| activity                   | ![](./icons/activity.svg)                   | `./icons/activity.svg`                   | `<IconActivity class="icon" />`                 |
| add                        | ![](./icons/add.svg)                        | `./icons/add.svg`                        | `<IconAdd class="icon" />`                      |
| analytics                  | ![](./icons/analytics.svg)                  | `./icons/analytics.svg`                  | `<IconAnalytics class="icon" />`                |
| app                        | ![](./icons/app.svg)                        | `./icons/app.svg`                        | `<IconApp class="icon" />`                      |
| arrow-bottom-right         | ![](./icons/arrow-bottom-right.svg)         | `./icons/arrow-bottom-right.svg`         | `<IconArrowBottomRight class="icon" />`         |
| arrow-circle-down          | ![](./icons/arrow-circle-down.svg)          | `./icons/arrow-circle-down.svg`          | `<IconArrowCircleDown class="icon" />`          |
| arrow-circle-filled-down   | ![](./icons/arrow-circle-filled-down.svg)   | `./icons/arrow-circle-filled-down.svg`   | `<IconArrowCircleFilledDown class="icon" />`    |
| arrow-circle-filled-left   | ![](./icons/arrow-circle-filled-left.svg)   | `./icons/arrow-circle-filled-left.svg`   | `<IconArrowCircleFilledLeft class="icon" />`    |
| arrow-circle-filled-right  | ![](./icons/arrow-circle-filled-right.svg)  | `./icons/arrow-circle-filled-right.svg`  | `<IconArrowCircleFilledRight class="icon" />`   |
| arrow-circle-filled-up     | ![](./icons/arrow-circle-filled-up.svg)     | `./icons/arrow-circle-filled-up.svg`     | `<IconArrowCircleFilledUp class="icon" />`      |
| arrow-circle-left          | ![](./icons/arrow-circle-left.svg)          | `./icons/arrow-circle-left.svg`          | `<IconArrowCircleLeft class="icon" />`          |
| arrow-circle-right         | ![](./icons/arrow-circle-right.svg)         | `./icons/arrow-circle-right.svg`         | `<IconArrowCircleRight class="icon" />`         |
| arrow-circle-up            | ![](./icons/arrow-circle-up.svg)            | `./icons/arrow-circle-up.svg`            | `<IconArrowCircleUp class="icon" />`            |
| arrow-down                 | ![](./icons/arrow-down.svg)                 | `./icons/arrow-down.svg`                 | `<IconArrowDown class="icon" />`                |
| arrow-left                 | ![](./icons/arrow-left.svg)                 | `./icons/arrow-left.svg`                 | `<IconArrowLeft class="icon" />`                |
| arrow-left-right           | ![](./icons/arrow-left-right.svg)           | `./icons/arrow-left-right.svg`           | `<IconArrowLeftRight class="icon" />`           |
| arrow-right                | ![](./icons/arrow-right.svg)                | `./icons/arrow-right.svg`                | `<IconArrowRight class="icon" />`               |
| arrow-up                   | ![](./icons/arrow-up.svg)                   | `./icons/arrow-up.svg`                   | `<IconArrowUp class="icon" />`                  |
| attach                     | ![](./icons/attach.svg)                     | `./icons/attach.svg`                     | `<IconAttach class="icon" />`                   |
| ban                        | ![](./icons/ban.svg)                        | `./icons/ban.svg`                        | `<IconBan class="icon" />`                      |
| bars                       | ![](./icons/bars.svg)                       | `./icons/bars.svg`                       | `<IconBars class="icon" />`                     |
| basket                     | ![](./icons/basket.svg)                     | `./icons/basket.svg`                     | `<IconBasket class="icon" />`                   |
| bell                       | ![](./icons/bell.svg)                       | `./icons/bell.svg`                       | `<IconBell class="icon" />`                     |
| bell-add                   | ![](./icons/bell-add.svg)                   | `./icons/bell-add.svg`                   | `<IconBellAdd class="icon" />`                  |
| bell-disabled              | ![](./icons/bell-disabled.svg)              | `./icons/bell-disabled.svg`              | `<IconBellDisabled class="icon" />`             |
| book-open                  | ![](./icons/book-open.svg)                  | `./icons/book-open.svg`                  | `<IconBookOpen class="icon" />`                 |
| bookmark                   | ![](./icons/bookmark.svg)                   | `./icons/bookmark.svg`                   | `<IconBookmark class="icon" />`                 |
| bookmark-fill              | ![](./icons/bookmark-fill.svg)              | `./icons/bookmark-fill.svg`              | `<IconBookmarkFill class="icon" />`             |
| bookmark-off               | ![](./icons/bookmark-off.svg)               | `./icons/bookmark-off.svg`               | `<IconBookmarkOff class="icon" />`              |
| box-search                 | ![](./icons/box-search.svg)                 | `./icons/box-search.svg`                 | `<IconBoxSearch class="icon" />`                |
| box-success                | ![](./icons/box-success.svg)                | `./icons/box-success.svg`                | `<IconBoxSuccess class="icon" />`               |
| calculator                 | ![](./icons/calculator.svg)                 | `./icons/calculator.svg`                 | `<IconCalculator class="icon" />`               |
| calendar                   | ![](./icons/calendar.svg)                   | `./icons/calendar.svg`                   | `<IconCalendar class="icon" />`                 |
| calendar-in                | ![](./icons/calendar-in.svg)                | `./icons/calendar-in.svg`                | `<IconCalendarIn class="icon" />`               |
| calendar-out               | ![](./icons/calendar-out.svg)               | `./icons/calendar-out.svg`               | `<IconCalendarOut class="icon" />`              |
| calendar-time              | ![](./icons/calendar-time.svg)              | `./icons/calendar-time.svg`              | `<IconCalendarTime class="icon" />`             |
| carrier                    | ![](./icons/carrier.svg)                    | `./icons/carrier.svg`                    | `<IconCarrier class="icon" />`                  |
| certificate                | ![](./icons/certificate.svg)                | `./icons/certificate.svg`                | `<IconCertificate class="icon" />`              |
| channel                    | ![](./icons/channel.svg)                    | `./icons/channel.svg`                    | `<IconChannel class="icon" />`                  |
| chart-bars                 | ![](./icons/chart-bars.svg)                 | `./icons/chart-bars.svg`                 | `<IconChartBars class="icon" />`                |
| chart-pie                  | ![](./icons/chart-pie.svg)                  | `./icons/chart-pie.svg`                  | `<IconChartPie class="icon" />`                 |
| chat-bubbles               | ![](./icons/chat-bubbles.svg)               | `./icons/chat-bubbles.svg`               | `<IconChatBubbles class="icon" />`              |
| check-circle               | ![](./icons/check-circle.svg)               | `./icons/check-circle.svg`               | `<IconCheckCircle class="icon" />`              |
| checkmark                  | ![](./icons/checkmark.svg)                  | `./icons/checkmark.svg`                  | `<IconCheckmark class="icon" />`                |
| checkout-settings          | ![](./icons/checkout-settings.svg)          | `./icons/checkout-settings.svg`          | `<IconCheckoutSettings class="icon" />`         |
| chevron-double-down        | ![](./icons/chevron-double-down.svg)        | `./icons/chevron-double-down.svg`        | `<IconChevronDoubleDown class="icon" />`        |
| chevron-double-left        | ![](./icons/chevron-double-left.svg)        | `./icons/chevron-double-left.svg`        | `<IconChevronDoubleLeft class="icon" />`        |
| chevron-double-right       | ![](./icons/chevron-double-right.svg)       | `./icons/chevron-double-right.svg`       | `<IconChevronDoubleRight class="icon" />`       |
| chevron-double-up          | ![](./icons/chevron-double-up.svg)          | `./icons/chevron-double-up.svg`          | `<IconChevronDoubleUp class="icon" />`          |
| chevron-down               | ![](./icons/chevron-down.svg)               | `./icons/chevron-down.svg`               | `<IconChevronDown class="icon" />`              |
| chevron-left               | ![](./icons/chevron-left.svg)               | `./icons/chevron-left.svg`               | `<IconChevronLeft class="icon" />`              |
| chevron-right              | ![](./icons/chevron-right.svg)              | `./icons/chevron-right.svg`              | `<IconChevronRight class="icon" />`             |
| chevron-up                 | ![](./icons/chevron-up.svg)                 | `./icons/chevron-up.svg`                 | `<IconChevronUp class="icon" />`                |
| chevron-up-down            | ![](./icons/chevron-up-down.svg)            | `./icons/chevron-up-down.svg`            | `<IconChevronUpDown class="icon" />`            |
| chevron-up-down-table      | ![](./icons/chevron-up-down-table.svg)      | `./icons/chevron-up-down-table.svg`      | `<IconChevronUpDownTable class="icon" />`       |
| circle-outline-strip       | ![](./icons/circle-outline-strip.svg)       | `./icons/circle-outline-strip.svg`       | `<IconCircleOutlineStrip class="icon" />`       |
| clock                      | ![](./icons/clock.svg)                      | `./icons/clock.svg`                      | `<IconClock class="icon" />`                    |
| close                      | ![](./icons/close.svg)                      | `./icons/close.svg`                      | `<IconClose class="icon" />`                    |
| cloud                      | ![](./icons/cloud.svg)                      | `./icons/cloud.svg`                      | `<IconCloud class="icon" />`                    |
| code                       | ![](./icons/code.svg)                       | `./icons/code.svg`                       | `<IconCode class="icon" />`                     |
| column-settings            | ![](./icons/column-settings.svg)            | `./icons/column-settings.svg`            | `<IconColumnSettings class="icon" />`           |
| coffee                     | ![](./icons/coffee.svg)                     | `./icons/coffee.svg`                     | `<IconCoffee class="icon" />`                   |
| connection-multi           | ![](./icons/connection-multi.svg)           | `./icons/connection-multi.svg`           | `<IconConnectionMulti class="icon" />`          |
| contact-badge              | ![](./icons/contact-badge.svg)              | `./icons/contact-badge.svg`              | `<IconContactBadge class="icon" />`             |
| contract                   | ![](./icons/contract.svg)                   | `./icons/contract.svg`                   | `<IconContract class="icon" />`                 |
| convert                    | ![](./icons/convert.svg)                    | `./icons/convert.svg`                    | `<IconConvert class="icon" />`                  |
| copy                       | ![](./icons/copy.svg)                       | `./icons/copy.svg`                       | `<IconCopy class="icon" />`                     |
| crown                      | ![](./icons/crown.svg)                      | `./icons/crown.svg`                      | `<IconCrown class="icon" />`                    |
| dashboard                  | ![](./icons/dashboard.svg)                  | `./icons/dashboard.svg`                  | `<IconDashboard class="icon" />`                |
| data-table                 | ![](./icons/data-table.svg)                 | `./icons/data-table.svg`                 | `<IconDataTable class="icon" />`                |
| device-desktop             | ![](./icons/device-desktop.svg)             | `./icons/device-desktop.svg`             | `<IconDeviceDesktop class="icon" />`            |
| device-mobile              | ![](./icons/device-mobile.svg)              | `./icons/device-mobile.svg`              | `<IconDeviceMobile class="icon" />`             |
| device-tablet              | ![](./icons/device-tablet.svg)              | `./icons/device-tablet.svg`              | `<IconDeviceTablet class="icon" />`             |
| discount                   | ![](./icons/discount.svg)                   | `./icons/discount.svg`                   | `<IconDiscount class="icon" />`                 |
| dollar-note                | ![](./icons/dollar-note.svg)                | `./icons/dollar-note.svg`                | `<IconDollarNote class="icon" />`               |
| download                   | ![](./icons/download.svg)                   | `./icons/download.svg`                   | `<IconDownload class="icon" />`                 |
| drag                       | ![](./icons/drag.svg)                       | `./icons/drag.svg`                       | `<IconDrag class="icon" />`                     |
| edit                       | ![](./icons/edit.svg)                       | `./icons/edit.svg`                       | `<IconEdit class="icon" />`                     |
| education                  | ![](./icons/education.svg)                  | `./icons/education.svg`                  | `<IconEducation class="icon" />`                |
| email                      | ![](./icons/email.svg)                      | `./icons/email.svg`                      | `<IconEmail class="icon" />`                    |
| error                      | ![](./icons/error.svg)                      | `./icons/error.svg`                      | `<IconError class="icon" />`                    |
| error-fill                 | ![](./icons/error-fill.svg)                 | `./icons/error-fill.svg`                 | `<IconErrorFill class="icon" />`                |
| expand                     | ![](./icons/expand.svg)                     | `./icons/expand.svg`                     | `<IconExpand class="icon" />`                   |
| external                   | ![](./icons/external.svg)                   | `./icons/external.svg`                   | `<IconExternal class="icon" />`                 |
| eye                        | ![](./icons/eye.svg)                        | `./icons/eye.svg`                        | `<IconEye class="icon" />`                      |
| eye-striked                | ![](./icons/eye-striked.svg)                | `./icons/eye-striked.svg`                | `<IconEyeStriked class="icon" />`               |
| file-csv                   | ![](./icons/file-csv.svg)                   | `./icons/file-csv.svg`                   | `<IconFileCsv class="icon" />`                  |
| file-pdf                   | ![](./icons/file-pdf.svg)                   | `./icons/file-pdf.svg`                   | `<IconFilePdf class="icon" />`                  |
| file-return-docs           | ![](./icons/file-return-docs.svg)           | `./icons/file-return-docs.svg`           | `<IconFileReturnDocs class="icon" />`           |
| file-text                  | ![](./icons/file-text.svg)                  | `./icons/file-text.svg`                  | `<IconFileText class="icon" />`                 |
| file-xls                   | ![](./icons/file-xls.svg)                   | `./icons/file-xls.svg`                   | `<IconFileXls class="icon" />`                  |
| filter                     | ![](./icons/filter.svg)                     | `./icons/filter.svg`                     | `<IconFilter class="icon" />`                   |
| flag                       | ![](./icons/flag.svg)                       | `./icons/flag.svg`                       | `<IconFlag class="icon" />`                     |
| folder                     | ![](./icons/folder.svg)                     | `./icons/folder.svg`                     | `<IconFolder class="icon" />`                   |
| folder-fill                | ![](./icons/folder-fill.svg)                | `./icons/folder-fill.svg`                | `<IconFolderFill class="icon" />`               |
| folder-open-fill           | ![](./icons/folder-open-fill.svg)           | `./icons/folder-open-fill.svg`           | `<IconFolderOpenFill class="icon" />`           |
| forbidden-return-documents | ![](./icons/forbidden-return-documents.svg) | `./icons/forbidden-return-documents.svg` | `<IconForbiddenReturnDocuments class="icon" />` |
| forward                    | ![](./icons/forward.svg)                    | `./icons/forward.svg`                    | `<IconForward class="icon" />`                  |
| gift                       | ![](./icons/gift.svg)                       | `./icons/gift.svg`                       | `<IconGift class="icon" />`                     |
| git-branch                 | ![](./icons/git-branch.svg)                 | `./icons/git-branch.svg`                 | `<IconGitBranch class="icon" />`                |
| git-commit                 | ![](./icons/git-commit.svg)                 | `./icons/git-commit.svg`                 | `<IconGitCommit class="icon" />`                |
| globe                      | ![](./icons/globe.svg)                      | `./icons/globe.svg`                      | `<IconGlobe class="icon" />`                    |
| globe-checkmark            | ![](./icons/globe-checkmark.svg)            | `./icons/globe-checkmark.svg`            | `<IconGlobeCheckmark class="icon" />`           |
| half                       | ![](./icons/half.svg)                       | `./icons/half.svg`                       | `<IconHalf class="icon" />`                     |
| headset                    | ![](./icons/headset.svg)                    | `./icons/headset.svg`                    | `<IconHeadset class="icon" />`                  |
| heart                      | ![](./icons/heart.svg)                      | `./icons/heart.svg`                      | `<IconHeart class="icon" />`                    |
| heart-fill                 | ![](./icons/heart-fill.svg)                 | `./icons/heart-fill.svg`                 | `<IconHeartFill class="icon" />`                |
| id                         | ![](./icons/id.svg)                         | `./icons/id.svg`                         | `<IconId class="icon" />`                       |
| image-single               | ![](./icons/image-single.svg)               | `./icons/image-single.svg`               | `<IconImageSingle class="icon" />`              |
| image-stacked              | ![](./icons/image-stacked.svg)              | `./icons/image-stacked.svg`              | `<IconImageStacked class="icon" />`             |
| import                     | ![](./icons/import.svg)                     | `./icons/import.svg`                     | `<IconImport class="icon" />`                   |
| info                       | ![](./icons/info.svg)                       | `./icons/info.svg`                       | `<IconInfo class="icon" />`                     |
| info-fill                  | ![](./icons/info-fill.svg)                  | `./icons/info-fill.svg`                  | `<IconInfoFill class="icon" />`                 |
| invoice                    | ![](./icons/invoice.svg)                    | `./icons/invoice.svg`                    | `<IconInvoice class="icon" />`                  |
| key                        | ![](./icons/key.svg)                        | `./icons/key.svg`                        | `<IconKey class="icon" />`                      |
| key-framed                 | ![](./icons/key-framed.svg)                 | `./icons/key-framed.svg`                 | `<IconKeyFramed class="icon" />`                |
| key-permissions            | ![](./icons/key-permissions.svg)            | `./icons/key-permissions.svg`            | `<IconKeyPermissions class="icon" />`           |
| layout                     | ![](./icons/layout.svg)                     | `./icons/layout.svg`                     | `<IconLayout class="icon" />`                   |
| link                       | ![](./icons/link.svg)                       | `./icons/link.svg`                       | `<IconLink class="icon" />`                     |
| link-disconnect            | ![](./icons/link-disconnect.svg)            | `./icons/link-disconnect.svg`            | `<IconLinkDisconnect class="icon" />`           |
| list-attributes            | ![](./icons/list-attributes.svg)            | `./icons/list-attributes.svg`            | `<IconListAttributes class="icon" />`           |
| list-view                  | ![](./icons/list-view.svg)                  | `./icons/list-view.svg`                  | `<IconListView class="icon" />`                 |
| loading                    | ![](./icons/loading.svg)                    | `./icons/loading.svg`                    | `<IconLoading class="icon" />`                  |
| location                   | ![](./icons/location.svg)                   | `./icons/location.svg`                   | `<IconLocation class="icon" />`                 |
| lock                       | ![](./icons/lock.svg)                       | `./icons/lock.svg`                       | `<IconLock class="icon" />`                     |
| lock-open                  | ![](./icons/lock-open.svg)                  | `./icons/lock-open.svg`                  | `<IconLockOpen class="icon" />`                 |
| logic                      | ![](./icons/logic.svg)                      | `./icons/logic.svg`                      | `<IconLogic class="icon" />`                    |
| logistics-box-trolley      | ![](./icons/logistics-box-trolley.svg)      | `./icons/logistics-box-trolley.svg`      | `<IconLogisticsBoxTrolley class="icon" />`      |
| logistics-boxes-crane      | ![](./icons/logistics-boxes-crane.svg)      | `./icons/logistics-boxes-crane.svg`      | `<IconLogisticsBoxesCrane class="icon" />`      |
| logo-scayle                | ![](./icons/logo-scayle.svg)                | `./icons/logo-scayle.svg`                | `<IconLogoScayle class="icon" />`               |
| logo-tradebyte             | ![](./icons/logo-tradebyte.svg)             | `./icons/logo-tradebyte.svg`             | `<IconLogoTradebyte class="icon" />`            |
| logo-tradebyte-green       | ![](./icons/logo-tradebyte-green.svg)       | `./icons/logo-tradebyte-green.svg`       | `<IconLogoTradebyteGreen class="icon" />`       |
| logo-tradebyte-grey        | ![](./icons/logo-tradebyte-grey.svg)        | `./icons/logo-tradebyte-grey.svg`        | `<IconLogoTradebyteGrey class="icon" />`        |
| loudspeaker                | ![](./icons/loudspeaker.svg)                | `./icons/loudspeaker.svg`                | `<IconLoudspeaker class="icon" />`              |
| loyalty                    | ![](./icons/loyalty.svg)                    | `./icons/loyalty.svg`                    | `<IconLoyalty class="icon" />`                  |
| luxury                     | ![](./icons/luxury.svg)                     | `./icons/luxury.svg`                     | `<IconLuxury class="icon" />`                   |
| magic-wand                 | ![](./icons/magic-wand.svg)                 | `./icons/magic-wand.svg`                 | `<IconMagicWand class="icon" />`                |
| mail-error                 | ![](./icons/mail-error.svg)                 | `./icons/mail-error.svg`                 | `<IconMailError class="icon" />`                |
| marketplace-aboutyou       | ![](./icons/marketplace-aboutyou.svg)       | `./icons/marketplace-aboutyou.svg`       | `<IconMarketplaceAboutyou class="icon" />`      |
| marketplaces               | ![](./icons/marketplaces.svg)               | `./icons/marketplaces.svg`               | `<IconMarketplaces class="icon" />`             |
| menu                       | ![](./icons/menu.svg)                       | `./icons/menu.svg`                       | `<IconMenu class="icon" />`                     |
| minus                      | ![](./icons/minus.svg)                      | `./icons/minus.svg`                      | `<IconMinus class="icon" />`                    |
| money                      | ![](./icons/money.svg)                      | `./icons/money.svg`                      | `<IconMoney class="icon" />`                    |
| more                       | ![](./icons/more.svg)                       | `./icons/more.svg`                       | `<IconMore class="icon" />`                     |
| more-horizontal            | ![](./icons/more-horizontal.svg)            | `./icons/more-horizontal.svg`            | `<IconMoreHorizontal class="icon" />`           |
| nested-list-view           | ![](./icons/nested-list-view.svg)           | `./icons/nested-list-view.svg`           | `<IconNestedListView class="icon" />`           |
| notes                      | ![](./icons/notes.svg)                      | `./icons/notes.svg`                      | `<IconNotes class="icon" />`                    |
| off                        | ![](./icons/off.svg)                        | `./icons/off.svg`                        | `<IconOff class="icon" />`                      |
| office                     | ![](./icons/office.svg)                     | `./icons/office.svg`                     | `<IconOffice class="icon" />`                   |
| order-e                    | ![](./icons/order-e.svg)                    | `./icons/order-e.svg`                    | `<IconOrderE class="icon" />`                   |
| ordered-list               | ![](./icons/ordered-list.svg)               | `./icons/ordered-list.svg`               | `<IconOrderedList class="icon" />`              |
| outfit                     | ![](./icons/outfit.svg)                     | `./icons/outfit.svg`                     | `<IconOutfit class="icon" />`                   |
| package                    | ![](./icons/package.svg)                    | `./icons/package.svg`                    | `<IconPackage class="icon" />`                  |
| page                       | ![](./icons/page.svg)                       | `./icons/page.svg`                       | `<IconPage class="icon" />`                     |
| pallet-boxes               | ![](./icons/pallet-boxes.svg)               | `./icons/pallet-boxes.svg`               | `<IconPalletBoxes class="icon" />`              |
| parcel                     | ![](./icons/parcel.svg)                     | `./icons/parcel.svg`                     | `<IconParcel class="icon" />`                   |
| parcel-down                | ![](./icons/parcel-down.svg)                | `./icons/parcel-down.svg`                | `<IconParcelDown class="icon" />`               |
| parcel-search              | ![](./icons/parcel-search.svg)              | `./icons/parcel-search.svg`              | `<IconParcelSearch class="icon" />`             |
| paste                      | ![](./icons/paste.svg)                      | `./icons/paste.svg`                      | `<IconPaste class="icon" />`                    |
| pay                        | ![](./icons/pay.svg)                        | `./icons/pay.svg`                        | `<IconPay class="icon" />`                      |
| payments                   | ![](./icons/payments.svg)                   | `./icons/payments.svg`                   | `<IconPayments class="icon" />`                 |
| percentage                 | ![](./icons/percentage.svg)                 | `./icons/percentage.svg`                 | `<IconPercentage class="icon" />`               |
| percentage-circle          | ![](./icons/percentage-circle.svg)          | `./icons/percentage-circle.svg`          | `<IconPercentageCircle class="icon" />`         |
| phone                      | ![](./icons/phone.svg)                      | `./icons/phone.svg`                      | `<IconPhone class="icon" />`                    |
| placeholder                | ![](./icons/placeholder.svg)                | `./icons/placeholder.svg`                | `<IconPlaceholder class="icon" />`              |
| player-pause               | ![](./icons/player-pause.svg)               | `./icons/player-pause.svg`               | `<IconPlayerPause class="icon" />`              |
| player-play                | ![](./icons/player-play.svg)                | `./icons/player-play.svg`                | `<IconPlayerPlay class="icon" />`               |
| polaroid                   | ![](./icons/polaroid.svg)                   | `./icons/polaroid.svg`                   | `<IconPolaroid class="icon" />`                 |
| product-ai                 | ![](./icons/product-ai.svg)                 | `./icons/product-ai.svg`                 | `<IconProductAi class="icon" />`                |
| product-import             | ![](./icons/product-import.svg)             | `./icons/product-import.svg`             | `<IconProductImport class="icon" />`            |
| question                   | ![](./icons/question.svg)                   | `./icons/question.svg`                   | `<IconQuestion class="icon" />`                 |
| question-fill              | ![](./icons/question-fill.svg)              | `./icons/question-fill.svg`              | `<IconQuestionFill class="icon" />`             |
| question-filled            | ![](./icons/question-filled.svg)            | `./icons/question-filled.svg`            | `<IconQuestionFilled class="icon" />`           |
| refresh                    | ![](./icons/refresh.svg)                    | `./icons/refresh.svg`                    | `<IconRefresh class="icon" />`                  |
| restore                    | ![](./icons/restore.svg)                    | `./icons/restore.svg`                    | `<IconRestore class="icon" />`                  |
| revert                     | ![](./icons/revert.svg)                     | `./icons/revert.svg`                     | `<IconRevert class="icon" />`                   |
| rule-engine                | ![](./icons/rule-engine.svg)                | `./icons/rule-engine.svg`                | `<IconRuleEngine class="icon" />`               |
| save                       | ![](./icons/save.svg)                       | `./icons/save.svg`                       | `<IconSave class="icon" />`                     |
| scan                       | ![](./icons/scan.svg)                       | `./icons/scan.svg`                       | `<IconScan class="icon" />`                     |
| search                     | ![](./icons/search.svg)                     | `./icons/search.svg`                     | `<IconSearch class="icon" />`                   |
| send                       | ![](./icons/send.svg)                       | `./icons/send.svg`                       | `<IconSend class="icon" />`                     |
| seo                        | ![](./icons/seo.svg)                        | `./icons/seo.svg`                        | `<IconSeo class="icon" />`                      |
| separate                   | ![](./icons/separate.svg)                   | `./icons/separate.svg`                   | `<IconSeparate class="icon" />`                 |
| server                     | ![](./icons/server.svg)                     | `./icons/server.svg`                     | `<IconServer class="icon" />`                   |
| settings                   | ![](./icons/settings.svg)                   | `./icons/settings.svg`                   | `<IconSettings class="icon" />`                 |
| settings-wheel             | ![](./icons/settings-wheel.svg)             | `./icons/settings-wheel.svg`             | `<IconSettingsWheel class="icon" />`            |
| share                      | ![](./icons/share.svg)                      | `./icons/share.svg`                      | `<IconShare class="icon" />`                    |
| shirt                      | ![](./icons/shirt.svg)                      | `./icons/shirt.svg`                      | `<IconShirt class="icon" />`                    |
| shirt-download             | ![](./icons/shirt-download.svg)             | `./icons/shirt-download.svg`             | `<IconShirtDownload class="icon" />`            |
| shirt-new                  | ![](./icons/shirt-new.svg)                  | `./icons/shirt-new.svg`                  | `<IconShirtNew class="icon" />`                 |
| shirt-success              | ![](./icons/shirt-success.svg)              | `./icons/shirt-success.svg`              | `<IconShirtSuccess class="icon" />`             |
| shop                       | ![](./icons/shop.svg)                       | `./icons/shop.svg`                       | `<IconShop class="icon" />`                     |
| shrink                     | ![](./icons/shrink.svg)                     | `./icons/shrink.svg`                     | `<IconShrink class="icon" />`                   |
| smiley-average             | ![](./icons/smiley-average.svg)             | `./icons/smiley-average.svg`             | `<IconSmileyAverage class="icon" />`            |
| smiley-bad                 | ![](./icons/smiley-bad.svg)                 | `./icons/smiley-bad.svg`                 | `<IconSmileyBad class="icon" />`                |
| smiley-good                | ![](./icons/smiley-good.svg)                | `./icons/smiley-good.svg`                | `<IconSmileyGood class="icon" />`               |
| sort-ascending             | ![](./icons/sort-ascending.svg)             | `./icons/sort-ascending.svg`             | `<IconSortAscending class="icon" />`            |
| sort-bottom-to-top         | ![](./icons/sort-bottom-to-top.svg)         | `./icons/sort-bottom-to-top.svg`         | `<IconSortBottomToTop class="icon" />`          |
| sort-descending            | ![](./icons/sort-descending.svg)            | `./icons/sort-descending.svg`            | `<IconSortDescending class="icon" />`           |
| sort-top-to-bottom         | ![](./icons/sort-top-to-bottom.svg)         | `./icons/sort-top-to-bottom.svg`         | `<IconSortTopToBottom class="icon" />`          |
| sparkle                    | ![](./icons/sparkle.svg)                    | `./icons/sparkle.svg`                    | `<IconSparkle class="icon" />`                  |
| sparkle-fill               | ![](./icons/sparkle-fill.svg)               | `./icons/sparkle-fill.svg`               | `<IconSparkleFill class="icon" />`              |
| spelling-mistake           | ![](./icons/spelling-mistake.svg)           | `./icons/spelling-mistake.svg`           | `<IconSpellingMistake class="icon" />`          |
| stack                      | ![](./icons/stack.svg)                      | `./icons/stack.svg`                      | `<IconStack class="icon" />`                    |
| star                       | ![](./icons/star.svg)                       | `./icons/star.svg`                       | `<IconStar class="icon" />`                     |
| star-fill                  | ![](./icons/star-fill.svg)                  | `./icons/star-fill.svg`                  | `<IconStarFill class="icon" />`                 |
| stopwatch                  | ![](./icons/stopwatch.svg)                  | `./icons/stopwatch.svg`                  | `<IconStopwatch class="icon" />`                |
| store                      | ![](./icons/store.svg)                      | `./icons/store.svg`                      | `<IconStore class="icon" />`                    |
| store-location             | ![](./icons/store-location.svg)             | `./icons/store-location.svg`             | `<IconStoreLocation class="icon" />`            |
| structure                  | ![](./icons/structure.svg)                  | `./icons/structure.svg`                  | `<IconStructure class="icon" />`                |
| structure-horizontal       | ![](./icons/structure-horizontal.svg)       | `./icons/structure-horizontal.svg`       | `<IconStructureHorizontal class="icon" />`      |
| structure-vertical         | ![](./icons/structure-vertical.svg)         | `./icons/structure-vertical.svg`         | `<IconStructureVertical class="icon" />`        |
| style                      | ![](./icons/style.svg)                      | `./icons/style.svg`                      | `<IconStyle class="icon" />`                    |
| success                    | ![](./icons/success.svg)                    | `./icons/success.svg`                    | `<IconSuccess class="icon" />`                  |
| success-fill               | ![](./icons/success-fill.svg)               | `./icons/success-fill.svg`               | `<IconSuccessFill class="icon" />`              |
| sust-cotton                | ![](./icons/sust-cotton.svg)                | `./icons/sust-cotton.svg`                | `<IconSustCotton class="icon" />`               |
| swap-horizontal            | ![](./icons/swap-horizontal.svg)            | `./icons/swap-horizontal.svg`            | `<IconSwapHorizontal class="icon" />`           |
| swap-vertical              | ![](./icons/swap-vertical.svg)              | `./icons/swap-vertical.svg`              | `<IconSwapVertical class="icon" />`             |
| tablet                     | ![](./icons/tablet.svg)                     | `./icons/tablet.svg`                     | `<IconTablet class="icon" />`                   |
| tag                        | ![](./icons/tag.svg)                        | `./icons/tag.svg`                        | `<IconTag class="icon" />`                      |
| target                     | ![](./icons/target.svg)                     | `./icons/target.svg`                     | `<IconTarget class="icon" />`                   |
| task                       | ![](./icons/task.svg)                       | `./icons/task.svg`                       | `<IconTask class="icon" />`                     |
| tax                        | ![](./icons/tax.svg)                        | `./icons/tax.svg`                        | `<IconTax class="icon" />`                      |
| technology                 | ![](./icons/technology.svg)                 | `./icons/technology.svg`                 | `<IconTechnology class="icon" />`               |
| text                       | ![](./icons/text.svg)                       | `./icons/text.svg`                       | `<IconText class="icon" />`                     |
| text-bold                  | ![](./icons/text-bold.svg)                  | `./icons/text-bold.svg`                  | `<IconTextBold class="icon" />`                 |
| text-center                | ![](./icons/text-center.svg)                | `./icons/text-center.svg`                | `<IconTextCenter class="icon" />`               |
| text-italic                | ![](./icons/text-italic.svg)                | `./icons/text-italic.svg`                | `<IconTextItalic class="icon" />`               |
| text-justify               | ![](./icons/text-justify.svg)               | `./icons/text-justify.svg`               | `<IconTextJustify class="icon" />`              |
| text-left                  | ![](./icons/text-left.svg)                  | `./icons/text-left.svg`                  | `<IconTextLeft class="icon" />`                 |
| text-paragraph             | ![](./icons/text-paragraph.svg)             | `./icons/text-paragraph.svg`             | `<IconTextParagraph class="icon" />`            |
| text-right                 | ![](./icons/text-right.svg)                 | `./icons/text-right.svg`                 | `<IconTextRight class="icon" />`                |
| text-underline             | ![](./icons/text-underline.svg)             | `./icons/text-underline.svg`             | `<IconTextUnderline class="icon" />`            |
| tile-view                  | ![](./icons/tile-view.svg)                  | `./icons/tile-view.svg`                  | `<IconTileView class="icon" />`                 |
| translate                  | ![](./icons/translate.svg)                  | `./icons/translate.svg`                  | `<IconTranslate class="icon" />`                |
| trash                      | ![](./icons/trash.svg)                      | `./icons/trash.svg`                      | `<IconTrash class="icon" />`                    |
| trend-down                 | ![](./icons/trend-down.svg)                 | `./icons/trend-down.svg`                 | `<IconTrendDown class="icon" />`                |
| trend-up                   | ![](./icons/trend-up.svg)                   | `./icons/trend-up.svg`                   | `<IconTrendUp class="icon" />`                  |
| triangle-down              | ![](./icons/triangle-down.svg)              | `./icons/triangle-down.svg`              | `<IconTriangleDown class="icon" />`             |
| triangle-left              | ![](./icons/triangle-left.svg)              | `./icons/triangle-left.svg`              | `<IconTriangleLeft class="icon" />`             |
| triangle-right             | ![](./icons/triangle-right.svg)             | `./icons/triangle-right.svg`             | `<IconTriangleRight class="icon" />`            |
| triangle-up                | ![](./icons/triangle-up.svg)                | `./icons/triangle-up.svg`                | `<IconTriangleUp class="icon" />`               |
| truck                      | ![](./icons/truck.svg)                      | `./icons/truck.svg`                      | `<IconTruck class="icon" />`                    |
| two-fa-restore             | ![](./icons/two-fa-restore.svg)             | `./icons/two-fa-restore.svg`             | `<IconTwoFaRestore class="icon" />`             |
| ufo                        | ![](./icons/ufo.svg)                        | `./icons/ufo.svg`                        | `<IconUfo class="icon" />`                      |
| undo                       | ![](./icons/undo.svg)                       | `./icons/undo.svg`                       | `<IconUndo class="icon" />`                     |
| user                       | ![](./icons/user.svg)                       | `./icons/user.svg`                       | `<IconUser class="icon" />`                     |
| user-add                   | ![](./icons/user-add.svg)                   | `./icons/user-add.svg`                   | `<IconUserAdd class="icon" />`                  |
| user-edit                  | ![](./icons/user-edit.svg)                  | `./icons/user-edit.svg`                  | `<IconUserEdit class="icon" />`                 |
| user-key                   | ![](./icons/user-key.svg)                   | `./icons/user-key.svg`                   | `<IconUserKey class="icon" />`                  |
| user-merchant              | ![](./icons/user-merchant.svg)              | `./icons/user-merchant.svg`              | `<IconUserMerchant class="icon" />`             |
| user-permissions           | ![](./icons/user-permissions.svg)           | `./icons/user-permissions.svg`           | `<IconUserPermissions class="icon" />`          |
| user-remove                | ![](./icons/user-remove.svg)                | `./icons/user-remove.svg`                | `<IconUserRemove class="icon" />`               |
| users                      | ![](./icons/users.svg)                      | `./icons/users.svg`                      | `<IconUsers class="icon" />`                    |
| users-exchange             | ![](./icons/users-exchange.svg)             | `./icons/users-exchange.svg`             | `<IconUsersExchange class="icon" />`            |
| voucher                    | ![](./icons/voucher.svg)                    | `./icons/voucher.svg`                    | `<IconVoucher class="icon" />`                  |
| warehouse                  | ![](./icons/warehouse.svg)                  | `./icons/warehouse.svg`                  | `<IconWarehouse class="icon" />`                |
| warning                    | ![](./icons/warning.svg)                    | `./icons/warning.svg`                    | `<IconWarning class="icon" />`                  |
| warning-circle             | ![](./icons/warning-circle.svg)             | `./icons/warning-circle.svg`             | `<IconWarningCircle class="icon" />`            |
| warning-circle-fill        | ![](./icons/warning-circle-fill.svg)        | `./icons/warning-circle-fill.svg`        | `<IconWarningCircleFill class="icon" />`        |
| warning-fill               | ![](./icons/warning-fill.svg)               | `./icons/warning-fill.svg`               | `<IconWarningFill class="icon" />`              |
| webhook                    | ![](./icons/webhook.svg)                    | `./icons/webhook.svg`                    | `<IconWebhook class="icon" />`                  |

## Other channels

- [LinkedIn](https://www.linkedin.com/company/scaylecommerce/)
- [Jobs](https://www.scayle.com/company/career/)
- [SCAYLE](https://scayle.com)

## License
Licensed under the [MIT](https://opensource.org/license/mit/)
