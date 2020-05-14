// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const filesCollection = []
const directoriesToSkip = [
  'bower_components',
  'node_modules',
  'www',
  'platforms'
]

function readDirectorySynchronously(directory) {
  const currentDirectory = fs.readdirSync(directory, 'utf8')

  currentDirectory.forEach(file => {
    const skips = directoriesToSkip.indexOf(file) > -1
    const pathOfCurrentItem = path.join(directory + '/' + file)
    if (!skips && fs.statSync(pathOfCurrentItem).isFile()) {
      filesCollection.push(pathOfCurrentItem)
    } else if (!skips) {
      const directoryPath = path.join(directory + '\\' + file)
      readDirectorySynchronously(directoryPath)
    }
  })
}

readDirectorySynchronously('../algorithm/packages')

console.log(
  filesCollection
    .filter(o => o.toString().endsWith('.js'))
    .map(o => {
      fs.renameSync(o, o.replace('.js', '.ts'))
    })
)
