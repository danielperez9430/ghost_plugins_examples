# Ghost Card Plugin Examples

Example plugins for the [Ghost Card Plugin System](https://github.com/danielperez9430/Ghost) — install custom editor cards via ZIP upload.

## Plugins

### 1. Review Card
A product/app review card with score, pros/cons, and color-coded rating bars.

**Fields**: Score, Score Label, Title, Subtitle, Pros (textarea), Cons (textarea), Ratings (`Label=Score` per line)

**Preprocess**: Converts pros/cons strings to arrays and parses `Label=Score` into structured rating objects.

### 2. Info Box
A highlighted information box with type-based styling.

**Fields**: Type (info/warning/success/danger), Title, Message

## Plugin Structure

```
my-plugin/
├── plugin.json      # Card definition (name, version, fields, preprocess)
├── template.html    # Handlebars template for rendering
├── card.css         # Styles (scoped under .plugin-{name} automatically)
└── preprocess.js    # (optional) Data transformation before rendering
```

### plugin.json

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "label": "My Plugin",
  "description": "What my plugin does",
  "icon": "<svg viewBox='0 0 24 24'>...</svg>",
  "cards": [
    {
      "name": "my-card",
      "label": "My Card",
      "preprocess": "preprocess.js",
      "fields": [
        { "key": "title", "type": "text", "title": "Title" },
        { "key": "body", "type": "textarea", "title": "Body" }
      ]
    }
  ]
}
```

### Template Syntax

| Syntax | Description |
|--------|-------------|
| `{{var}}` | Simple interpolation |
| `{{nested.key}}` | Dot-path access |
| `{{#if var}}...{{else}}...{{/if}}` | Conditional |
| `{{#unless var}}...{{/unless}}` | Inverted conditional |
| `{{#each list}}...{{/each}}` | Loop (strings auto-split by newline) |
| `{{this}}` | Current item in `#each` |

### Preprocess (optional)

A `preprocess(payload)` function that transforms raw form data before rendering:

```javascript
function preprocess(payload) {
    var data = {};
    Object.keys(payload).forEach(function(k) { data[k] = payload[k]; });

    if (typeof data.tags === 'string') {
        data.tags = data.tags.split('\n').filter(function(l) { return l.trim(); });
    }
    return data;
}
```

**Security**: Runs in a sandbox with only: `JSON`, `Math`, `String`, `Number`, `Boolean`, `Object`, `Array`, `Date`, `parseInt`, `parseFloat`, `isNaN`, `isFinite`. No DOM, no network, no storage.

## Install

1. Go to Ghost Admin → Settings → Labs → **Card Plugins**
2. Zip your plugin directory
3. Click **Install plugin** and select the ZIP

```bash
zip -r my-plugin.zip my-plugin/ -x "*.DS_Store"
```

## License

MIT
