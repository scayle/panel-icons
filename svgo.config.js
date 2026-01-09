// Icons which should be mirrored in RTL mode
// https://rtlstyling.com/posts/rtl-styling#bidirectional-icons
const mirroredIcons = [
    'activity',
    'arrow-bottom-right',
    'arrow-circle-left',
    'arrow-circle-right',
    'arrow-left-double',
    'arrow-left',
    'arrow-right-double',
    'arrow-right',
    'arrow-bars',
    'calendar-in',
    'calendar-out',
    'chat-bubbles',
    'copy',
    'external',
    'file-return-docs',
    'flag',
    'forbidden-return-documents',
    'forward',
    'logic',
    'logistics-1',
    'logistics-2',
    'loudspeaker',
    'nested-list-view',
    'notes',
    'page',
    'paste',
    'product-import',
    'separate',
    'share',
    'text-left',
    'text-right',
    'translate',
    'triangle-left',
    'triangle-right',
    'truck',
    'undo',
    'users',
];

module.exports = {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    inlineStyles: {
                        onlyMatchedOnce: false,
                    },
                    convertColors: {
                        currentColor: true,
                    },
                    removeViewBox: false,
                    removeTitle: true,
                },
            },
        },
        'removeDimensions',
        {
            name: 'mirrorIcons',
            type: 'visitor',
            fn: (ast, params, info) => {
                const parts = info.path.split('/');
                const iconName = parts[parts.length - 1].split('.')[0].substring(3);

                if (!mirroredIcons.includes(iconName)) {
                    return null;
                }

                return {
                    element: {
                        enter: (node, parentNode) => {
                            if (node.name === 'svg' && parentNode.type === 'root') {
                                const classList = node.attributes.class == null ? [] : node.attributes.class.split(' ');

                                classList.push('icon-mirror');

                                node.attributes.class = classList.join(' ');
                            }
                        },
                    },
                };
            },
        },
    ],
};
