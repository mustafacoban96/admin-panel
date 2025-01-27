import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password cannot exceed 40 characters")
    .matches(/(?=.*[0-9])/, "Password must contain at least one numeric digit")
    .matches(/(?=.*[!@#$%^&*._])/, "Password must contain at least one special character")
    .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

