# A Blockchain-based Traceability System for the Dairy Industry

## Introduction
This repository contains the source code for a dairy supply chain application that utilizes blockchain technology. The application allows stakeholders to participate in a transparent and secure supply chain network that involves the tracking of milk.

## Technology Stack
The back-end of this application is developed using Solidity and MongoDB, while the front-end is developed using Next.js. The contract development environment used is Hardhat and the default network is Ganache.


**Technology Stack**
The back-end of this application is developed using Solidity and MongoDB, while the front-end is developed using Next.js. The contract development environment used is Hardhat and the default network is Ganache.


**Installation**
1. Clone the repository to your local machine using 
    `git clone https://github.com/thopatevijay/dairy-dapp.git`
3. Navigate to the cloned repository using `cd dairy-dapp`
4. Install the required dependencies using `npm install`
5. Make sure you have the correct .env file. Use the following environment variables:

>.env

    MONGO_URL = 'mongodb+srv://vijay:vijay@cluster0.puqncor.mongodb.net/?retryWrites=true&w=majority'
    PRIVATE_KEY = ''


**Login Credentials**
The application has several stakeholders, including farmers, milk collectors, milk processors, distributors, and retailers. Farmers do not need to log in to use the application. Pre-created accounts have been provided for the remaining stakeholders.

Use the following credentials to log in to the application:

Milk Collector :
1. Username: `mk1`, Password: `mk1`
2. Username: `milkcollector` , Password: `mk2`.

Milk Processor :
1. Username: `milkprocessor`, Password: `mp1`

Distributor
1. Username: `distributor`, Password: `dt2`

Retailer:
1. Username: `retailer`, Password: `rt2`


----------------------------------------------------------



**Execution flow of the dApp**

**1. Milk Collector login:**

    a. Access the milk collector login page.
    b. Enter the login credentials to access the milk collector dashboard.
    c. Click on the `Add Farmer` tab to add farmers to the system.
    d. Fill the form and click on the `Add farmer` button to add a new farmer.
    e. Click on the `Milk Collection` tab to collect milk from farmers.
    f. Fill the milk collection form with the farmer name, milk quality, and quantity.
    g. Click on the `Collect Milk` button to submit the milk collection form.
    h. The collected milk will be rendered below the form.
    i. Click on the `Create Batch` button to create a new batch.
    j. The created batch will be visible in the `Batches` tab.
    k. Logout from the milk collector dashboard. 

**2. Milk Processor login:**

    a. Access the milk processor login page.
    b. Enter the login credentials to access the milk processor dashboard.
    c. Click on the `Batches` tab to view the batches sent by milk collectors.
    d. Review the batch details, such as quality and quantity of milk.
    e. Accept or reject the batch based on the quality and quantity of milk.
    f. If accepted, click on the `Create Batch` button to send the batch to processing.
    g. The batch will have an `in-processing` status in the `Production` tab.
    h. Click on the `See history` button to view the entire history of each batch.
    i. Perform the following actions on the batch:
         i. Send To Production
         ii. Mark Production Done
         iii. Send To Distributor
    j. Click on the `See product codes` button to view the product codes in the batches.
    k. Scan the QR code of any product to view the product history.


**3. Distributor login:**


    a. Access the distributor login page.
    b. Enter the login credentials to access the distributor dashboard.
    c. Click on the `Accept Batch` button to accept the milk batch sent by the milk processor.
    d. Click on the `Send To Retailer` button to send the batch to the retailer.
    e. Click on the `See history` button to view the entire history of the milk batch.
   
   
   


**4. Retailer login:**



    a. Access the retailer login page.
    b. Enter the login credentials to access the retailer dashboard.
    c. Click on the `Accept Batch` button to accept the milk batch sent by the distributor.




