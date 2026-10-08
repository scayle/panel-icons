const fs = require('fs');
const path = require('path');
const { compile, parse, NodeTypes, ElementTypes } = require('@vue/compiler-dom');

const FILE_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ALLOWED_ELEMENTS = [
    'svg', 'g', 'path', 'circle', 'rect', 'ellipse', 'line', 'polyline', 'polygon',
    'defs', 'use', 'clipPath', 'mask', 'linearGradient', 'radialGradient', 'stop',
];
const ALLOWED_ATTRIBUTES = [
    'xmlns', 'xmlns:xlink', 'xml:space', 'viewBox', 'width', 'height', 'id', 'class',
    'd', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'points', 'transform', 'offset',
    'fill', 'fill-rule', 'fill-opacity', 'clip-rule', 'clip-path', 'mask', 'filter', 'opacity',
    'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit',
    'stroke-dasharray', 'stroke-dashoffset', 'stroke-opacity', 'stop-color', 'stop-opacity',
    'gradientUnits', 'gradientTransform', 'clipPathUnits', 'maskUnits', 'href', 'xlink:href',
];
const VUE_IMPORT = /^import \{ ([^}]+) \} from "vue"$/m;
const RENDER_EXPORT = 'export function render(';

function toComponentName(fileBaseName) {
    return (
        'Icon' +
        fileBaseName
            .split('-')
            .map(x => x.charAt(0).toUpperCase() + x.substring(1))
            .join('')
    );
}

