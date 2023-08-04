var deepLApiKey = null;

function onOpen() {
  // Add a custom menu to the spreadsheet UI.
  SpreadsheetApp.getUi()
    .createMenu('Tide Scans Translator')
    .addItem('Translate Japan to English (DeepL)', 'showPromptForDeepLApiKey')
    .addItem('Translate Japan to English (DeepL) - Specific Row', 'showPromptForDeepLApiKeyRow')
    .addItem('Translate Japan to English (Google)', 'showPromptForStartAndStopRowGoogleTranslate')
    .addItem('Translate Japan to English (Google) - Specific Row', 'showPromptForStopRowGoogleTranslate')
    .addItem('Translate Japan to English (Jisho)', 'showPromptForJishoStartAndStopRow')
    .addItem('Translate Japan to English (Jisho) - Specific Row', 'showPromptForJishoRow')
    .addItem('Column E ChatGPT Prompt', 'showPromptForTranslateAndDefineInColumnEWithStartAndStopRow')
    .addItem('Column E ChatGPT Prompt - Specific Row', 'showPromptForTranslateAndDefineInColumnE')
    .addToUi();
}

//DeepL Here

function showPromptForStartAndStopRowDeepL() {
  var ui = SpreadsheetApp.getUi();
  var startResult = ui.prompt('Enter the start row number to translate with DeepL:', ui.ButtonSet.OK_CANCEL);

  if (startResult.getSelectedButton() === ui.Button.OK) {
    var startRowText = startResult.getResponseText();
    var startRow = parseInt(startRowText);
    if (isNaN(startRow) || startRow <= 0) {
      startRow = 1; // Set startRow to 1 if it's less than or equal to 0
    }
    if (!isNaN(startRow)) {
      var stopResult = ui.prompt('Enter the stop row number to translate with DeepL:', ui.ButtonSet.OK_CANCEL);
      if (stopResult.getSelectedButton() === ui.Button.OK) {
        var stopRowText = stopResult.getResponseText();
        var stopRow = parseInt(stopRowText);
        if (!isNaN(stopRow)) {
          translateJapanToEnglishWithDeepL(startRow, stopRow);
        } else {
          ui.alert('Invalid input. Please enter a valid stop row number.');
        }
      }
    } else {
      ui.alert('Invalid input. Please enter a valid start row number.');
    }
  }
}

function showPromptForDeepLApiKey() {
  var ui = SpreadsheetApp.getUi();
  var response;

  deepLApiKey = PropertiesService.getUserProperties().getProperty('DeepL_API_Key');
  var usePreviousKey = deepLApiKey !== null;

  if (usePreviousKey) {
    response = ui.alert('Do you want to use the previous DeepL API Key?', ui.ButtonSet.YES_NO);
    if (response === ui.Button.YES) {
      // Continue using the previous API key
      showPromptForStartAndStopRowDeepL();
      return;
    }
  }

  response = ui.prompt('Enter your DeepL API Key:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.OK) {
    var apiKey = response.getResponseText().trim();
    if (apiKey !== '') {
      deepLApiKey = apiKey;
      // Save the API key to the user properties
      PropertiesService.getUserProperties().setProperty('DeepL_API_Key', apiKey);
      showPromptForStartAndStopRowDeepL();
    } else {
      ui.alert('Invalid input. Please enter a valid DeepL API Key.');
    }
  }
}

function showPromptForDeepLApiKeyRow() {
  var ui = SpreadsheetApp.getUi();
  var response;

  deepLApiKey = PropertiesService.getUserProperties().getProperty('DeepL_API_Key');
  var usePreviousKey = deepLApiKey !== null;

  if (usePreviousKey) {
    response = ui.alert('Do you want to use the previous DeepL API Key?', ui.ButtonSet.YES_NO);
    if (response === ui.Button.YES) {
      // Continue using the previous API key
      showPromptForDeepLRow();
      return;
    }
  }

  response = ui.prompt('Enter your DeepL API Key:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.OK) {
    var apiKey = response.getResponseText().trim();
    if (apiKey !== '') {
      deepLApiKey = apiKey;
      // Save the API key to the user properties
      PropertiesService.getUserProperties().setProperty('DeepL_API_Key', apiKey);
      showPromptForDeepLRow();
    } else {
      ui.alert('Invalid input. Please enter a valid DeepL API Key.');
    }
  }
}

