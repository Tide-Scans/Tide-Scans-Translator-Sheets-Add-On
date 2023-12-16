# Tide Scans Translator Google Sheets Add-On

The Tide Scans Translator Add-On for Google Sheets allows you to easily translate and define Japanese text using various translation services and APIs. This add-on provides a user-friendly interface within Google Sheets to perform translations, fetch word information, and generate prompts for language learning.

## Features

- Translate Japanese text to English using DeepL or the Google Translate API.
- Fetch definitions and information from Jisho for Japanese words and phrases.
- Generate prompts for language learning using ChatGPT.
- Customize translation range by specifying start and stop rows.
- Remove spaces in Column A for proper input handling.
- Concatenate and output translation results for ChatGPT prompts in Column F.
- Generate ChatGPT prompts in Column F.
- Transliteration of Japanese to Romaji

## Installation

To use the Tide Scans Translator Add-On, follow these steps:

1. Open your Google Sheets document.

2. Click on "Extensions" in the top menu, then select "Apps Script".

3. In the Apps Script editor, paste the provided code from the "Tide Scans Translator.js" file.

4. While still in the Apps Script editor, add a new script file by clicking the plus button next to files. Choose "Script file" from the menu, and then name the script file with any name you prefer.

5. After creating the new script file, paste the provided code from the "Japanese to Romaji file.js" file into the newly created script file.

6. Save the script by clicking the floppy disk icon or pressing `Ctrl + S` (`Cmd + S` on Mac).

7. **Run** the 'onOpen' function by simply clicking the 'Run' button on the toolbar of the Apps Script editor.

8. You should now see a new menu item named "Tide Scans Translator" in your Google Sheets toolbar. This menu provides various translation and information fetching options.

## Usage

1. Click on the "Tide Scans Translator" menu to access various translation and information fetching options.

2. Choose the desired translation, information fetching, or prompt generation method based on your needs.

3. Follow the on-screen prompts to provide necessary input, such as API keys, row numbers, etc.

4. The Add-On will automatically perform translations, fetch information, or generate prompts and populate the specified columns with the results.

5. To remove spaces in Column A, select "Remove Spaces in Column A" from the "Tide Scans Translator" menu.

6. To concatenate and output translation results, select "Concatenate and Output" from the "Tide Scans Translator" menu.

7. To generate ChatGPT prompts, select "Generate ChatGPT Prompt" from the "Tide Scans Translator" menu. Prompts will be generated in Column F.

8. To Convert Japanese text into Romaji, select "Japanese to Romaji" from the "Tide Scans Translator" menu. Text will be converted in Column G.

## Additional Functionality

Upon installation, the following additional functionality is automatically added to your Google Sheets:

### Add-On Initialization

- The "Tide Scans Translator" menu is created in your Google Sheets toolbar upon initialization.

- The "Tide Scans Translator" menu provides easy access to translation and information fetching options.

### Custom Menu Items

- **DeepL Translation** submenu: Provides options to translate selected rows using DeepL.

- **Google Translate** submenu: Provides options to translate selected rows using Google Translate.

- **Jisho Word Information** submenu: Provides options to fetch word information using Jisho.

- **Prompt Generation** submenu: Provides options to generate prompts for language learning using ChatGPT.

- **Japanese to Romaji** submenu: Provides options to Convert Japanese to Romaji using a hardcode dictionary and Jisho.

- **Remove Spaces in Column A**: Removes spaces in Column A for proper input handling.

- **Concatenate and Output**: Concatenates and outputs translation results for a better overview.

- **Generate ChatGPT Prompt**: Generates ChatGPT prompts in Column F.

## Important Notes

- For using the DeepL translation service, you need to provide your DeepL API Key. The Add-On will guide you through the process of entering the API Key.

- The Add-On provides options to translate specific rows or the entire column based on your selection.

- For fetching information from Jisho dictionary, the Add-On uses the Jisho API to retrieve data.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

This Google Sheets Add-On is developed by Tide Scans.

## Contact

For questions, support, or feedback, you can join our [Discord community](https://discord.gg/ugFG4yuqdG).

Feel free to reach out to us on Discord if you have any inquiries or if you'd like to connect with fellow users of the Tide Scans Translator Add-On.

Feel free to ask about anything related to the add-on, its usage, or any issues you encounter. We're here to help!

---

**Note:** The Tide Scans Translator Add-On is not officially affiliated with DeepL, Google Translate, or Jisho. Use of their services is subject to their respective terms and conditions.
