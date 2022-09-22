import * as vscode from "vscode";
import { WeatherService } from "./WeatherService";

let weatherStatusBarItem: vscode.StatusBarItem;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  const weatherService = new WeatherService();
  //console.log("Weather: extension loaded correctly");

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let getWeather = vscode.commands.registerCommand("weather.getWeather", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Weather extension by G3Be");
    vscode.window
      .showInputBox({ value: "Enter the city to get the weather for..." })
      .then(async (city) => {
        //console.log(city);
        const weather = await weatherService.getWeather(city);
        if (!weatherStatusBarItem) {
          weatherStatusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
          );
        }
        weatherStatusBarItem.text =
          weather.city + " " + weather.temperature + " " + weather.description;
        weatherStatusBarItem.show();
      });
  });

  let getWeatherExtended = vscode.commands.registerCommand(
    "weather.getWeatherExtended",
    () => {
      vscode.window.showInformationMessage("Weather extension by G3Be");
      vscode.window
        .showInputBox({ value: "Enter the city to get the weather for..." })
        .then(async (city) => {
          //console.log(city);
          const extendedWeather = await weatherService.getWeatherExtended(city);
          vscode.window.showInformationMessage(JSON.stringify(extendedWeather));
          //console.log(extendedWeather);
        });
    }
  );

  context.subscriptions.push(getWeather, getWeatherExtended);
}

// this method is called when your extension is deactivated
export function deactivate() {}