function showPromptForDeepLRow() {
  var result = SpreadsheetApp.getUi().prompt('Enter the row number to translate with DeepL:', SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);

  if (result.getSelectedButton() === SpreadsheetApp.getUi().Button.OK) {
    var rowNumberText = result.getResponseText();
    var rowNumber = parseInt(rowNumberText);
    if (!isNaN(rowNumber)) {
      translateJapanToEnglishWithDeepLSpecificRow(rowNumber);
    } else {
      SpreadsheetApp.getUi().alert('Invalid input. Please enter a valid row number.');
    }
  }
}

function translateJapanToEnglishWithDeepLSpecificRow(rowNumber) {
  // Check if DeepL API key is available
  if (!deepLApiKey) {
    showPromptForDeepLApiKeyRow();
    return;
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var textToTranslate = sheet.getRange(rowNumber, 1).getValue();
  var translatedText = translateWithDeepL(textToTranslate);

  if (translatedText !== null) {
    sheet.getRange(rowNumber, 2).setValue(translatedText);
    SpreadsheetApp.getUi().alert('Translated with DeepL and set in Column B for row ' + rowNumber + '.');
  } else {
    SpreadsheetApp.getUi().alert('Translation failed or row is empty.');
  }
}

function translateWithDeepL(text) {
  if (!deepLApiKey) {
    throw new Error('DeepL API Key is not provided. Please run the "Translate Japan to English (DeepL) - Specific Row" menu option first and enter your DeepL API Key.');
  }

  var apiUrl = 'https://api-free.deepl.com/v2/translate';
  var sourceLang = 'JA'; // Source language (Japanese)
  var targetLang = 'EN'; // Target language (English)

  var payload = {
    'auth_key': deepLApiKey,
    'text': text,
    'source_lang': sourceLang,
    'target_lang': targetLang
  };

  var options = {
    'method': 'post',
    'payload': payload
  };

  var response = UrlFetchApp.fetch(apiUrl, options);
  var data = JSON.parse(response.getContentText());

  if (data.translations && data.translations.length > 0) {
    return data.translations[0].text;
  } else {
    return null;
  }
}

function translateJapanToEnglishWithDeepL(startRow, stopRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnB = sheet.getRange('B:B').getValues();
  var translatedCells = 0;

  // Check if DeepL API key is available
  if (!deepLApiKey) {
    showPromptForDeepLApiKey();
    return;
  }

  for (var i = startRow - 1; i < columnA.length && i < stopRow; i++) {
    if (columnA[i][0] !== '' && columnB[i][0] === '') {
      var textToTranslate = columnA[i][0];
      var translatedText = translateWithDeepL(textToTranslate);
      if (translatedText !== null) {
        sheet.getRange(i + 1, 2).setValue(translatedText);
        translatedCells++;
      }
    }
  }

  if (translatedCells > 0) {
    var message = "Translated " + translatedCells + " cells from Japan to English using DeepL.";
    SpreadsheetApp.getUi().alert(message);
  } else {
    SpreadsheetApp.getUi().alert("No cells were translated from Japan to English using DeepL.");
  }
}

//Google Here

function showPromptForStopRowGoogleTranslate() {
  var result = SpreadsheetApp.getUi().prompt('Enter the row number to translate with Google Translate:', SpreadsheetApp.getUi().ButtonSet.OK_CANCEL);

  if (result.getSelectedButton() === SpreadsheetApp.getUi().Button.OK) {
    var rowNumberText = result.getResponseText();
    var rowNumber = parseInt(rowNumberText);
    if (!isNaN(rowNumber)) {
      translateJapanToEnglishWithGoogleSpecificRow(rowNumber);
    } else {
      SpreadsheetApp.getUi().alert('Invalid input. Please enter a valid row number.');
    }
  }
}

function translateJapanToEnglishWithGoogleSpecificRow(rowNumber) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var textToTranslate = sheet.getRange(rowNumber, 1).getValue();
  var translatedText = LanguageApp.translate(textToTranslate, 'ja', 'en');

  if (translatedText !== null) {
    sheet.getRange(rowNumber, 3).setValue(translatedText);
    SpreadsheetApp.getUi().alert('Translated with Google Translate and set in Column C for row ' + rowNumber + '.');
  } else {
    SpreadsheetApp.getUi().alert('Translation failed or row is empty.');
  }
}

