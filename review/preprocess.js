function preprocess(payload) {
    var data = {};
    var keys = Object.keys(payload);
    for (var i = 0; i < keys.length; i++) {
        data[keys[i]] = payload[keys[i]];
    }

    // Convert textarea strings to arrays (pros, cons)
    var arrayFields = ['pros', 'cons'];
    for (var j = 0; j < arrayFields.length; j++) {
        var key = arrayFields[j];
        if (typeof data[key] === 'string') {
            data[key] = data[key].split('\n').filter(function(line) {
                return line.trim() !== '';
            });
        }
    }

    // Parse ratings: "Label=Score" lines into {label, score, percent} objects
    if (typeof data.ratings === 'string') {
        data.ratings = data.ratings.split('\n').filter(function(line) {
            return line.trim() !== '';
        }).map(function(line) {
            var parts = line.split('=');
            var label = parts[0].trim();
            var score = parseFloat(parts[1]) || 0;
            return {
                label: label,
                score: score,
                percent: Math.min(100, (score / 10) * 100)
            };
        });
    }

    return data;
}
