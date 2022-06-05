# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

___Table of Contents___

- [API and Database Requirements](#api-and-database-requirements)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Products](#products)
    - [Orders](#orders)
    - [Order Products](#order-products)
  - [Data Schema](#data-schema)
    - [Products Schema](#products-schema)
    - [Users Schema](#users-schema)
    - [Orders Schema](#orders-schema)
    - [Products for each Order Schema](#products-for-each-order-schema)
  - [Data Shapes](#data-shapes)
    - [User](#user)
    - [Product](#product)
    - [Order](#order)
    - [Order Product](#order-product)

## API Endpoints

### Users

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of user objects`

    ```json
      {
        "status": "success",
        "data": {
          "users": [
            {
              "id": 1,
              "email": "mo@elzanaty.com",
              "userName": "mohammedelzanaty",
              "firstName": "Mohammed",
              "lastName": "Elzanaty"
            }
          ]
        },
        "message": "users retrieved successfully"
      }
    ```

- Show **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/:id`  - **id of the user to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `User object`

    ```json
        {
          "status": "success",
          "data": {
            "user": {
              "id": 1,
              "email": "mo@elzanaty.com",
              "userName": "mohammedelzanaty",
              "firstName": "Mohammed",
              "lastName": "Elzanaty"
            }
          },
          "message": "user retrieved successfully"
        }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/users`
  - Request Body

    ```json
      {
        "email": "test@test.com",
        "userName": "testuser",
        "firstName": "Test",
        "lastName": "User",
        "password": "test123"
      }
    ```

  - Response Body -- `User object`

    ```json
      {
        "status": "success",
        "data": {
          "id": 1,
          "email": "test@test.com",
          "userName": "testuser",
          "firstName": "Test",
          "lastName": "User",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VyTmFtZSI6InRlc3R1c2VyIiwiZmlyc3ROYW1lIjoiVGVzdCIsImxhc3ROYW1lIjoiVXNlciJ9LCJpYXQiOjE2MjUwMDAyNTB9.y45Rlb9_olQIZpTHzFMH5fHK_coRlzcEuXQC2FXtCBY"
        },
        "message": "user created successfully"
      }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/users/:id` - **id of the user to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted User object`

    ```json
      {
        "status": "success",
        "data": {
          "user": {
            "id": 2,
            "email": "test@test.com",
            "userName": "testuser",
            "firstName": "Test",
            "lastName": "User"
          }
        },
        "message": "user deleted successfully"
      }
    ```

- Edit **`token required`**
  - HTTP verb `PATCH`
  - Endpoint:- `/api/users/:id`
  - Request Body

    ```json
      {
        "id": 1,
        "email": "mo@elzanaty.com",
        "userName": "mohammedelzanaty",
        "firstName": "Mohammed",
        "lastName": "Elzanaty",
        "password": "test123"
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
          "user": {
            "id": 1,
            "email": "mo@elzanaty.com",
            "userName": "mohammedelzanaty",
            "firstName": "Mohammed",
            "lastName": "Elzanaty"
          }
        },
        "message": "user updated successfully"
      }
    ```

- Authenticate
  - HTTP verb `POST`
  - Endpoint:- `/api/users/authenticate`
  - Request Body

    ```json
      {
        "userName": "mohammedelzanaty",
        "password": "test123"
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
          "id": 1,
          "email": "mo@elzanaty.com",
          "userName": "mohammedelzanaty",
          "firstName": "Mohammed",
          "lastName": "Elzanaty",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6Im1vQGVsemFuYXR5LmNvbSIsInVzZXJOYW1lIjoibW9oYW1tZWRlbHphbmF0eSIsImZpcnN0TmFtZSI6Ik1vaGFtbWVkIiwibGFzdE5hbWUiOiJFbHphbmF0eSJ9LCJpYXQiOjE2MjUwMDExMDB9.ubpj0l9VSl2Hd-KlHRqqO3-PmSf0VAySY2qnJ1N_S2Y"
        },
        "message": "user authenticated successfully"
      }
    ```

### Products

- Index
  - HTTP verb `GET`
  - Endpoint:- `/api/products/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of products`

    ```json
     {
        "status": "success",
        "data": {
          "products": [
            {
              "id": 1,
              "name": "product name",
              "description": "product description",
              "price": 20,
              "category": "Electronics."
            }
          ]
        },
        "message": "Products retrieved successfully"
      }
    ```

- Show
  - HTTP verb `GET`
  - Endpoint:- `/api/products/:id`  - **id of the product to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Product object`

    ```json
      {
        "status": "success",
        "data": {
          "product": {
            "id": 1,
            "name": "product name",
            "description": "product description",
            "price": 9.99,
            "category": "Electronics."
          }
        },
        "message": "Product retrieved successfully"
      }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/products`
  - Request Body

    ```json
      {
        "name": "product name",
        "description": "product description",
        "price": 9.99,
        "category": "Electronics."
      }
    ```

  - Response Body -- `User object`

    ```json
      {
        "status": "success",
        "data": {
          "id": 1,
          "name": "product name",
          "description": "product description",
          "price": 9.99,
          "category": "Electronics."
        },
        "message": "Product created successfully"
      }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/products/:id` - **id of the product to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Product object`

    ```json
      {
        "status": "success",
        "data": {
          "product": {
            "id": 3,
            "name": "product name",
            "description": "product description",
            "price": 9.99,
            "category": "Electronics."
          }
        },
        "message": "Product deleted successfully"
      }
    ```

- Edit **`token required`**
  - HTTP verb `PUT`
  - Endpoint:- `/api/products/:id`
  - Request Body

    ```json
      {
        "id": 1,
        "name": "product name",
        "description": "product description",
        "price": 20,
        "category": "Electronics."
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
          "product": {
            "id": 1,
            "name": "product name",
            "description": "product description",
            "price": 20,
            "category": "Electronics."
          }
        },
        "message": "Product updated successfully"
      }
    ```

- **[OPTIONAL]** Top 5 most popular products
- **[OPTIONAL]** Products by category (args: product category)

### Orders

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of order objects, including an array of products added to the order and the associated user`

    ```json
        {
          "status": "success",
          "data": {
            "orders": [
              {
                "id": 1,
                "status": "active",
                "userId": 1,
                "userName": "mohammedelzanaty",
                "products": [
                  {
                    "name": "product name",
                    "price": 20,
                    "category": "Electronics.",
                    "quantity": 1,
                    "productId": 1,
                    "description": "product description"
                  }
                ]
              }
            ]
          },
          "message": "Orders retrieved successfully"
        }
    ```

- Show - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/:id`  - **id of the order to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Order object`

    ```json
      {
        "status": "success",
        "data": {
          "order": {
            "id": 1,
            "status": "active",
            "userId": 1,
            "userName": "mohammedelzanaty",
            "products": []
          }
        },
        "message": "Order retrieved successfully"
      }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/orders`
  - Request Body

    ```json
      {
        "userId": 1,
        "status": "active"
      }
    ```

  - Response Body -- `User object`

    ```json
      {
        "status": "success",
        "data": {
          "id": 1,
          "status": "active",
          "userId": 1
        },
        "message": "Order created successfully"
      }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/orders/:id` - **id of the order to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Order object`

    ```json
      {
        "status": "success",
        "data": {
          "order": {
            "id": 1,
            "status": "active",
            "user_id": 1
          }
        },
        "message": "Order deleted successfully"
      }
    ```

- Edit **`token required`**
  - HTTP verb `PUT`
  - Endpoint:- `/api/orders/:id`
  - Request Body

    ```json
      {
        "id": 1,
        "userId": 1,
        "status": "active"
      }
    ```

  - Response Body -- `Updated User object`

    ```json
      {
        "status": "success",
        "data": {
          "order": {
            "id": 1,
            "status": "active",
            "userId": 1
          }
        },
        "message": "Order updated successfully"
      }
    ```

- [OPTIONAL] Completed Orders by user [args: user id](token required)

### Order Products

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/order-products/:order_id/products` - **id of the order**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `An array of the products associated with an order`

    ```json
      {
        "status": "success",
        "data": {
          "orderProducts": [
            {
              "id": 1,
              "orderId": 1,
              "productId": 1,
              "products": [
                {
                  "name": "product name",
                  "price": 20,
                  "category": "Electronics.",
                  "quantity": 1,
                  "productId": 1,
                  "description": "product description"
                }
              ]
            }
          ]
        },
        "message": "Order Products retrieved successfully"
      }
    ```

- Show - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/order-products/:order_id/products/:product_id` - **id of the order abd id of the product to return**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `An array of the products associated with an order`

    ```json
      {
        "status": "success",
        "data": {
          "orderProduct": {
            "id": 1,
            "orderId": 1,
            "productId": 1,
            "quantity": 1,
            "name": "product name",
            "description": "product description",
            "category": "Electronics.",
            "price": 20
          }
        },
        "message": "Product at target Order retrieved successfully"
      }
    ```

- Edit - **`token required`**
  - HTTP verb `PATCH`
  - Endpoint:- `/api/order-products/:order_id/products/:product_id` - **id of the order abd id of the product to return**
  - Request Body

    ```json
      {
        "id": 1,
        "orderId": 1,
        "productId": 1,
        "quantity": 4
      }
    ```

  - Response Body -- `An array of the products associated with an order`

    ```json
      {
        "status": "success",
        "data": {
          "orderProduct": {
            "id": 1,
            "quantity": 4,
            "orderId": 1,
            "productId": 1
          }
        },
        "message": "order Product updated successfully"
      }
    ```

- Delete - **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/order-products/:order_id/products/:product_id` - **id of the order abd id of the product to return**
  - Request Body

    ```json
      {
        "orderId": 1,
        "productId": 1
      }
    ```

  - Response Body -- `An array of the products associated with an order`

    ```json
      {
        "status": "success",
        "data": {
          "orderProduct": {
            "id": 1,
            "quantity": 1,
            "orderId": 1,
            "productId": 1,
            "products": []
          }
        },
        "message": "Order Product deleted successfully"
      }
    ```

## Data Schema

### Products Schema

```sql
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC(17, 2) NOT NULL, /* Limit price to 15 digits before decimal, and two after. */
  category VARCHAR(50) NOT NULL
);
```

### Users Schema

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  username VARCHAR(50) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### Orders Schema

```sql
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id BIGINT REFERENCES users(id) NOT Null
);
```

### Products for each Order Schema

```sql
CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  order_id BIGINT REFERENCES orders(id) NOT NULL,
  product_id BIGINT REFERENCES products(id) NOT NULL,
  quantity INT
);
```

## Data Shapes

### User

```typescript
type User = {
  id?: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password?: string;
}
```

### Product

```typescript
type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
};
```

### Order

```typescript
type Order = {
  id?: number;
  // status of order (active or complete)
  status: string; 
  userId: string;
  userName?: string;
  // quantity of each product in the order 
  // id of each product in the order
  // => [{ product_id: number, quantity: number, etc.. }]
  products?: OrderProduct[]; 
}
```

### Order Product

```typescript
type OrderProduct = {
  id?: number;
  quantity: number;
  orderId: number;
  productId: number;
  products?: Product[];
};
```
