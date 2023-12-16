const kanaDictionary = {
	//hiragana
	"あ": "a",
	"い": "i",
	"う": "u",
	"え": "e",
	"お": "o",	
	"か": "ka",	
	"き": "ki",	
	"く": "ku",
	"け": "ke",
	"こ": "ko",
	"が": "ga",
	"ぎ": "gi",
	"ぐ": "gu",
	"げ": "ge",
	"ご": "go",
	"さ": "sa",
	"し": "shi",
	"す": "su",
	"せ": "se",
	"そ": "so",
	"ざ": "za",
	"じ": "ji",
	"ず": "zu",
	"ぜ": "ze",
	"ぞ": "zo",
	"た": "ta",
	"ち": "chi",
	"つ": "tsu",
	"て": "te",
	"と": "to",
	"だ": "da",
	"ぢ": "ji",
	"づ": "zu",
	"で": "de",
	"ど": "do",
	"な": "na",
	"に": "ni",
	"ぬ": "nu",
	"ね": "ne",
	"の": "no",
	"は": "ha",
	"ひ": "hi",
	"ふ": "fu",
	"へ": "he",
	"ほ": "ho",
	"ば": "ba",
	"び": "bi",
	"ぶ": "bu",
	"べ": "be",
	"ぼ": "bo",
	"ぱ": "pa",
	"ぴ": "pi",
	"ぷ": "pu",
	"ぺ": "pe",
	"ぽ": "po",
	"ま": "ma",
	"み": "mi",
	"む": "mu",
	"め": "me",
	"も": "mo",
	"や": "ya",
	"ゆ": "yu",
	"よ": "yo",
	"ら": "ra",
	"り": "ri",
	"る": "ru",
	"れ": "re",
	"ろ": "ro",
	"わ": "wa",
	"を": "wo",
	"ん": "n",
	"きゃ": "kya",
	"きゅ": "kyu",
	"きょ": "kyo",
	"しゃ": "sha",
	"しゅ": "shu",
	"しょ": "sho",
	"ちゃ": "cha",
	"ちゅ": "chu",
	"ちょ": "cho",
	"にゃ": "nya",
	"にゅ": "nyu",
	"にょ": "nyo",
	"ひゃ": "hya",
	"ひゅ": "hyu",
	"ひょ": "hyo",
	"みゃ": "mya",
	"みゅ": "myu",
	"みょ": "myo",
	"りゃ": "rya",
	"りゅ": "ryu",
	"りょ": "ryo",
	"ぎゃ": "gya",
	"ぎゅ": "gyu",
	"ぎょ": "gyo",
	"じゃ": "ja",
	"じゅ": "ju",
	"じょ": "jo",
	"ぢゃ": "ja",
	"ぢゅ": "ju",
	"ぢょ": "jo",
	"びゃ": "bya",
	"びゅ": "byu",
	"びょ": "byo",
	"ぴゃ": "pya", 
	"ぴゅ": "pyu",
	"ぴょ": "pyo",
	//katakana
	'ア': 'a',
	'イ': 'i',
	'ウ': 'u',
	'エ': 'e',
	'オ': 'o',
	'カ': 'ka',
	'キ': 'ki',
	'ク': 'ku',
	'ケ': 'ke',
	'コ': 'ko',
	'ガ': 'ga',
	'ギ': 'gi',
	'グ': 'gu',
	'ゲ': 'ge',
	'ゴ': 'go',
	'サ': 'sa',
	'シ': 'shi',
	'ス': 'su',
	'セ': 'se',
	'ソ': 'so',
	'ザ': 'za',
	'ジ': 'ji',
	'ズ': 'zu',
	'ゼ': 'ze',
	'ゾ': 'zo',
	'タ': 'ta',
	'チ': 'chi',
	'ツ': 'tsu',
	'テ': 'te',
	'ト': 'to',
	'ダ': 'da',
	'ヂ': 'ji',
	'ヅ': 'zu',
	'デ': 'de',
	'ド': 'do',
	'ナ': 'na',
	'ニ': 'ni',
	'ヌ': 'nu',
	'ネ': 'ne',
	'ノ': 'no',
	'ハ': 'ha',
	'ヒ': 'hi',
	'フ': 'fu',
	'ヘ': 'he',
	'ホ': 'ho',
	'バ': 'ba',
	'ビ': 'bi',
	'ブ': 'bu',
	'ベ': 'be',
	'ボ': 'bo',
	'パ': 'pa',
	'ピ': 'pi',
	'プ': 'pu',
	'ペ': 'pe',
	'ポ': 'po',
	'マ': 'ma',
	'ミ': 'mi',
	'ム': 'mu',
	'メ': 'me',
	'モ': 'mo',
	'ヤ': 'ya',
	'ユ': 'yu',
	'ヨ': 'yo',
	'ラ': 'ra',
	'リ': 'ri',
	'ル': 'ru',
	'レ': 're',
	'ロ': 'ro',
	'ワ': 'wa',
	'ヲ': 'wo',
	'ン': 'n',
	'キャ': 'kya',
	'キュ': 'kyu',
	'キョ': 'kyo',
	'シャ': 'sha',
	'シュ': 'shu',
	'ショ': 'sho',
	'チャ': 'cha',
	'チュ': 'chu',
	'チョ': 'cho',
	'ニャ': 'nya',
	'ニュ': 'nyu',
	'ニョ': 'nyo',
	'ヒャ': 'hya',
	'ヒュ': 'hyu',
	'ヒョ': 'hyo',
	'ミャ': 'mya',
	'ミュ': 'myu',
	'ミョ': 'myo', 
	'リャ': 'rya',
	'リュ': 'ryu',
	'リョ': 'ryo',
	'ギャ': 'gya',
	'ギュ': 'gyu',
	'ギョ': 'gyo',
	'ジャ': 'ja',
	'ジュ': 'ju',
	'ジョ': 'jo',
	'ヂャ': 'dya',
	'ヂュ': 'dyu',
	'ヂョ': 'jo',
	'ビャ': 'bya',
	'ビュ': 'byu',
	'ビョ': 'byo',
	'ピャ': 'pya',
	'ピュ': 'pyu',
	'ピョ': 'pyo',
	'ッカ': 'kka',
	'ッキ': 'kki',
	'ック': 'kku',
	'ッケ': 'kke',
	'ッコ': 'kko',
	'ッサ': 'ssa',
	'ッシ': 'sshi',
	'ッス': 'ssu',
	'ッセ': 'sse',
	'ッソ': 'sso',
	'ッタ': 'tta',
	'ッチ': 'tchi',
	'ッツ': 'ttsu',
	'ッテ': 'tte',
	'ット': 'tto',
	'ッパ': 'ppa',
	'ッピ': 'ppi',
	'ップ': 'ppu',
	'ッペ': 'ppe',
	'ッポ': 'ppo',
	'シェ': 'she',
	'ジェ': 'je',
	'ティ': 'ti',
	'トゥ': 'tu',
	'ディ': 'di',
	'ドゥ': 'du',
	'チェ': 'che',
	'ファ': 'fa',
	'フィ': 'fi',
	'フェ': 'fe',
	'フォ': 'fo',
	'ウィ': 'wi',
	'ウェ': 'we',
	'ウォ': 'wo',
	'ヴァ': 'va',
	'ヴィ': 'vi',
	'ヴ': 'vu',
	'ヴェ': 've',
	'ヴォ': 'vo'
}

