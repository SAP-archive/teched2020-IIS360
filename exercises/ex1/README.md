# Exercise 1 - Generating an SAP Fiori Elements App

In this exercise, you will create a SAP Fiori elements application of type List Report Object Page, based on the given
SAP Cloud Application Programming Model sample service.
For this you will make usage of the SAP Fiori tools Application Generator.

## Exercise 1.1 Using the SAP Fiori tools Application Generator

(1) In SAP Business Application Studio, invoke the Command Palette\
(View -\>Find Command... or ctrl+shift+p(Win)/cmd+shift+p(Mac))\
and type **yeoman** in the search field.\
Choose ![](./images/image2.png).

![](./images/image1.png)

(2) Click on tile **SAP Fiori elements application**.\
(3) Click ![](./images/image4.png).

![](./images/image3.png)

(4) In the template selection, click on the tile  **List Report Object Page**.

(5) Click ![](./images/image6.png).

![](./images/image5.png)

(6) In the step **Datasource and Service Selection**, select ![](./images/image8.png).

![](./images/image7.png)

(7) Click the **Browse for folder** icon to select your projects folder.

![](./images/image9.png)

(8) Open the folder hierarchy path **home-\>user-\>projects**.

Click ![](./images/image11.png).

(9) Click ![](./images/image12.png).

![](./images/image10.png)

(10) In the OData service drop down, select ![](./images/image14.png)

(11) Click ![](./images/image6.png).

![](./images/image13.png)

(12) In the Entity Selection drop down, select **Incidents** as main entity.\
The properties of this entity will be used for display of data on List
Report, showing data from the entity collection.\
Leave value for drop down **Navigation Entity** to **None** since you want to show
data of a single instance of the main entity on the object page, too.

![](./images/image15.png)

(13) Click ![](./images/image6.png).

Finally add some attributes to the application project.\
The **Module name** and the **Application namespace** should be as shown below to keep aligned with the following exercises.\
(14) Enter as module name **incidents** (module name has to match exactly for
some of the subsequent exercises to work properly)

(15) Choose an App Title, for example **My Incidents**

(16) Enter as namespace **sap.fe.demo** (namespace has to match exactly for
some of the subsequent exercises to work properly)

![](./images/image17.png)

(17) Select **Yes** in order to configure advanced options.\
In drop down **UI5 version**, select **1.84.1**.
Please note: don't choose **Latest** as UI5 version since it might still point to a version below 1.84 during TechEd2020.

(18) Select **Yes** in order to skip generation of an
additional associated annotation.cds file.\
The sample service already provides a basic set of UI annotations in a
corresponding file in app-\>annotation.cds.

![](./images/image18.png)

(19) Click ![](./images/image21.png).

This will start the app generation.\
When done, a dialog appears asking for opening the app in a new workspace.\
Close the dialog by clicking the cross icon in the top right corner since the workspace root should not be switched to the newly created app folder inside the sample service project.

![close new ws](../ex1/images/image181.png)

You can review the generated artifacts in the Explorer View of SAP Business Application Studio.

![](./images/image29.png)

## Exercise 1.2 Starting the App

After completing these steps you will have started and tested the generated app.

(20) Switch to the service preview browser tab and refresh it.\
Click on the served path.\
If your preview browser tab had been closed, you can relaunch it by following the steps 'Reopening the exposed ports' as described [here](../ex0#reopening-the-exposed-port).


![](./images/image22.png)

(21) Click on app tile **My Incidents .**

![](./images/image24.png)

(22) Click ![](./images/image26.png) to trigger selection.\
You can use the selection fields in order to set a filter. If collapsed, you can expand the selection field area by clicking the small chevron icon on top.

![](./images/image25.png)

(23) Click on a list item to navigate to the object page.

![](./images/image27.png)


On the object page, you can click **Edit** which creates a draft version of the displayed object and sets the UI to edit mode.

![](./images/image28.png)

Changing input field values will automatically update the draft when input field focus is changed, or when you navigate back to the list report.\
The draft is saved back to the active instance by pressing **Save** on the bottom of the object page.

![](./images/image28a.png)

For instances in edit mode, the List Report shows a draft indicator in the corresponding line item.\
You can create a new draft on the List Report by clicking button **Create**.

![](./images/image27a.png)




## Summary

You've now successfully generated and tested the Fiori elements app.

Continue to - [Exercise 2 - Switch to Flexible Column Layout](../ex2/README.md)