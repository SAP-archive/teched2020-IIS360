# Exercise 7 - Adding a contact card showing data from SAP S/4 HANA

In this exercise, you extend your CAP service with the consumption of an external Business Partner service.<br>
You get its definition from SAP's SAP API Business Hub.<br>
First, you will work with local data and later on get the data directly from the external SAP S/4HANA system.<br>
The data will be visualized in the object pages header as a contact card.

## Exercise 7.1 Get the Business Partner EDMX file

After completing these steps you will download the Business Partner EDMX specification from SAP API Hub and import it into your CAP service.\
Open the [SAP API Business Hub page](https://api.sap.com/api/API_BUSINESS_PARTNER/resource?tag=Business%20Partner) in your browser.

(1) Choose the **Details** tab\
(2) Click button **Download API Specification** and select ![](./images/image2.png).\
If required, log on.

If you’re using Chrome as a browser, you now see the downloaded file in the footer bar.\
In case you have problems downloading the file, you can also find API_BUSINESS_PARTNER.edmx within project folder app/test-resources/api-hub.

![](./images/image1.png)

## Exercise 7.2 Add the EDMX File and local data to your project

If not already running, start the CAP service with **cds watch**.\
Drag the API_BUSINESS_PARTNER.edmx file from your browser's download area/folder onto your BAS workplace and drop it into the srv folder of  app.\
CAP will automatically create a new folder  **srv/external** and generate a new file API_BUSINESS_PARTNER.csn in it, which is a compact representation of CDS.\
If the folder is not automatically generated, run the following command in your terminal session: **cds import srv/API_BUSINESS_PARTNER.edmx**

In the BAS project explorer, open file **srv/incidentservice.cds**.\
(3) Add the following code in line 2:
```js
using {API_BUSINESS_PARTNER as external} from '../srv/external/API_BUSINESS_PARTNER.csn';
```

In the same file, scroll down to **//Expose additional entities**.\
(4) Enter the following code below:
```js
@readonly
entity BusinessPartner         as projection on external.A_BusinessPartner {
    key BusinessPartner, BusinessPartnerFullName
};
@readonly
entity BusinessPartnerAddress  as projection on external.A_BusinessPartnerAddress {
    key BusinessPartner, key AddressID, CityName, Country, PostalCode, StreetName, HouseNumber
};
```
![](./images/image3.png)

By adding the using statement (3), a new service is exposed with a definition based on the original edmx file. Furthermore, we have extended the Incidents service by adding two entities projecting entities from the Business Partner API (4).\
Since there is no backend connectivity in place yet, you will start with using local data first.

In BAS project explorer, open folder **app/test-resources/api-hub/data.\
Select the two CSV files (5)



![](./images/image4.png)

(5) select csvs, drag and drop to data folder

![](./images/image5.png)

(6) In mock mode, the api-business-partner service is additionally
exposed.

Click on one of the entities to show mock data.

Note that only the fields show data where mock data has been provided
for.

(7) Clicking on the new entities of the Incidents service shows mock
data for the projection only.

![](./images/image6.png)

![](./images/image7.png)

(8) new properties for entity Individual

![](./images/image8.png)

(9) Drag **scp.cloud.Individual.csv **![](./images/image9.png).

(10) Drop on .

![](./images/image10.png)

(11) Click **Yes **![](./images/image11.png).

![](./images/image12.png)

(12) Click **Individual **![](./images/image13.png).

![](./images/image14.png)

(13) additional individual properties

![](./images/image15.png)

(14) Add using statement

![](./images/image16.png)

(15) Add associations to external entities

![](./images/image17.png)

(16) Add contact card annotation

![](./images/image18.png)

(17) Add header field

![](./images/image19.png)

(18) Object Page header shows contact card. Click name.

![](./images/image20.png)

(19) Drag **incidentservice.js **![](./images/image21.png).

(20) Drop on .

![](./images/image22.png)

(21) Click **Yes **![](./images/image23.png).

![](./images/image24.png)

(22) Remove hyphens to enable external API credentials

![](./images/image25.png)

(23) Click **BusinessPartnerAddress.**

![](./images/image26.png)

![](./images/image27.png)

(24) Click **Kirchhög, 99867 Gotha, DE **![](./images/image28.png).





2.	Insert this line of code in schema.cds.
```js
 using { API_BUSINESS_PARTNER as external } from '../srv/external/API_BUSINESS_PARTNER.csn';

```

1. insert
   ```js
    entity BusinessPartner         as projection on external.A_BusinessPartner {
        key BusinessPartner, BusinessPartnerFullname
    };
    entity BusinessPartnerAddress  as projection on external.A_BusinessPartnerAddress {
        key BusinessPartner, key AddressID, CityName, Country, PostalCode, StreetName, HouseNumber
    }
    ```

2. insert
   ,
    {
        $Type  : 'UI.DataFieldForAnnotation',
        Target : 'assignedIndividual/@Communication.Contact',
        Label  : '{i18n>AssignedContact}'
    }
3. uncomment properties in schema.cds Individuals entity
4. Insert lines of code in schema.cds
```js
extend scp.cloud.Individual with {
  businessPartner        : Association to one external.A_BusinessPartner
  on businessPartner.BusinessPartner = businessPartnerID;
  businessPartnerAddress : Association to one external.A_BusinessPartnerAddress
  on  businessPartnerAddress.BusinessPartner = businessPartnerID
  and businessPartnerAddress.AddressID       = addressID;
}
```

4.	Insert this line of code in incidentsservice.cds.
```js
 using { API_BUSINESS_PARTNER as external } from '../srv/external/API_BUSINESS_PARTNER.csn';
extend scp.cloud.Individual with {
  businessPartner        : Association to one external.A_BusinessPartner
  on businessPartner.BusinessPartner = businessPartnerID;
  businessPartnerAddress : Association to one external.A_BusinessPartnerAddress
  on  businessPartnerAddress.BusinessPartner = businessPartnerID
  and businessPartnerAddress.AddressID       = addressID;
    }
```
insert
   ,
    {
        $Type  : 'UI.DataFieldForAnnotation',
        Target : 'assignedIndividual/@Communication.Contact',
        Label  : '{i18n>AssignedContact}'
    }


annotate service.Individual with @(Communication.Contact : {
      fn   : businessPartner.BusinessPartnerFullName,
        adr   : [{
            type     : #work,
            code     : businessPartnerAddress.PostalCode,
            street   : businessPartnerAddress.StreetName,
            building : businessPartnerAddress.HouseNumber,
            country  : businessPartnerAddress.Country,
            locality : businessPartnerAddress.CityName
        }]
})
;

## Exercise 2.2 Sub Exercise 2 Description

After completing these steps you will have...

1.	Enter this code.
```abap
DATA(lt_params) = request->get_form_fields(  ).
READ TABLE lt_params REFERENCE INTO DATA(lr_params) WITH KEY name = 'cmd'.
  IF sy-subrc = 0.
    response->set_status( i_code = 200
                     i_reason = 'Everything is fine').
    RETURN.
  ENDIF.

```

2.	Click here.
<br>![](/exercises/ex2/images/02_02_0010.png)

## Summary

You've now ...

Continue to - [Exercise 3 - Excercise 3 ](../ex3/README.md)
