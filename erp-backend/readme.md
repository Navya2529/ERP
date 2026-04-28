

Move to directory:
cd .\erp-backend

To Start server :
node server.js




----- API routes ------

post localhost:5000/auth/login/ - Generate JWT Token
post localhost:5000/refresh/login/ - Refresh the new JWT token
post localhost:5000/seed/admin/ - Create Admin Account
Post localhost:5000/seed/warden - Create Warden Account
Post localhost:5000/seed/students/ Create Student Account
Post localhost:5000/seed/librarian/ Create librarian Account
Post localhost:5000/seed/accountant/ Create accountant Account
post localhost:5000/students/create/ - create Student
Get localhost:5000/students/2 - Get Student based on Id
PUT localhost:5000/admission/approve/1 - pprove the admission based on ID
Post localhost:5000/fees/pay - Pay Student fee based on id
Get localhost:5000/fees/status/2 - Status of the fee based on id
Post localhost:5000/fees/status/2 - Allocate hostel to the student based on id
Get localhost:5000/hostel/occupancy - Check occupancy of Hostel (Full or available)
Post localhost:5000/hostel/occupancy - Library books lending
Put localhost:5000/library/return/1 - return library book
Get localhost:5000/library/eligibility/1 - if not returned book then not elegible for exam
Post localhost:5000/exam/register - Register for exam
get localhost:5000/dashboard/exams - number of people registred for exam



<!-- Updated API's -->
post   /seed/admin/
POST   /auth/login
POST   /auth/refresh/login

<!-- admin -->
POST   /students/create
GET    /students/:id
GET    /students

<!-- admin -->
PUT    /admission/approve/:id

<!-- admission -->
POST   /fees/pay
GET    /fees/status/:studentId

<!--  -->
    POST   /hostel/allocate
    GET    /hostel/occupancy

POST   /library/issue
PUT    /library/return/:id

GET    /students/me
POST   /exam/register
GET    /exam/hallticket/:studentId

GET    /dashboard/admissions
GET    /dashboard/fees
GET    /dashboard/hostel
GET    /dashboard/library
GET    /dashboard/exams
GET    /dashboard/admin

https://github.com/SriHari0429/Automated-Erp-System.git