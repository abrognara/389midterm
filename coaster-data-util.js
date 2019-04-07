var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('coasters.json'));
}
  
function saveData(data) {
    var obj = { coasters: data };
    fs.writeFileSync('coasters.json', JSON.stringify(obj));
}

function resetData() {
    saveData([]);
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    resetData: resetData
}