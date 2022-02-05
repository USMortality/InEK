const excelToJson = require('convert-excel-to-json');
var os = require('os')
fs = require('fs');
const child_process = require('child_process');

const alphabet = makeColumns(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);

Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
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

function extractInfo(str) {
    let info = str.match(/\((.*?)\)/g)
    if (info.length === 3) {
        return {
            age: info[0].replace('(', '').replace(' Jahre)', ''),
            start: info[1].replace('(', '').replace(')', ''),
            end: info[2].replace('(', '').replace(')', '')
        }
    } else {
        return {
            age: "all",
            start: info[0].replace('(', '').replace(')', ''),
            end: info[1].replace('(', '').replace(')', '')
        }
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

function makeCsv(date, ageGroup, diagnose, rows) {
    let columns = Object.keys(rows[0])
    let last_column = columns[columns.length - 1]
    let sub_alpha = alphabet.slice(0, alphabet.indexOf(last_column) + 1)

    result = ""
    for (const row of rows) {
        let row_content = []
        for (const char of sub_alpha) row_content.push(row[char])
        result += `"${date}",` + `"${ageGroup}",` + `"${diagnose}",` +
            '"' + Object.values(row_content).join('","') + '"' + os.EOL
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

async function print() {
    let keys = {}

    let result = '"date_week","ageGroup","diagnosis_type","code","description","count","percentage"' + os.EOL
    for (let i = 1; i <= 146; i++) {
        const file = `/Users/ben/Downloads/16-17/data${i}.xlsx`
        let data
        try {
            data = await parseXls(file, "Info", 1)
        } catch (e) { continue; }
        let infoString = data[0]['A']
        let info = extractInfo(infoString)
        let date = convertDate(info.start)
        if (keys[date] === 1) throw new Error(`Duplicate date detected, ${file}`)
        else keys[date] = 1
    }
    if (Object.keys(keys).length !== 144) throw new Error(`Week missing, ${ageGroup}`)
    console.log("Valid!")
}

async function extractAgeGroup(ageGroup) {
    let result = ""
    let keys = {}
    for (let i = 145; i <= 157; i++) {
        const file = `./xls/${ageGroup}/data${i}.xlsx`
        console.log(`Processing ${file}...`)
        let data = await parseXls(file, "Info", 1)
        let infoString = data[0]['A']
        let info = extractInfo(infoString)
        let date = convertDate(info.start)

        if (keys[date] === 1) throw new Error(`Duplicate date detected, ${file}`)
        else keys[date] = 1

        let hauptdiagnosen = await parseXls(file, "Hauptdiagnosen", 1)
        result += makeCsv(date, info.age, "Hauptdiagnose", hauptdiagnosen)
        let nebendiagnosen = await parseXls(file, "Nebendiagnosen", 1)
        result += makeCsv(date, info.age, "Nebendiagnose", nebendiagnosen)
    }
    if (Object.keys(keys).length !== 12) throw new Error(`Week missing, ${ageGroup}`)
    return result
}

const start = async () => {
    const folders = [
        '16-17', '18-29', '30-39', '40-49', '50-54', '55-59',
        '60-64', '65-74', '75-79', '80+'
    ]

    // try {
    //     child_process.execSync(`rm ./data.csv`)
    // } catch (e) { }
    // let result = '"date_week","age","diagnosis_type","code","description","count","percentage"' + os.EOL
    // fs.writeFileSync(`./data.csv`, result, function (err) {
    //     if (err) return console.log(err);
    // });

    // await asyncForEach(folders, async (ageGroup) => {
    //     let result = await extractAgeGroup(ageGroup);
    //     fs.appendFileSync(`./data.csv`, result, function (err) {
    //         if (err) return console.log(err);
    //     });
    // })

    let result = await extractAgeGroup("all");
    fs.appendFileSync(`./data.csv`, result, function (err) {
        if (err) return console.log(err);
    });
}

start()
// print()
