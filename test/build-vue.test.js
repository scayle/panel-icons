const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { pathToFileURL } = require('url');

const { toComponentName, buildVue } = require('../scripts/build-vue.js');

const iconsDir = path.join(__dirname, '..', 'icons');
const outDir = path.join(__dirname, '..', 'vue');
const iconNames = fs.readdirSync(iconsDir).map(file => path.basename(file, '.svg'));

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

function buildFixture(files) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'panel-icons-'));

    fs.mkdirSync(path.join(dir, 'icons'));

    for (const [file, svg] of Object.entries(files)) {
        fs.writeFileSync(path.join(dir, 'icons', file), svg);
    }

    try {
        return buildVue({ iconsDir: path.join(dir, 'icons'), outDir: path.join(dir, 'vue') });
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

const SAFE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M0 0h24v24H0z"/></svg>';

async function render(component, props) {
    const { createSSRApp, h } = require('vue');
    const { renderToString } = require('vue/server-renderer');

    return renderToString(createSSRApp({ render: () => h(component, props) }));
}

before(() => {
    buildVue({ iconsDir, outDir });
});

test('toComponentName follows the Icon + PascalCase rule', () => {
    assert.equal(toComponentName('add'), 'IconAdd');
    assert.equal(toComponentName('arrow-circle-left'), 'IconArrowCircleLeft');
    assert.equal(toComponentName('logo-tradebyte-green'), 'IconLogoTradebyteGreen');
    assert.equal(toComponentName('two-fa-restore'), 'IconTwoFaRestore');
});

test('all icon names are unique and valid identifiers', () => {
    const componentNames = iconNames.map(toComponentName);

    for (const name of componentNames) {
        assert.match(name, /^Icon[A-Za-z0-9]+$/);
    }

    assert.equal(iconNames.length, 277);
    assert.equal(new Set(componentNames).size, iconNames.length);
});

test('writes the nested package.json files', () => {
    assert.deepEqual(readJson(path.join(outDir, 'package.json')), {
        main: './index.cjs',
        module: './esm/index.js',
        types: './index.d.ts',
        sideEffects: false,
    });
    assert.deepEqual(readJson(path.join(outDir, 'esm', 'package.json')), { type: 'module' });
});

test('writes one ESM file per icon', () => {
    const esmFiles = fs.readdirSync(path.join(outDir, 'esm'));
    const expected = iconNames.map(name => `${toComponentName(name)}.js`).concat('index.js', 'index.d.ts', 'package.json');

    assert.deepEqual(esmFiles.sort(), expected.sort());
    assert.equal(esmFiles.filter(file => file.startsWith('Icon')).length, 277);
});

test('ESM icon file has no runtime template', () => {
    const source = fs.readFileSync(path.join(outDir, 'esm', 'IconAdd.js'), 'utf8');

    assert.ok(source.includes('from "vue"'));
    assert.ok(source.includes('export default'));
    assert.ok(!source.includes('template'));
    assert.ok(!source.includes('innerHTML'));
});

test('CommonJS entry exports every icon and panelIcons', () => {
    const icons = require('../vue');

    for (const name of iconNames) {
        assert.ok(icons[toComponentName(name)], `missing ${toComponentName(name)}`);
    }

    assert.deepEqual(Object.keys(icons.panelIcons).sort(), [...iconNames].sort());
    assert.equal(icons.panelIcons.add, icons.IconAdd);
    assert.equal(icons.panelIcons['arrow-circle-left'], icons.IconArrowCircleLeft);
    assert.equal(icons.IconAdd.name, 'IconAdd');
    assert.equal(typeof icons.IconAdd.render, 'function');
});

test('ESM entry matches CommonJS', async () => {
    const esm = await import(pathToFileURL(path.join(outDir, 'esm', 'index.js')).href);
    const cjs = require('../vue');

    assert.deepEqual(Object.keys(esm).sort(), Object.keys(cjs).sort());
    assert.equal(Object.keys(esm.panelIcons).length, 277);
});

test('renders an svg with fallthrough attributes', async () => {
    const { IconAdd } = require('../vue');
    const html = await render(IconAdd, { class: 'icon' });
    const rootTag = html.slice(0, html.indexOf('>'));

    assert.ok(html.startsWith('<svg'));
    assert.ok(rootTag.includes('aria-hidden="true"'));
    assert.ok(rootTag.includes('viewBox="0 0 24 24"'));
    assert.ok(rootTag.includes('class="icon"'));
    assert.ok(html.includes('fill="currentColor"'));
    assert.ok(!rootTag.includes('width='));
});

test('aria-hidden can be overridden', async () => {
    const { IconAdd } = require('../vue');
    const html = await render(IconAdd, { 'aria-hidden': 'false', role: 'img' });

    assert.ok(html.includes('aria-hidden="false"'));
    assert.ok(html.includes('role="img"'));
});

test('every icon renders', async () => {
    const { panelIcons } = require('../vue');

    for (const [name, component] of Object.entries(panelIcons)) {
        const html = await render(component);

        assert.ok(html.startsWith('<svg'), `${name} did not render an svg`);
    }
});

test('no generated file uses static vnodes inserted through innerHTML', () => {
    const files = fs.readdirSync(path.join(outDir, 'esm')).map(file => path.join(outDir, 'esm', file));

    for (const file of [...files, path.join(outDir, 'index.cjs')]) {
        assert.ok(!fs.readFileSync(file, 'utf8').includes('createStaticVNode'), `${file} uses createStaticVNode`);
    }
});

test('native ESM path ships types', () => {
    assert.equal(fs.readFileSync(path.join(outDir, 'esm', 'index.d.ts'), 'utf8'), "export * from '../index.js';\n");
});

test('builds a safe svg', () => {
    assert.equal(buildFixture({ 'safe-icon.svg': SAFE_SVG }), 1);
});

test('rejects markup the compiler cannot turn into a plain svg', () => {
    const broken = {
        noSvgStart: '<?xml version="1.0"?><svg viewBox="0 0 24 24"><path d="M0 0"/></svg>',
        styleTag: '<svg viewBox="0 0 24 24"><style>.a{}</style><path d="M0 0"/></svg>',
        unclosed: '<svg viewBox="0 0 24 24"><g><path d="M0 0"/></svg>',
    };

    for (const [name, svg] of Object.entries(broken)) {
        assert.throws(() => buildFixture({ 'bad.svg': svg }), /bad\.svg/, `${name} was not rejected`);
    }
});

test('rejects file names that collide after conversion', () => {
    assert.throws(() => buildFixture({ 'a-b1.svg': SAFE_SVG, 'a-b-1.svg': SAFE_SVG }), /collides/);
    assert.throws(() => buildFixture({ 'ab-c.svg': SAFE_SVG, 'a-bc.svg': SAFE_SVG }), /collides/);
});

test('rejects file names that are not lowercase kebab-case', () => {
    for (const file of ["x',evil:1,'y.svg", 'Upper.svg', 'double--dash.svg', 'space name.svg']) {
        assert.throws(() => buildFixture({ [file]: SAFE_SVG }), /file name/, `${file} was not rejected`);
    }
});
