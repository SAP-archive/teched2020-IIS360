# Exercise 2 - Exercise 2 Description

In this exercise, we will consume an S/4 HANA service from SAP API Hub and integrate it into the Fiori elements app.

## Exercise 2.1 Sub Exercise 1 Description

After completing these steps you will have created...

1. Click here.
<br>![](/exercises/ex2/images/02_01_0010.png)

2.	Insert this line of code in schema.cds.
```js
 using { API_BUSINESS_PARTNER as external } from '../srv/external/API_BUSINESS_PARTNER.csn';

```

2. insert
   ```js
    entity BusinessPartner         as projection on external.A_BusinessPartner {
        key BusinessPartner
    };
    entity BusinessPartnerAddress  as projection on external.A_BusinessPartnerAddress {
        key BusinessPartner, key AddressID, CityName, Country, PostalCode, FullName, StreetName, HouseNumber
    }
    ```
    
3. insert
   ,
    {
        $Type  : 'UI.DataFieldForAnnotation',
        Target : 'assignedIndividual/@Communication.Contact',
        Label  : '{i18n>AssignedContact}'
    }
4. uncomment properties in schema.cds Individuals entity
5. Insert lines of code in schema.cds
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
