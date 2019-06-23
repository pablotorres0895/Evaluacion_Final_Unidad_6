const fs = require('fs'),
  path = require('path')

class FileReader {
    GetAllInfo() {
        let filePath = path.join(__dirname, 'data', 'data.json')
        return new Promise((resolve, reject)=>{
            fs.readFile(filePath, 'UTF8', (error, data)=>{
                if(error) reject(error)
                resolve(JSON.parse(data))
            })
        })
    }
}
module.exports = new FileReader()