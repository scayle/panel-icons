import { h, type Component } from 'vue';
import { IconAdd, IconArrowCircleLeft, panelIcons, type PanelIconName } from '../../vue';
import { IconTruck } from '../../vue/esm/index.js';

h(IconAdd, { class: 'icon' });
h(IconArrowCircleLeft);
h(IconTruck);

const truck: Component = panelIcons.truck;
const name: PanelIconName = 'arrow-circle-left';

// @ts-expect-error not an icon file name
const unknownName: PanelIconName = 'not-an-icon';

export { truck, name, unknownName };
