# Getting Started - Setting up your development environment

Welcome to the workshop 'Creating Simple Fiori elements apps with OData V4'.
<br>This workshop will guide you step-by-step through the process of creating a Fiori elements floorplans for OData V4 app.
<br>Based on a CAP OData service equipped with basic UI annotations, you will learn how to generate and enhance a List Report/Object Page Fiori elements application with the help of Fiori Tools and CDS annotation modelling.<br>

## Access SAP Business Application Studio (TechEd 2020 live workshop registered participants only)

Log on the SAP Business Application Studio via [this link](https://sap-ux-teched.cry10cf.int.applicationstudio.cloud.sap/index.html) by using the provided live workshop credentials.<br>You can continue with step 'Create Dev Space'.<br>

## Set up Business Application Studio in an SAP Cloud Platform Trial Account

If you don't have an SAP Cloud Platform account already, you can create your own [here](https://www.sap.com/products/cloud-platform/get-started.html).<br>

### New Trial Users

After having registered your new user, start your trial via [this link](https://account.hanatrial.ondemand.com/register)
<br>At first time log in, you'll be asked to select your preferred region.
<br>This will start the set up of your account.<br>
<br>![Trial Setup](../ex0/images/00_00_0010.png)<br>
<br>Your subaccount, org and space is created automatically, along with the necessary role configurations and subscriptions.
<br>When done, the subaccount overview page is shown.<br>

### Existing Trial Users

In your subaccount, choose 'Subscriptions' in the left-hand navigation.
<br>Choose 'SAP Business Application Studio' in the list of available subscriptions.
<br>Choose 'Subscribe'.
<br>Navigate back to your subaccount overview page.

### Access SAP Business Application Studio

Click on the Quick Tool Access icon **SAP Business Application Studio**.<br>
<br>![Welcome SCP Trial](../ex0/images/00_00_0020.png)<br>

## Create Dev Space

<br>Click on button **Create Dev Space**.<br>
<br>![Create Dev Space](../ex0/images/00_00_0030.png)<br>

<br>Enter a name for your dev space and select profile **SAP Fiori**.<br>
<br>![Select Profile](../ex0/images/00_00_0040.png)<br>

<br>In the lower right corner of the page press button **Create Dev Space**.<br>
<br>![confirm](../ex0/images/00_00_0050.png)<br>

<br>Once your dev space has status running, click on the development space name to open it.<br>
<br>![enter dev space](../ex0/images/00_00_0060.png)<br>

## Get the sample scenario

<br>Access the Github Repository via [this link](https://github.com/SAP-samples/teched2020-IIS360)
<br>Click on button **Code** (1), then click on icon (2) to copy the git clone link<br>

![copy link](../ex0/images/00_00_0070.png)

<br>(3) Open a new terminal via the header menu.
<br>![new terminal](../ex0/images/00_00_0080.png)<br>
<br> In the terminal window, type the following commands and confirm with return:
<br>- cd projects
<br>- git clone https://github.com/SAP-samples/teched2020-IIS360.git (you can paste the copied link here)
<br>- cd teched2020-IIS360
<br>- npm install (this installs all node modules as defined in the projects package.json)
<br>- cds w (this compiles the service and runs it in watch mode)<br>
<br>(4) Click button **Expose and Open** on the appearing dialog<br>

![expose button](../ex0/images/00_00_0110.png)

<br>You can now provide an alias for the exposed port.
<br>(5)Enter 'preview' in the input field. Confirm with 'Enter'.

![SAP Business Application Studio - Google Chrome](../ex0/images/00_00_0120.png)

<br>A browser is opened. Click the $metadata link (6)

![metadata](../ex0/images/00_00_0130.png)<br>

## Reopen the exposed port

If you closed the preview browser tab, you can reopen it by applying the following steps.

(7) Click **View -> Find Command...**.

![SAP Business Application Studio - Google Chrome](images/img_039.png)

(8) Enter **port** in the dialogs input field to filter the available commands.

![SAP Business Application Studio - Google Chrome](images/img_039a.png)<br>

(9) Select ![](images/fieldicon03.png) .

![SAP Business Application Studio - Google Chrome](images/img_040.png)<br>

(10) A list with exposed ports is shown. Selecting one opens up a new browser tab.

![SAP Business Application Studio - Google Chrome](images/img_041.png)<br>

## Summary

With the setup procedure done, you now have completed:
<br>- setting up the SAP Cloud Platform trial account
<br>- Access to SAP Business Application Studio (SBAS)
<br>- Creation of your dev space
<br>- Setting up the sample OData V4 service in SBAS<br>
<br>Continue to - [Exercise 1 - Generation of the Fiori elements app](../ex1/README.md)