// Function to convert Japanese text to kana
function convertToKana(japaneseText) {
  var result = [];
  var i = 0;
  
  while (i < japaneseText.length) {
    // Try converting two characters first
    if (i + 1 < japaneseText.length && kanaDictionary.hasOwnProperty(japaneseText.slice(i, i + 2))) {
      result.push(kanaDictionary[japaneseText.slice(i, i + 2)]);
      i += 2;
    } else {
      // If unsuccessful, try converting one character
      if (kanaDictionary.hasOwnProperty(japaneseText[i])) {
        result.push(kanaDictionary[japaneseText[i]]);
      } else {
        // If no match, just append the character as is
        result.push(japaneseText[i]);
      }
      i += 1;
    }
  }

  return result.join('');
}

// Jisho API endpoint for word search
var jishoApiUrl = "https://jisho.org/api/v1/search/words?keyword=";

// Function to check Japanese text for kanji and get readings from Jisho
function convertToKanaWithReadings(japaneseText) {
  var result = [];

  // Loop through each character in the Japanese text
  for (var i = 0; i < japaneseText.length; i++) {
    var currentChar = japaneseText[i];

    // Check if the character is a kanji
    if (isKanji(currentChar)) {
      // Get the reading from Jisho API
      var reading = getReadingFromJisho(currentChar, i);

      // Append the reading to the result if available, otherwise keep the original kanji character
      result.push(reading || currentChar);
    } else {
      // Append non-kanji characters as is
      result.push(currentChar);
    }
  }

  return result.join('');
}

