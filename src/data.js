const { GoogleSpreadsheet } = require("google-spreadsheet");
var cred = require("./client-secret.json");

async function getSpreadsheet() {
  const doc = new GoogleSpreadsheet(URL_SHEET_CODE, null, {
    gzip: false,
  });
  await doc
    .useServiceAccountAuth(cred)
    .catch((err) => console.log("Google Sheets Authentication Error"));
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  return rows.filter((row) => row.activitytype);
}

async function getGoals() {
  const sdgDoc = new GoogleSpreadsheet(URL_SHEET_CODE, null, { gzip: false });
  await sdgDoc
    .useServiceAccountAuth(cred)
    .catch((err) => console.log("Google Sheets Authentication Error"));
  await sdgDoc.loadInfo();
  const sdgSheet = sdgDoc.sheetsByIndex[2];
  const sdgRows = await sdgSheet.getRows();
  return sdgRows;
}

async function addProject(data) {
  const doc = new GoogleSpreadsheet(URL_SHEET_CODE, null, {
    gzip: false,
  });
  await doc
    .useServiceAccountAuth(cred)
    .catch((err) => console.log("Google Sheets Authentication Error"));

  const info = await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];

  sheet.addRow(data, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

export { getSpreadsheet, getGoals, addProject };
