# react-DragAndDrop-PWA
This is a repository for building PWA Apps using Drag and Drop Style Programming. The App is hosted at https://drag-and-drop-pwa-builder.herokuapp.com/. The App can be used for generating designs which can adjust to any screen size by keeping the ratio same and for creating very simple business logics using the logic builder which uses a drag and drop style programming.

# Designer
This can be used to generate the UI layout of the App.The Designer Area has a dimension of 1024 px x 576 px. All UI elements are draggable in this area and can be moved and resized by dragging. The UI placement is based on a coordinate system where the top left is (0,0) and bottom right is (1024,576).For any other dimension, the UI elements are placed and resized as per the ratio of the new dimension. For Example an UI element placed at (100,50) and having a width of 200px and height of 100px in the 1024x576 dimension will be resized as follows in a screen of 1920 x 1080 pixel dimension.

X Coordinate = (1920/1024) x 100 =  187.5 px

Y Coordinate = (1080/576) x 50 = 93.75 px

Width = (1920/1024) x 200 = 375 px

Height = (1080/576) x 100 = 187.5 px

All UI elements has 4 Positional Properties which determines the X,Y coordinates and the width and height.

Property | Input Type | Meaning
-------- | ---------- | -------
X | Number | Number of Pixels from the left of the screen where the element will be placed
Y | Number | Number of Pixels from the top of the screen where the element will be placed
Width | Number | Number of Pixels of element Width
Height | Number | Number of Pixels of element Height

### Button Component
This is a clickable button element which can perform some logical actions when clicked.

Property | Input Type | Meaning
-------- | ---------- | -------
textValue | String |The Text inside the Button Component
backgroundColor | Hexadecimal Color Code | The color of the Button Component
clickEvent | WorkFlow Name | The WorkFlow which will be executed on click event of the Button Component

### Text Component
This is a Text message element which can be used as labels or static text areas.

Property | Input Type | Meaning
-------- | ---------- | -------
textValue | String |The Text inside the Text Component 
backgroundColor | Hexadecimal Color Code | The background color of the Text Component

### TextInput Component
This is a Text input element which can be used as a standard text input.

Property | Input Type | Meaning
-------- | ---------- | -------
fieldVariable | Variable Name |The variable in which the TextInput Component will store it's value on change

### Image Component
This is a Image element which can be used as static Image.

Property | Input Type | Meaning
-------- | ---------- | -------
imgSrcValue | String URL |The URL of the Image Component  
backgroundColor | Hexadecimal Color Code | The background color of the Image Component

### Link Component
This is a anchor tag element which can be used as hyperlinks.

Property | Input Type | Meaning
-------- | ---------- | -------
linkText | String |The Text inside the Link Component 
backgroundColor | Hexadecimal Color Code | The background color of the Link Component
linkUrl | String URL | The URL of the Link Component