// Function to check if a character is a kanji (simplified check)
function isKanji(char) {
  return /[\u4E00-\u9FFF]/.test(char); // This regex checks if the character is within the range of common kanji characters
}

// Function to get the reading of a kanji character from Jisho API
function getReadingFromJisho(kanji, num) {
  var apiUrl = jishoApiUrl + encodeURIComponent(kanji);
  var response = UrlFetchApp.fetch(apiUrl);
  var data = JSON.parse(response.getContentText());

  if (data && data.data && data.data.length > 0) {
    Utilities.sleep(500);//so website don't break
    return data.data[0].japanese[0].reading;
  } else {
    return null;
  }
}

function convertText(text) {
  var theText = convertToKanaWithReadings(text);
  var newText = convertToKana(theText);
  return newText
}

function promptForRomajiEntireColumnG() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnG = sheet.getRange('G:G').getValues();
  var translatedRows = 0;

    for (var i = 0; i < columnA.length; i++) {
    if (columnA[i][0] !== '' && columnG[i][0] === '') {
      var textToTranslate = columnA[i][0];
      sheet.getRange(i + 1, 7).setValue(convertText(textToTranslate));
      translatedRows++;
    }
  }

  if (translatedRows > 0) {
    var message = "Romaji Converted " + translatedRows + " rows in Column G.";
    SpreadsheetApp.getUi().alert(message);
  } else {
    SpreadsheetApp.getUi().alert("No rows were Converted to Romaji in Column G.");
  }
}

function romajiColumnGWithStartAndStopRow(startRow, stopRow) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var columnG = sheet.getRange('G:G').getValues();
  var translatedRows = 0;

  for (var i = startRow - 1; i < columnA.length && i < stopRow; i++) {
    if (columnA[i][0] !== '' && columnG[i][0] === '') {
      var textToTranslate = columnA[i][0];
      sheet.getRange(i + 1, 7).setValue(convertText(textToTranslate));
      translatedRows++;
    }
  }

  if (translatedRows > 0) {
    var message = "Romaji Converted " + translatedRows + " rows in Column G.";
    SpreadsheetApp.getUi().alert(message);
  } else {
    SpreadsheetApp.getUi().alert("No rows were Converted to Romaji in Column G.");
  }
}

function romajiColumnG(rowNumber) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var columnA = sheet.getRange('A:A').getValues();
  var i = rowNumber - 1; // Convert rowNumber to array index (0-based)

  if (i >= 0 && i < columnA.length) {
    var textToTranslate = columnA[i][0];
    if (textToTranslate !== '') {
      sheet.getRange(i + 1, 7).setValue(convertText(textToTranslate));
      SpreadsheetApp.getUi().alert("Romaji in Column G for row " + rowNumber + ".");
    } else {
      SpreadsheetApp.getUi().alert("Column A is empty for row " + rowNumber + ".");
    }
  } else {
    SpreadsheetApp.getUi().alert("Invalid row number. Please enter a valid row number.");
  }
}
