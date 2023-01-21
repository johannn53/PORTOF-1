# PORTOF-1

Hi! I'm Johand and i was an ex marketing with almost 5 years experience. But i have 0 knowledge of any IT industry. So i quit my comfort zone to challenge myself learn to code. Recently i just graduated from a bootcamp with excellent point.

Here is my personal portofolio project. It's far from perfect but i'm proud of it. hopefully some of this can impress you and offer me a job.

I'm familiar with CI/CD, AWS, and heroku(not expert, i have to learn again), but i choose not to use it in this project because last time i got a bills with total charges USD $50++ in less than a month while i have no income. But once i got a job i will sure use it so i can keep practicing to make this project awesome!!

The component in this project is:

Language: Javascript
Runtime: NodeJS
Framework: ExpressJS
Database: Postgresql
ORM: Sequelize
Design pattern: Model Controller Router
HTML / EJS
CSS
RESTful API

Feature:

1. User login and register with landing page. (DB column : name, email, verified, password)
2. Invite user with role "admin" with and without external link to verify via nodemailer.
3. Send mail verification to verify user using link with token.
4. Forgot password using nodemailer, new password will be made using random string.
5. CRUD for product (DB column: product_name, user_id, qty, price, image(link))
6. Auth with jwt token, encrypted password with bcrypt.
7. Upload image, video, pdf with multer - cloudinary.
8. Unit test using jest (for some method).
9. Documentation API using swagger (soon, for now using postman).

will be added soon:

1. Register and login using google oauth.
2. Swagger documentation.
3. User register will automatically receive email when register to verify email.