function translateJapanToEnglishWithGoogle(startRow, stopRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnC = sheet.getRange('C:C').getValues();
  var translatedCells = 0;

  for (var i = startRow - 1; i < columnA.length && i < stopRow; i++) {
    if (columnA[i][0] !== '' && columnC[i][0] === '') {
      var textToTranslate = columnA[i][0];
      var translatedText = LanguageApp.translate(textToTranslate, 'ja', 'en');
      if (translatedText !== null) {
        sheet.getRange(i + 1, 3).setValue(translatedText);
        translatedCells++;
      }
      Utilities.sleep(200); // Add a delay of 0.2 seconds (200 milliseconds)
    }
  }

  if (translatedCells > 0) {
    var message = "Translated " + translatedCells + " cells from Japan to English using Google Translate.";
    SpreadsheetApp.getUi().alert(message);
  } else {
    SpreadsheetApp.getUi().alert("No cells were translated from Japan to English using Google Translate.");
  }
}

function showPromptForStartAndStopRowGoogleTranslate() {
  var ui = SpreadsheetApp.getUi();
  var startResult = ui.prompt('Enter the start row number to translate with Google Translate:', ui.ButtonSet.OK_CANCEL);

  if (startResult.getSelectedButton() === ui.Button.OK) {
    var startRowText = startResult.getResponseText();
    var startRow = parseInt(startRowText);
    if (isNaN(startRow) || startRow <= 0) {
      startRow = 1; // Set startRow to 1 if it's less than or equal to 0
    }
    if (!isNaN(startRow)) {
      var stopResult = ui.prompt('Enter the stop row number to translate with Google Translate:', ui.ButtonSet.OK_CANCEL);
      if (stopResult.getSelectedButton() === ui.Button.OK) {
        var stopRowText = stopResult.getResponseText();
        var stopRow = parseInt(stopRowText);
        if (!isNaN(stopRow)) {
          translateJapanToEnglishWithGoogle(startRow, stopRow);
        } else {
          ui.alert('Invalid input. Please enter a valid stop row number.');
        }
      }
    } else {
      ui.alert('Invalid input. Please enter a valid start row number.');
    }
  }
}


//Jisho Here

function showPromptForJishoStartAndStopRow() {
  var ui = SpreadsheetApp.getUi();
  var startResult = ui.prompt('Enter the start row number to fetch information from Jisho:', ui.ButtonSet.OK_CANCEL);

  if (startResult.getSelectedButton() === ui.Button.OK) {
    var startRowText = startResult.getResponseText();
    var startRow = parseInt(startRowText);
    if (isNaN(startRow) || startRow <= 0) {
      startRow = 1; // Set startRow to 1 if it's less than or equal to 0
    }
    if (!isNaN(startRow)) {
      var stopResult = ui.prompt('Enter the stop row number to fetch information from Jisho:', ui.ButtonSet.OK_CANCEL);
      if (stopResult.getSelectedButton() === ui.Button.OK) {
        var stopRowText = stopResult.getResponseText();
        var stopRow = parseInt(stopRowText);
        if (!isNaN(stopRow)) {
          translateJapanToEnglishWithJisho(startRow, stopRow);
          translateAndDefineInColumnEWithStartAndStopRow(startRow, stopRow);
        } else {
          ui.alert('Invalid input. Please enter a valid stop row number.');
        }
      }
    } else {
      ui.alert('Invalid input. Please enter a valid start row number.');
    }
  }
}

