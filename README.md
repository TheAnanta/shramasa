# Shramasa Server

to seed data into your container

```
npm run seed
```

to test queries

```
npm run query
```

production/dev
```
npm run dev
```
<br>

<br>

# Manual Verification

## Routes
<br>

### 1. userRoutes ☑️
<br>

1.1 **signup** ☑️
> `POST /signup` : an api to `create` an user on DB after firebase auth

1.2 **get-user** ☑️
> `GET /get-user` : an api to `get` a user from DB

1.3 **update-user** ☑️
> `PUT /update-user` : an api to `update` a user on DB

1.4 **delete-user** ☑️
> `DELETE /delete-user` : an api to `delete` a user from DB and then subsequently add him to `DeleteUser` table

<br>

________________________________________________
<br>

### 2. categoryRoutes
<br>

2.1 **addCategory** ☑️
> `POST /add-category` : an api to `add` categories on DB from Admin panel

2.2 **getAllCategories** ☑️
> `GET /get-all-categories` : an api to `get` all categories from DB

2.3 **updateCategory** ☑️
> `PUT /update-category` : an api to `update` a category on DB using id

2.4 **deleteCategory** ☑️
> `DELETE /delete-category` : an api to `delete` a category from DB using Admin panel

<br>

________________________________________________
<br>

### 3. subCategoryRoutes
<br>

3.1 **addSubCategory** ☑️
> `POST /add-category` : an api to `add` sub-categories on DB from Admin panel

3.2 **getAllSubCategories** ☑️
> `GET /get-all-subcategories` : an api to `get` all sub-categories from DB

3.3 **getSubCategoriesByCategory**
> `GET /get-subcategories-by-category` : an api to `get` all sub-categories by `category` from DB

3.3 **updateSubCategory** ☑️
> `PUT /update-subcategory` : an api to `update` a sub-category on DB using id

<br>

________________________________________________
<br>

### 4. orderRoutes
<br>

4.1 **instantiateOrder** ☑️
> `POST /instantiate-order` : an api to `add` orders on DB
<br>

________________________________________________
<br>

### 5. orderRoutes
<br>

5.1 **addProduct** ☑️
> `POST /get-all-products` : an api to `add` orders on DB

5.2 **getAllProducts** ☑️
> `GET /get-all-products` : an api to `get` all products from DB

5.3 **updateProduct** ☑️
> `PUT /update-product` : an api to `update` a product on DB using id

5.4 **updateProductStock** ☑️
> `PUT /update-product-stock-by-id` : an api to `update` a product stock on DB using id

5.5 **publishProductReview** ☑️
> `POST /publish-product-review` : an api to `add` product review on DB

5.6 **deleteProductById** ☑️
> `DELETE /delete-product-by-id` : an api to 
`delete` a product from DB using id

