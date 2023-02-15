# PORTOF-1

## INTRO

Hi! I'm Johand and i was an ex marketing with almost 5 years experience. But i have 0 knowledge of any IT industry. So i quit my comfort zone to challenge myself learn to code. Recently i just graduated from a bootcamp with excellent point.

Here is my personal portofolio project. It's far from perfect but i'm proud of it. hopefully some of this can impress you and offer me a job. You can visit my linkedIn for full profile [LinkedIn](https://www.linkedin.com/in/arijohand/). Or WhatsApp me on 081389934031.

I'm familiar with CI/CD, AWS, and heroku(not expert, i have to learn again), but i choose not to use it in this project because last time i got a bills with total charges USD $50++ in less than a month while i have no income. But once i got a job i will sure use it so i can keep practicing to make this project awesome!!

#

## The component in this project is:

Language: Javascript
Runtime: NodeJS
Framework: ExpressJS
Database: Postgresql
ORM: Sequelize
Design pattern: Some MVC some MRC
HTML / EJS
CSS
RESTful API

#

## Feature:

```
1. User login and register with landing page. ✅
2. automatically send email to new registered account to verify account with token link. ✅
3. User controller (Read, Update, Delete) (DB column : name, email, verified, password). ✅
4. PAGINATION for GET product method. ✅
5. Encrypted password with bcrypt. encrypted password with bcrypt. ✅
6. Password require to have minimum 5 characters, 1 uppercase, 1 lowercase, special character and number. ✅
7. Invite user with role "admin" without (automatically verified) and with external link to verify via nodemailer. (only admin can invite admin). ✅
8. Send mail verification to verify user using link with token in case they didnt receive one when registering. ✅
9. Forgot password using nodemailer, new password will be made using random string. ✅
10. CRUD for product (DB column: product_name, user_id, qty, price, image(link)). ✅
11. Auth with jwt token. ✅
12. Upload image(PNG, JPEG), video(MP4), PDF with multer - cloudinary. ✅
```

will be added soon:

```
1. Register and login using google oauth.
2. Swagger documentation.
3. Landing page for add and update product.
4. Unit test using jest (for some features). (temporary disabled and will update later. did so many changes to controller and havent updated the testing unit)
5. I'll think another feature if i found one. or maybe thats all and im moving forward to learn golang / python.
```

# HOW TO USE

1. run to install all dependencies

```
npm i
```

2. Create DB environment

```
npx sequelize db:create
```

3. Migrate the DB

```
npx sequelize db:migrate
```

4. Run nodemon

```
npm run dev
```

# URL

## LOGIN

```
localhost:8899/api/v0/login
```

BODY:

```
{
    "name": "arila",
    "password": "Us3r!"
}
```

### LOGIN PAGE

```
http://localhost:8899/login-page
```

### LOGIN WITH GOOGLE OAUTH

```
http://localhost:8899/api/v0/login-oauth
```

`If success you'll redirect to google.com, if failed you'll redirect to discord.com`

#

## REGISTER

```
localhost:8899/api/v0/user/register
```

BODY:

```
{
    "name": "Hire Me",
    "email": "Hire@Me.com",
    "password": "Us3r!",
    "rePassword": "Us3r!"
}
```

### REGISTER PAGE

```
http://localhost:8899/register-page
```

`NB: INPUT VALID MAIL TO CHECK CONFIRM MAIL DELIVERED/NOT TO THE NEWLY REGISTERED MAIL.`

#

## FORGOT PASSWORD

```
localhost:8899/api/v0/resetPassword
```

BODY:
{
"email_user": "xxx@xxx.com"
}

#

## INVITE ADMIN

### WITHOUT VERIFICATION BUTTON:

```
localhost:8899/api/v0/user/invite/admin
```

### WITH VERIFICATION BUTTON:

```
localhost:8899/api/v0/user/invite/adminWithButton
```

BODY:

```
{
    "list_user": [
        "xxx@xxx.com"
    ]
}
```

#

## USER CONTROLLER

### GET ALL USER

```
localhost:8899/api/v0/user/getAll
```

#### PARAMS:

limit: 2 `depends on how many data you want to see per page`

page: 1 `page number`

### GET USER BY ID

```
localhost:8899/api/v0/user/getById/:id
```

`ex: localhost:8899/api/v0/user/getById/12`

### GET BY NAME

```
localhost:8899/api/v0/user/name/:name
```

`ex: localhost:8899/api/v0/user/name/johan`

### UPDATE USER

```
localhost:8899/api/v0/user/update/:id
```

BODY:

```
{
    "name": "Hire Me",
    "email": "Hire@Me.com",
    "password": "Us3r!",
    "rePassword": "Us3r!"
}
```

### DELETE BY ID

```
localhost:8899/api/v0/user/delete/:id
```

#

## PRODUCT CONTROLLER

### GET ALL PRODUCT

```
localhost:8899/api/v0/allProduct
```

#### PARAMS:

limit: 2 `depends on how many data you want to see per page`

page: 1 `page number`

### GET BY ID

```
localhost:8899/api/v0/product/:id
```

### GET BY NAME

```
localhost:8899/api/v0/products
```

#### PARAMS:

search: {product name}

`ex: book / phone`

### UPDATE BY ID

```
localhost:8899/api/v0/product/:id
```

#### BODY:

```
{
    "product_name": "Ari Johand",
    "qty": 1,
    "price": 7000000,
    "image": "linkedin.com/in/arijohand/"
}
```

### ADD PRODUCTS

```
localhost:8899/api/v0/product
```

#### BODY

```
{
    "product_name": "Ari Johand",
    "qty": 1,
    "price": 7000000,
    "image": "linkedin.com/in/arijohand/"
}
```

### DELETE BY ID

```
localhost:8899/api/v0/product/:id
```

#