function showPromptForJishoRow() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt('Enter the row number to fetch information from Jisho:', ui.ButtonSet.OK_CANCEL);

  if (result.getSelectedButton() === ui.Button.OK) {
    var rowNumberText = result.getResponseText();
    var rowNumber = parseInt(rowNumberText);
    if (!isNaN(rowNumber)) {
      translateJapanToEnglishWithJishoRow(rowNumber); // Updated function name here
      translateAndDefineInColumnE(rowNumber);
    } else {
      ui.alert('Invalid input. Please enter a valid row number.');
    }
  }
}

function translateJapanToEnglishWithJishoRow(rowNumber) { // Updated function name here
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnD = sheet.getRange('D:D').getValues();
  var i = rowNumber - 1; // Convert rowNumber to array index (0-based)

  if (i >= 0 && i < columnA.length && i < columnD.length) {
    var textToTranslate = columnA[i][0];
    if (textToTranslate !== '' && columnD[i][0] === '') {
      var apiUrl = 'https://jisho.org/api/v1/search/words?keyword=' + encodeURI(textToTranslate);
      var rawInfo = fetchJishoInfo(apiUrl);
      if (rawInfo !== null) {
        sheet.getRange(i + 1, 4).setValue(JSON.stringify(rawInfo));
        SpreadsheetApp.getUi().alert("Fetched raw information for row " + rowNumber + " from Jisho.");
      } else {
        SpreadsheetApp.getUi().alert("No information found for row " + rowNumber + " from Jisho.");
      }
    } else {
      SpreadsheetApp.getUi().alert("Column A is empty or Column D is already filled for row " + rowNumber + ".");
    }
  } else {
    SpreadsheetApp.getUi().alert("Invalid row number. Please enter a valid row number.");
  }
}

function translateJapanToEnglishWithJisho(startRow, stopRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnD = sheet.getRange('D:D').getValues();
  var translatedCells = 0;

  for (var i = startRow - 1; i < columnA.length && i < stopRow; i++) {
    if (columnA[i][0] !== '' && columnD[i][0] === '') {
      var textToTranslate = columnA[i][0];
      var apiUrl = 'https://jisho.org/api/v1/search/words?keyword=' + encodeURI(textToTranslate);
      var rawInfo = fetchJishoInfo(apiUrl);
      if (rawInfo !== null) {
        sheet.getRange(i + 1, 4).setValue(JSON.stringify(rawInfo));
        translatedCells++;
        Utilities.sleep(500); // Add a delay of 0.5 seconds (500 milliseconds)
      }
    }
  }

  if (translatedCells > 0) {
    var message = "Fetched raw information for " + translatedCells + " words from Jisho.";
    SpreadsheetApp.getUi().alert(message);
  } else {
    SpreadsheetApp.getUi().alert("No words were fetched from Jisho.");
  }
}

function fetchJishoInfo(apiUrl) {
  var response = UrlFetchApp.fetch(apiUrl);
  var data = JSON.parse(response.getContentText());

  return data; // Return the raw JSON data from Jisho
}

//ChatGPT Prompt Here

