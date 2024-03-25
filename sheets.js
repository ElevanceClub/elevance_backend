const {google} = require('googleapis');

function sheetsCreator (data){
const serviceAccountKeyFile = "./sheets_updater.json";
const sheetId = '1WADa21o0HcQNIeeGigR6xz0HVBZFlTL9BC1LVLK_zs0'
const tabName = 'Creators'
const range = 'A:E'

main().then(() => {
  console.log('Completed')
})

async function main() {
  // Generating google sheet client
  const googleSheetClient = await _getGoogleSheetClient();
  await _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, [data]);
}

async function _getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
}


async function _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, data) {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      "majorDimension": "ROWS",
      "values": data
    },
  })
}
}

function sheetsBrand (data){
  const serviceAccountKeyFile = "./sheets_updater.json";
  const sheetId = '1WADa21o0HcQNIeeGigR6xz0HVBZFlTL9BC1LVLK_zs0'
  const tabName = 'Brands'
  const range = 'A:F'
  
  main().then(() => {
    console.log('Completed')
  })
  
  async function main() {
    // Generating google sheet client
    const googleSheetClient = await _getGoogleSheetClient();
    await _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, [data]);
  }
  
  async function _getGoogleSheetClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountKeyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    return google.sheets({
      version: 'v4',
      auth: authClient,
    });
  }
  
  
  async function _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, data) {
    await googleSheetClient.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!${range}`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        "majorDimension": "ROWS",
        "values": data
      },
    })
  }
  }

module.exports= {sheetsCreator, sheetsBrand}