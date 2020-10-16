# Exercise 3 - Configuring the app

In this exercise, we will configure the apps behaviour by making usage of the Fiori page map tool.

## Exercise 2.1 Data load during start of the app

When starting the app, per default the user has to press the
**Go** button in order to trigger the selection.<br>
This allows to define filters before the query is executed.<br>
The default behaviour can be changed in a way that selection is immediately
triggered when the app is started.

In SAP Business Application Studio, go to the page map. (**Application
Modeller - Show Page Map** via Command Palette).

(1) On tile **List Report**, click **Configure
Page**

![](./images/image1.png).

(2) In the page editor, click
![](./images/image4.png).

![SAP Business Application Studio - Google
Chrome](./images/image3.png)

(3) In the drop down box **initialLoad**, select
![](./images/image6.png).<br> The configuration is automatically saved.

![SAP Business Application Studio - Google
Chrome](./images/image5.png)

Refresh the preview browser, then navigate back to the Fiori launch
page.
Data will now be immediately loaded when starting the app.<br>

## Exercise 2.2 Enable control level variant managment

The List Report pages offers per default page variant managment.<br>
With it, all personalizations of visible selection fields and table columns can be
saved as a presentation variant.<br>
With the page map, you can switch to control level variant managment.
This allows separate managment of filter and table variants on List Report.<br>
(4) In the Page Editor properties for table view, open drop down box **variantManagment** and select **Control**.

![SAP Business Application Studio - Google
Chrome](./images/image7.png)

Refresh the preview browser tab. You now can manage filter (5) and table variants (6) separately.

![](./images/image9.png)

## Exercise 2.3 Configure Editable Object Page Header

When in edit mode, header fields are per default shown as editable
input fields.<br>This might not be wanted in case these fields are
additionally displayed in another section of the object page (7)(8).

![](./images/image10.png)

In order to prevent that, you can set the header to display only during editing.<br>
Switch back to Business Application Studio.<br>
(9) Click ![](./images/image12.png) icon to get back to the page map overview.

![SAP Business Application Studio - Google
Chrome](./images/image11.png)

(10) In the page map overview, on tile **Object Page** click the **Configure
Page** icon![](./images/image14.png)

![SAP Business Application Studio - Google
Chrome](./images/image13.png)

(11) Click ![](./images/image16.png) to display the object page header configuration properties.

![SAP Business Application Studio - Google
Chrome](./images/image15.png)

(12) Open drop down box **editableHeaderContent** and
set to ![](./images/image18.png).

![SAP Business Application Studio - Google
Chrome](./images/image17.png)

(13) Switch back to the preview browser tab.
In the object page, click ![](./images/image20.png)

![](./images/image19.png)

(14) The header area now stays in display mode when in edit mode.

(15) Click ![](./images/image22.png)to switch back to display mode.

![](./images/image21.png)
## Exercise 2.4 Tab based section layout

Per default, all the sections in the object page are displayed one
below the other.

You can configure to have them displayed in separate tabs.

Go back to Business Application Studio.

(16) In the object page editor, click
![](./images/image24.png)

![SAP Business Application Studio - Google
Chrome](./images/image23.png)

(17) In the drop down box for **sectionLayout**, select ![](./images/image26.png)

![SAP Business Application Studio - Google
Chrome](./images/image25.png)

(18) Refresh the app preview browser tab. Each object page section is
now displayed in a separate tab.

![](./images/image27.png)


## Summary

By using the page map, you've now configured initial load during app start, editable header content, control level variant managment and tab based section layout.

Continue to - [Exercise 4 - Adding a Custom Page ](../ex4/README.md)
