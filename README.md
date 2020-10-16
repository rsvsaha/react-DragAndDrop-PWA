# react-DragAndDrop-PWA
This is a repository for building PWA Apps using Drag and Drop Style Programming. The App is hosted at https://drag-and-drop-pwa-builder.herokuapp.com/. The App can be used for generating designs which can adjust to any screen size by keeping the ratio same and for creating very simple business logics using the logic builder which uses a drag and drop style programming.

# Home
This page takes the appName as input. If the App with the same name already exists, it opens the app , else it creates a new app. Then it takes us to the Designer Page.

# Designer
This can be used to generate the UI layout of the App.The Designer Area has a dimension of 1024 px x 576 px. All UI elements are draggable in this area and can be moved and resized by dragging. The UI placement is based on a coordinate system where the top left is (0,0) and bottom right is (1024,576).For any other dimension, the UI elements are placed and resized as per the ratio of the new dimension. For Example an UI element placed at (100,50) and having a width of 200px and height of 100px in the 1024x576 dimension will be resized as follows in a screen of 1920 x 1080 pixel dimension.

X Coordinate = (1920/1024) x 100 =  187.5 px

Y Coordinate = (1080/576) x 50 = 93.75 px

Width = (1920/1024) x 200 = 375 px

Height = (1080/576) x 100 = 187.5 px

All UI elements has 4 Positional Properties which determines the X,Y coordinates and the width and height.

Property | Input Type | Description
-------- | ---------- | -------
X | Number | Number of Pixels from the left of the screen where the element will be placed
Y | Number | Number of Pixels from the top of the screen where the element will be placed
Width | Number | Number of Pixels of element Width
Height | Number | Number of Pixels of element Height

### Button Component
This is a clickable button element which can perform some logical actions when clicked.

Property | Input Type | Description
-------- | ---------- | -------
textValue | String |The Text inside the Button Component
backgroundColor | Hexadecimal Color Code | The color of the Button Component
clickEvent | WorkFlow Name | The WorkFlow which will be executed on click event of the Button Component

### Text Component
This is a Text message element which can be used as labels or static text areas.

Property | Input Type | Description
-------- | ---------- | -------
textValue | String |The Text inside the Text Component 
backgroundColor | Hexadecimal Color Code | The background color of the Text Component

### TextInput Component
This is a Text input element which can be used as a standard text input.

Property | Input Type | Description
-------- | ---------- | -------
fieldVariable | Variable Name |The variable in which the TextInput Component will store it's value on change

### Image Component
This is a Image element which can be used as static Image.

Property | Input Type | Description
-------- | ---------- | -------
imgSrcValue | String URL |The URL of the Image Component  
backgroundColor | Hexadecimal Color Code | The background color of the Image Component

### Link Component
This is a anchor tag element which can be used as hyperlinks.

Property | Input Type | Description
-------- | ---------- | -------
linkText | String |The Text inside the Link Component 
backgroundColor | Hexadecimal Color Code | The background color of the Link Component
linkUrl | String URL | The URL of the Link Component

### Message Box Component
This is a dynamic text output element which can be used as a standard text output or message box.

Property | Input Type | Description
-------- | ---------- | -------
messageVariable | Variable Name | The variable from which the message box output value will be taken
backgroundColor | Hexadecimal Color Code | The background color of the Message Box Component

Apart from these components there are 5 buttons in the designer page. The purpose of those buttons are described as under.

Button Name| Function
-------- | -------
PREVIEW | Opens the App in preview mode. The preview mode works exactly like the App. But it is a bit slower as there is no Service Worker.
LOGIC | Opens the Logic Designer.
SAVE APP DESIGN | Saves the UI Layout of the App.
GET APP BASE | Downloads the basic app bundle in which the App Config needs to be replaced.
GET YOUR APP CONFIGS | Donwnloads the App Configs which needs to be replaced in the App Base for running the App.

# Logic
The Logic Designer can be used to create workflows which would be executed during the run time of the app. The Workflows are a sequence of steps which needs to be performed during it's execution. The App Life Cycle consists of 2 types of workflows.