// The SVG is compiled as a Vue template, so only plain SVG drawing markup is
// let through: anything else could become a component, a script or HTML in the
// consumer's page once the package is published.
function assertStaticSvg(file, node) {
    if (node.type === NodeTypes.COMMENT) {
        return;
    }

    if (node.type === NodeTypes.TEXT) {
        if (node.content.trim() !== '') {
            throw new Error(`${file}: text content is not allowed`);
        }

        return;
    }

    if (node.type !== NodeTypes.ELEMENT || node.tagType !== ElementTypes.ELEMENT || !ALLOWED_ELEMENTS.includes(node.tag)) {
        throw new Error(`${file}: <${node.tag ?? 'non-element'}> is not allowed`);
    }

    for (const prop of node.props) {
        const value = prop.value?.content ?? '';

        if (prop.type !== NodeTypes.ATTRIBUTE || !ALLOWED_ATTRIBUTES.includes(prop.name)) {
            throw new Error(`${file}: attribute "${prop.rawName ?? prop.name}" is not allowed`);
        }

        if (/href$/.test(prop.name) && !value.startsWith('#')) {
            throw new Error(`${file}: only local "#" references are allowed in "${prop.name}"`);
        }

        if (/url\(/i.test(value) && !/^url\(#[\w-]+\)$/.test(value)) {
            throw new Error(`${file}: only local url(#id) references are allowed in "${prop.name}"`);
        }
    }

    node.children.forEach(child => assertStaticSvg(file, child));
}

function compileIcon(file, svg) {
    if (!svg.startsWith('<svg ')) {
        throw new Error(`${file}: expected the file to start with "<svg "`);
    }

    const roots = parse(svg).children.filter(node => node.type !== NodeTypes.TEXT || node.content.trim() !== '');

    if (roots.length !== 1 || roots[0].tag !== 'svg') {
        throw new Error(`${file}: expected a single <svg> root element`);
    }

    assertStaticSvg(file, roots[0]);

    const source = svg.replace(/^<svg /, '<svg aria-hidden="true" ');
    const { code } = compile(source, {
        mode: 'module',
        // Hoisting turns larger static trees into createStaticVNode, which Vue inserts with innerHTML.
        hoistStatic: false,
        comments: false,
        onError: error => {
            throw new Error(`${file}: ${error.message}`);
        },
    });

    if (!VUE_IMPORT.test(code) || !code.includes(RENDER_EXPORT)) {
        throw new Error(`${file}: unexpected compiler output`);
    }

    return code.replace(RENDER_EXPORT, 'function render(');
}

function toCommonJs(code) {
    return code.replace(VUE_IMPORT, (match, specifiers) => {
        return `const { ${specifiers.replace(/ as /g, ': ')} } = require("vue")`;
    });
}

function writeJson(file, value) {
    fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

function buildVue({ iconsDir, outDir }) {
    const icons = fs
        .readdirSync(iconsDir)
        .filter(file => file.endsWith('.svg'))
        .sort()
        .map(file => {
            const name = path.basename(file, '.svg');

            if (!FILE_NAME.test(name)) {
                throw new Error(`${file}: file name must be lowercase kebab-case`);
            }

            return {
                name,
                componentName: toComponentName(name),
                code: compileIcon(file, fs.readFileSync(path.join(iconsDir, file), 'utf8')),
            };
        });

    const seen = new Map();

    for (const icon of icons) {
        const key = icon.componentName.toLowerCase();

        if (seen.has(key)) {
            throw new Error(`${icon.name}.svg: component name ${icon.componentName} collides with ${seen.get(key)}.svg`);
        }

        seen.set(key, icon.name);
    }

    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(path.join(outDir, 'esm'), { recursive: true });

    writeJson(path.join(outDir, 'package.json'), {
        main: './index.cjs',
        module: './esm/index.js',
        types: './index.d.ts',
        sideEffects: false,
    });
    writeJson(path.join(outDir, 'esm', 'package.json'), { type: 'module' });

    const panelIconsEntries = icons.map(icon => `    ${JSON.stringify(icon.name)}: ${icon.componentName},`).join('\n');
    const esmIndex = [];
    const cjsIndex = ["'use strict';", ''];

    for (const icon of icons) {
        fs.writeFileSync(
            path.join(outDir, 'esm', `${icon.componentName}.js`),
            `${icon.code}\nexport default { name: '${icon.componentName}', render }\n`,
        );

        esmIndex.push(`export { default as ${icon.componentName} } from './${icon.componentName}.js';`);
        cjsIndex.push(
            `const ${icon.componentName} = (() => {\n${toCommonJs(icon.code)}\nreturn { name: '${icon.componentName}', render };\n})();\n`,
        );
    }

    esmIndex.push('');
    esmIndex.push(...icons.map(icon => `import ${icon.componentName} from './${icon.componentName}.js';`));
    esmIndex.push('', `export const panelIcons = {\n${panelIconsEntries}\n};`, '');

    cjsIndex.push(
        'module.exports = {',
        ...icons.map(icon => `    ${icon.componentName},`),
        `    panelIcons: {\n${panelIconsEntries.replace(/^/gm, '    ')}\n    },`,
        '};',
        '',
    );

    fs.writeFileSync(path.join(outDir, 'esm', 'index.js'), esmIndex.join('\n'));
    fs.writeFileSync(path.join(outDir, 'index.cjs'), cjsIndex.join('\n'));
    const declarations = [
        "import type { DefineComponent, SVGAttributes } from 'vue';",
        '',
        'export type PanelIconComponent = DefineComponent<SVGAttributes>;',
        '',
        ...icons.map(icon => `export declare const ${icon.componentName}: PanelIconComponent;`),
        '',
        'export type PanelIconName =',
        ...icons.map(icon => `    | ${JSON.stringify(icon.name)}`),
        '    ;',
        '',
        'export declare const panelIcons: Record<PanelIconName, PanelIconComponent>;',
        '',
    ];

    fs.writeFileSync(path.join(outDir, 'index.d.ts'), declarations.join('\n'));
    fs.writeFileSync(path.join(outDir, 'esm', 'index.d.ts'), "export * from '../index.js';\n");

    return icons.length;
}

if (require.main === module) {
    const root = path.join(__dirname, '..');
    const count = buildVue({ iconsDir: path.join(root, 'icons'), outDir: path.join(root, 'vue') });

    // stderr, so `npm pack --json` keeps clean JSON on stdout
    console.error(`Built ${count} Vue icon components`);
}

module.exports = { toComponentName, buildVue };
