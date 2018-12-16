# Java-script-Categories-Sets

## Prerequisites:

* Node.js
* Node Package Manager
* Git

## Instructions on how to run the Code Assignment.

1. git clone the repository using the command below:

```
git clone -b master https://github.com/FranciscoGarita/Java-script-Categories-Sets.git
```

2. Get into the respective folder

```
cd Java-script-Categories-Sets\categoriesProj
```

3. Once downloaded, go to the respective folder, open a command line and type command below:

```
npm install
```

4. After npm packages are successfully installed, please run the following command to start up the http server and run the application.

```
npm start
```

5. Navigate to the following URL in order to see the application running:

```
http://localhost:4200/
```

6. Tests can be run with command below:

```
ng test
```

# Functions

## ngOnInit:
This function was made to set values to the global variables when the app is just being started, also it initialize the allowed categories from the environment file (settings file)

## onReset:
This function was made to be triggered once the user clicks on the "Reset" button, so the global variables will reset their value. It is also executed by the ngOnInit 

## onProcess:
This function was made to be triggered once the user clicks on the "Process" button, it if the input text is not a valid JSON then it will show an error message in the Output text area and the exception details will be shown in the browser´s console

## filteringCategories:
This function was made to remove the ilegal categories and also to remove the repeated entries for legal categories

## formatOutput:
This function was made to create the output message in the "Result" text area

## formatOccurrences:
This function was made to count the occurrences and also to order them from the highest occurrences to the lowest occurrences

## formattingInputTxt:
This function was made to create an easier JSON text to be handled as object for the input text

## formattingCounterObj:
This function was made to create an easier JSON text to be handled as object for the occurrences

## formattingOccurrencesTxt:
This function was made to create the string for the categories and their occurrences in the output text

## calculateEmptySpaces:
This function was made to calculate the amount of empty spaces so the "COUNT" column will start at the same point for each of the rows 

## disableProcessBtn:
This function was made to make sure that there is some string to be processed

# Environment File
In this file you will be able to add/remove categories (they must be separated by a single space) 