function showPromptForTranslateAndDefineInColumnEWithStartAndStopRow() {
  var ui = SpreadsheetApp.getUi();
  var startResult = ui.prompt('Enter the start row number:', ui.ButtonSet.OK_CANCEL);

  if (startResult.getSelectedButton() === ui.Button.OK) {
    var startRowText = startResult.getResponseText();
    var startRow = parseInt(startRowText);
    if (isNaN(startRow) || startRow <= 0) {
      startRow = 1; // Set startRow to 1 if it's less than or equal to 0
    }
    if (!isNaN(startRow)) {
      var stopResult = ui.prompt('Enter the stop row number:', ui.ButtonSet.OK_CANCEL);
      if (stopResult.getSelectedButton() === ui.Button.OK) {
        var stopRowText = stopResult.getResponseText();
        var stopRow = parseInt(stopRowText);
        if (!isNaN(stopRow)) {
          translateAndDefineInColumnEWithStartAndStopRow(startRow, stopRow);
        } else {
          ui.alert('Invalid input. Please enter a valid stop row number.');
        }
      }
    } else {
      ui.alert('Invalid input. Please enter a valid start row number.');
    }
  }
}

function translateAndDefineInColumnEWithStartAndStopRow(startRow, stopRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnD = sheet.getRange('D:D').getValues();
  var translatedRows = 0;

  for (var i = startRow - 1; i < columnA.length && i < stopRow; i++) {
    if (columnA[i][0] !== '' && columnD[i][0] !== '') {
      var textToTranslate = columnA[i][0];
      var dataToDefine = columnD[i][0];
      var translatedAndDefinedText = "Using this data " + dataToDefine + ", I want you to understand what each is telling you. Try to use it for everything, but for the thing you didn't get the meaning for, figure it out yourself. After you understand each individual phrase, define this sentence, and give me a short breakdown. Only give me the English definition of the sentence/phrase/words. Here it is: (" + textToTranslate + "). Here’s an example for how your output should look like:[Here Should Be a Line Break, but It Can not Be Shown]" + 'Sure, here are the English definitions for the sentence "この街はもうお終いだよ":[Here Should Be a Line Break, but It Can not Be Shown][Here Should Be a Line Break, but It Can not Be Shown]' + '(この街 (このまち) - This town/city[Here Should Be a Line Break, but It Can not Be Shown]' + 'もう (もう) - Already[Here Should Be a Line Break, but It Can not Be Shown]' + 'お終い (おしまい) - The end; finished[Here Should Be a Line Break, but It Can not Be Shown]' + 'だ (だ) - Copula (is/are)[Here Should Be a Line Break, but It Can not Be Shown]' + 'よ (よ) - Sentence-ending particle for emphasis or assertion[Here Should Be a Line Break, but It Can not Be Shown][Here Should Be a Line Break, but It Can not Be Shown]' + 'English Translation: "This town/city is already finished." or "This town/city is coming to an end.")' + " so make the breakdown look like that make sure everyplace that has the Link Break text look at it as a line break and not apart of this text as anything other than a Link Break. " + 'Now I am going to tell you in text form what it should look like; no bold text. Say, “Sure, here are the English definitions for the sentence "この街はもうお終いだよ":”Make sure you change the Japanese text to the one I have provided. Now,  after 2 line breaks, add only the word, reading, and English definition/part of speech if there is no meaning, as shown earlier. No identifying anything Just place the text one after another like how it was shown before, and after 2 more line breaks after placing all the other stuff, add the English Translation to make it look like this “English Translation: "This town/city is already finished." or "This town/city is coming to an end.” make sure to add the real translation of the provided text, do not mention any line breaks in your response. Also, do not take the definition and just add to the English translation; just pick one, no slashes unless there were slashes in the translation, If you want to get more definition, just add an “or” to separate it; if an “or” is not needed, do not add it. Again I want all the Word - reading - definition/part of speech in one line like I said before. Make sure to give all the definitions for every word.';
      sheet.getRange(i + 1, 5).setValue(translatedAndDefinedText);
      translatedRows++;
    }
  }

  if (translatedRows > 0) {
    var message = "Column E ChatGPT Prompt for " + translatedRows + " rows.";
    SpreadsheetApp.getUi().alert(message);
  } else {
    SpreadsheetApp.getUi().alert("No rows were Column E ChatGPT Prompt.");
  }
}

