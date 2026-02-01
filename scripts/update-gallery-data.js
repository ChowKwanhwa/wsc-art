const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/data/gallery-data.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(rawData);

const dimensions = [
    "138cm x 69cm",
    "68cm x 68cm",
    "100cm x 50cm",
    "180cm x 97cm",
    "68cm x 136cm",
    "34cm x 136cm"
];

function getRandomDimension() {
    return dimensions[Math.floor(Math.random() * dimensions.length)];
}

// Update all categories
Object.keys(data).forEach(category => {
    data[category] = data[category].map(item => ({
        ...item,
        artist: "巫师传",
        dimensions: getRandomDimension() // Assign random dimension
    }));
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Gallery data updated successfully!');
