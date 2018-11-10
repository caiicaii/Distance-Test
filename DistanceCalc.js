function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Distance Calculation")
  .addItem("Measure Distance", "distanceCalculation")
  .addItem("Clear calculation", "clearCalculations")
  .addToUi();
}

function clearCalculations() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  sheet.getSheetByName("Sheet1").getRange("C2:D").clearContent();
}

function distanceCalculation() {

  var key = "AIzaSyDXyo7L4c7kZifmfR0xa7sf4u2QAhKj8ns";
  var spreadSheet = SpreadsheetApp.openById("1Lt3YvaxCu--G95PejF2AoXAQwDB2FtaEOOYrpgM0_EU");
  var sheet = spreadSheet.getSheetByName('Sheet1');
  var range = sheet.getDataRange()
  var data = range.getValues()
  var dataLength = data.length
  var url ="https://maps.googleapis.com/maps/api/distancematrix/json?origins=";

  for (num = 1; num < dataLength; num++) {
    var row = data[num]; //start second row
    var start = row[0];
    var end = row[1];
    var origin = start.replace(" ", "+");
    var dest = end.replace(" ", "+"); //no spaces in url
   
    if (row[2] && row[3]) {
      continue;
    }
    
    var finalUrl = url + origin + "&destinations=" + dest + "&mode=driving&key=" + key;
    var response = UrlFetchApp.fetch(finalUrl);
    var json = response.getContentText()
    var result = JSON.parse(json);
    
    if(result.rows[0].elements[0].status.toString() == "OK"){//adding distance and driving time
      Logger.log(true);
      sheet.getRange(num + 1, 3).setValue(result.rows[0].elements[0].distance.text);
      sheet.getRange(num + 1, 4).setValue(result.rows[0].elements[0].duration.text);
    } else {
      sheet.getRange(num + 1, 3).setValue("N/A");
      sheet.getRange(num + 1, 4).setValue("N/A");
    }
    
    Utilities.sleep(1000);
  }
}

