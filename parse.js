const excelToJson = require('convert-excel-to-json');
var os = require('os')
fs = require('fs');

const alphabet = makeColumns(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const zeroPad = (num, places) => String(num).padStart(places, '0')

function parseXls(filename, sheetname, rowsToSkip) {
    return new Promise((resolve, reject) => {
        const result = excelToJson({
            sourceFile: filename,
            sheets: [sheetname],
            header: {
                rows: rowsToSkip
            }
        });
        if (!result) reject("Error parsing xls.")
        else resolve(result[sheetname])
    })
}

function extractStart(str) {
    let dates = str.match(/\((.*?)\)/g)
    return {
        start: dates[0].slice(1, 11),
        end: dates[1].slice(1, 11)
    }
}

function makeColumns(alphabet) {
    result = [...alphabet];
    alphabet.forEach(a => {
        alphabet.forEach(b => {
            // console.log(a + b)
            result.push(a + b);
        });
    });
    return result;
}

function makeCsv(date, diagnose, rows) {
    let columns = Object.keys(rows[0])
    let last_column = columns[columns.length - 1]
    let sub_alpha = alphabet.slice(0, alphabet.indexOf(last_column) + 1)

    result = ""
    for (const row of rows) {
        let row_content = []
        for (const char of sub_alpha) row_content.push(row[char])
        result += `"${date}",` + `"${diagnose}",` + '"' + Object.values(row_content).join('","') + '"' + os.EOL
    }
    return result
}

function convertDate(dateString) {
    let day = dateString.substring(0, 2)
    let month = dateString.substring(3, 5)
    let year = dateString.substring(6, 10)
    let date = new Date(`${month}/${day}/${year}`)
    let week = zeroPad(date.getWeek(), 2)

    return `${year}_${week}`
}

async function main() {
    let result = '"date_week","diagnosis_type","code","description","count","percentage"' + os.EOL
    for (let i = 1; i <= 144; i++) {
        const file = `./xls/data${i}.xlsx`
        console.log(`Processing ${file}...`)
        let data = await parseXls(file, "Info", 1)
        let dateString = data[0]['A']
        let dateInfo = extractStart(dateString)
        let date = convertDate(dateInfo.start)

        let hauptdiagnosen = await parseXls(file, "Hauptdiagnosen", 1)
        result += makeCsv(date, "Hauptdiagnose", hauptdiagnosen)
        let nebendiagnosen = await parseXls(file, "Nebendiagnosen", 1)
        result += makeCsv(date, "Nebendiagnose", nebendiagnosen)
    }

    fs.writeFile('data.csv', result, function (err) {
        if (err) return console.log(err);
    });
}

main()
