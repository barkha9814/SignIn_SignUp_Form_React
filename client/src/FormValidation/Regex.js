export const validName =  new RegExp('^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$');
// Name should contain letter and spaces only and 1st letter must capital


export const validEmail = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$');


export const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
// Password should contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character and have a length of at least of 8


export const validPhoneNumber = new RegExp('^([0-9]{10})$');