function showPromptForTranslateAndDefineInColumnE() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt('Enter the row number to Column E ChatGPT Prompt:', ui.ButtonSet.OK_CANCEL);

  if (result.getSelectedButton() === ui.Button.OK) {
    var rowNumberText = result.getResponseText();
    var rowNumber = parseInt(rowNumberText);
    if (!isNaN(rowNumber)) {
      translateAndDefineInColumnE(rowNumber);
    } else {
      ui.alert('Invalid input. Please enter a valid row number.');
    }
  }
}

function translateAndDefineInColumnE(rowNumber) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnD = sheet.getRange('D:D').getValues();
  var i = rowNumber - 1; // Convert rowNumber to array index (0-based)

  if (i >= 0 && i < columnA.length && i < columnD.length) {
    var textToTranslate = columnA[i][0];
    var dataToDefine = columnD[i][0];
    if (textToTranslate !== '' && dataToDefine !== '') {
      var translatedAndDefinedText = "Using this data " + dataToDefine + ", I want you to understand what each is telling you. Try to use it for everything, but for the thing you didn't get the meaning for, figure it out yourself. After you understand each individual phrase, define this sentence, and give me a short breakdown. Only give me the English definition of the sentence/phrase/words. Here it is: (" + textToTranslate + "). Here’s an example for how your output should look like:[Here Should Be a Line Break, but It Can not Be Shown]" + 'Sure, here are the English definitions for the sentence "この街はもうお終いだよ":[Here Should Be a Line Break, but It Can not Be Shown][Here Should Be a Line Break, but It Can not Be Shown]' + '(この街 (このまち) - This town/city[Here Should Be a Line Break, but It Can not Be Shown]' + 'もう (もう) - Already[Here Should Be a Line Break, but It Can not Be Shown]' + 'お終い (おしまい) - The end; finished[Here Should Be a Line Break, but It Can not Be Shown]' + 'だ (だ) - Copula (is/are)[Here Should Be a Line Break, but It Can not Be Shown]' + 'よ (よ) - Sentence-ending particle for emphasis or assertion[Here Should Be a Line Break, but It Can not Be Shown][Here Should Be a Line Break, but It Can not Be Shown]' + 'English Translation: "This town/city is already finished." or "This town/city is coming to an end.")' + " so make the breakdown look like that make sure everyplace that has the Link Break text look at it as a line break and not apart of this text as anything other than a Link Break. " + 'Now I am going to tell you in text form what it should look like; no bold text. Say, “Sure, here are the English definitions for the sentence "この街はもうお終いだよ":”Make sure you change the Japanese text to the one I have provided. Now,  after 2 line breaks, add only the word, reading, and English definition/part of speech if there is no meaning, as shown earlier. No identifying anything Just place the text one after another like how it was shown before, and after 2 more line breaks after placing all the other stuff, add the English Translation to make it look like this “English Translation: "This town/city is already finished." or "This town/city is coming to an end.” make sure to add the real translation of the provided text, do not mention any line breaks in your response. Also, do not take the definition and just add to the English translation; just pick one, no slashes unless there were slashes in the translation, If you want to get more definition, just add an “or” to separate it; if an “or” is not needed, do not add it. Again I want all the Word - reading - definition/part of speech in one line like I said before. Make sure to give all the definitions for every word.';
      sheet.getRange(i + 1, 5).setValue(translatedAndDefinedText);
      SpreadsheetApp.getUi().alert("Column E ChatGPT Prompt for row " + rowNumber + ".");
    } else {
      SpreadsheetApp.getUi().alert("Column A or Column D is empty for row " + rowNumber + ".");
    }
  } else {
    SpreadsheetApp.getUi().alert("Invalid row number. Please enter a valid row number.");
  }
}
