// Haraya POS cloud backup: paste this into a new Google Apps Script project.
// It saves each backup the iPad sends into a "Haraya POS backups" folder in your Google Drive,
// and lets the Mac load the latest one.

const SECRET_KEY = 'change-me-to-something-long';   // type the same key into the app
const FOLDER = 'Haraya POS backups';
const KEEP = 60;                                      // how many old backups to keep

function folder_() {
  const it = DriveApp.getFoldersByName(FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER);
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.key !== SECRET_KEY) return ContentService.createTextOutput('wrong key');
  const f = folder_();
  const json = JSON.stringify(body.backup);
  const stamp = Utilities.formatDate(new Date(), 'Asia/Manila', 'yyyy-MM-dd_HHmm');
  f.createFile('haraya-backup-' + stamp + '.json', json, 'application/json');
  const latest = f.getFilesByName('latest.json');
  if (latest.hasNext()) latest.next().setContent(json); else f.createFile('latest.json', json, 'application/json');
  // tidy up old copies
  const files = [];
  const all = f.getFiles();
  while (all.hasNext()) { const x = all.next(); if (x.getName() !== 'latest.json') files.push(x); }
  files.sort((a, b) => b.getDateCreated() - a.getDateCreated()).slice(KEEP).forEach(x => x.setTrashed(true));
  return ContentService.createTextOutput('ok');
}

function doGet(e) {
  if ((e.parameter.key || '') !== SECRET_KEY) return ContentService.createTextOutput('{"error":"wrong key"}').setMimeType(ContentService.MimeType.JSON);
  const latest = folder_().getFilesByName('latest.json');
  const text = latest.hasNext() ? latest.next().getBlob().getDataAsString() : '{"error":"no backup yet"}';
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.JSON);
}
