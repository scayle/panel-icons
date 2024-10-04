const fs = require('fs');
const path = require('path');

const iconFolder = path.join(__dirname, 'icons');

// Generate a Markdown table of the icons
console.log('|Name|Icon|Filename|Vue|');
console.log('|---|---|---|---|');

fs.readdirSync(iconFolder).forEach(function(file) {

    const componentName =
        'Icon' +
        file
            .split('-')
            .map(x => x.charAt(0).toUpperCase() + x.substring(1))
            .join('');

    console.log(`|${file}|![](./img/${file})|\`./img/${file}\`|\`<${componentName} class="icon" />\`|`);
});