### appInit
This is the first and the basic workflow which is executed at the beginning of the app run time. All the variables that are used in the app must be declared in this appInit workflow. The appInit workflow is a must for running the application.

### Other Event Workflows
These are other named workflows which are created for event handling like clicking of a button. These are workflows must be saved with a unique name and the unique name of the workflow must be used in the WorkFlow fields in the designer. Note: The appInit workflow should not be over written by event workflows.

There are different programming blocks available which can be dragged and dropped into the design area and they are executed sequentially during execution.
## Blocks for Programming

### BasicFunctions
- createVariable: This is used to declare variables. (Variables cannot be used before declaration)
- assignFunction: This is used to assign values to a variable.
- assignToVariableFunction: This is used to assign one variable to another.
- printFunction: Prints the variable value in the window console. (Can be used for debugging)

### LogicBlocks
- executionBlock: NOT YET READY. DEVELOPMENT IN PROGRESS. 
- ifElseBlock: This is used for creating a conditional if else statement. It has 3 parts. The condition part is where it takes a logical function and evaluates the function to get a boolean output. Based on the expression evaluation, it will execute the if or else block. The if or else blocks can embed other series of logical steps which would be executed.

### LogicalFunctions
- greaterThan: Evaluates greater than between two variables.
- lessThan: Evaluates less than between two variables.
- greaterThanEqual: Evaluates greater than equal between two variables.
- lessThanEqual: Evaluates less than equal between two variables.
- equalTo: Evaluates equal to between two variables.

### LoopBlocks
- forLoop: Executes a for loop from the start variable to the stop variable. In the loop body, it embeds a series of logical steps which would be executed.

### MathBlocks
- evaluateMath: Takes a math expression in string format from a variable, evaluates the expression and assigns the output to a variable.

The function of WorkFlow related Buttons and Fields.
Element | Type | Description
-------- | ------ | ----------
WorkFlowName | Text Input | The Name of the workflow which is currently being created or modified.
EXECUTE | Button | Executes the workFlow.
SAVE WORKFLOW | Button | Saves the workFlow with the workFlow name as WorkFlowName.json .
OPEN WORKFLOW | Button | Opens the workFlow of the WorkFlowName. (The WorkFlow must exist else it will throw an error).

# Preview
The preview page contains the preview of the app but without the service worker. So the app execution would depend on the network speed. [NEEDS TO BE IMPROVED]

# Publishing Steps
1. After the App designing and logical designing is done. Test it in preview.
2. Click on *** GET APP BASE *** . It will download a zip file. The zip file contains a folder called servable-app. 
3. The servable-app is a node.js app which can be hosted easily. It has the following file Structure
    - Server.js - An Express JS Server used for serving the app.
    - package.json - For Express JS Server Dependencies
    - .gitignore
    - package-lock.json
    - *** build *** folder. This build folder contains a compiled react app. It requires the design, workflow files and the service worker file for it's exection.
4. Click on *** GET YOUR APP CONFIGS *** . It will contain a zip file containing the following file structure.
  - *** designs *** folder. This contains a file called *** AppDesign.json *** . This file contains the UI elements configuration which is generated during run time.
  - *** workFlows *** folder. This contains the workFlows in a json format. Thi folder will contain an appInit.json and all the other workflows.
  - *** sw.js *** file. This file contains the service worker for the app.

5. Copy the folders and files of step4 in the build directory of step 3. The app is ready to be served. You can copy the build directory and serve it using other servers like tomcat,iis,apache etc.

6. If you need to change the icon of the App and the Name of the change the title tag in index.js and change the favicon. For the pwa experience change the name of the app in manifest.json . 
- short_name : It is the name with which the app would be added to home screen.
- name: It is the name of the app which would be shown on splash screen.
- icons: This is the icon of the app that would be shown on the splash screen.

For better understanding of PWA please refer to PWA documentation at
 - https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps 
 - https://developers.google.com/web/ilt/pwa

You can find a pre built app by the name of MathEvaluate in the hosted application. The MathEvaluate App is hosted at https://drag-drop-pwa-demo.herokuapp.com/.

This repository would be in active development and I would release updates periodically. If any one wants to collaborate please connect with me.

# Happy Coding



