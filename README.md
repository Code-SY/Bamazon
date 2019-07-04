### BAMAZON: Customer View
Bamazon is an interactive shopping application.
Behaned scine : 
To get Bamazon running, you'll need to clone the repo, install dependencies, and set up database.
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
From customer site:
1. To begin the program with the customer view, type node bamazonC.js into the console. When customer "walk in" into store he will see :
        Connection successful!
        Welcome to BAMAZON!
Then customer will see items in table:
   * number of product;
   * name of product;
   * department;
   * price;
   * how much of the product is available in store.
   ![step1](/images/image1.png)
2. App will ask customer : 
"? Enter the ID of the product you would like to purchase: _ _"
   ** Customer can choose 1 from 10 prodacts( avaleble in store for example)
 App will ask customer: 
"? You chose 'PRODUCT NAME'. Is this correct? (Y/n)"
    ![step2](/images/image2.png)
    ** If NO, app will ask customer again: "? Enter the ID of the product you would like to purchase: _ _"
    ** If YES, app  will ask : "? How many would you like to purchase? _ _ _ _"
    ![step3](/images/image3.png)
4. Once the customer has placed the order, app will check if store has enough of the product to meet the customer's request.
   ** If NO, the app will ask :
   "Sorry, insufficient quantity in stock!
    ? Would you still like to purchase this product? (Y/n)"
    ![step4](/images/image4.png)
  ** If YES, customer will see: 
            Order processing...
             Order confirmed!!! 
            Your total was $ 000.00.
            ? Would you like to make another purchase? Y/n 
    ![step5](/images/image5.png)
    **If YES continue shopping if NO 
            We appreciate your business. Have a great day!"
    ![step6](/images/image6.png)
And app will updat the SQL database to reflect the remaining quantity.
    ![step7](/images/image7.png)


