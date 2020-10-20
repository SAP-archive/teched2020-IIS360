# Exercise 4 - Adding a Custom Page

In this exercise, we will add a custom page to the app.

## Exercise 4.1 Copy over sample custom page

With the Sap Fiori Tool **Page Map**, you can add additional object pages and custom pages to your app.<br>
For custom pages, you have the option of having new custom view controller artifacts generated,<br>
or, as we will do in this exercise, integrate an existing custom view in the navigation flow.<br>
For this, we will copy the sample artifacts to the apps webapp folder.

(1) In the project explorer, expand folder paths **app/incidents** and **app/test-resources**.<br>
In folder **app/test-resources**, click and hold folder ![](./images/image2.png).

(2) Drag & Drop the folder over to **app/incidents/webapp**.<br>
Alternatively, you can use the context menu for copy and paste of the folder.

![](./images/image1.png)

## Exercise 4.2 Add Custom Page via Page Map

Open the page map (via Context Menu on folder **app** or via **View -> Command Palette...**)<br>
(3) Click on icon **Add New Page**.
![](./images/image4.png)

(4) Open the dropdown list **Select Page Type**.

(5) Select entry ![](./images/image9.png).
![](./images/image8.png)

(6) We want to navigate to the custom page from table **Incident Flow** shown on the object page.<br>
 Open the dropdown list **Navigation** to select the corresponding navigation property.
![](./images/image10.png)

(7) Select entry ![](./images/image13.png).
![](./images/image12.png)

(8) As we want to use the prepared sample custom view, select radio button **Use Existing View**.
![](./images/image14.png)

(9) In dropdown **View Name**, the custom view **ProcessFlow** is automatically preselected.
![](./images/image16.png)

(10) Click button ![](./images/image19.png).
![](./images/image18.png)

(11) A success message toast ![](./images/image21.png) is shown.<br>
(12) The page map now shows an additional page node below the object
page.
![](./images/image20.png)

## Exercise 4.3 Custom Page: Testing the app

(13) Switch to the preview browser tab and refresh.<br>
Click on a list item in table **Incident Process FLow**.
![](./images/image22.png)

(14) The custom page is opened to the right.<br>
To expand the view, click on  icon **Expand the last column** ![](./images/image24.png).
![](./images/image23.png)

The right page column is expanded. <br>
(15) The custom page title shows the process step title from the selected item of table Incident Process Flow via context model binding.<br>
(16) As the object page, the custom page offers the expand/collapse buttons for the flexible column layout.
![](./images/image25.png)

## Summary

You've now successfully added a custom page by using the Page Map.

Continue to - [Exercise 5 - Adding a Custom Section ](../ex5/README.md)
