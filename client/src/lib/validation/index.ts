import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  company: yup.string().required("Company required"),
  email: yup.string().email("Enter a valid Email Address").required("Email Address required"),
  phone: yup.string().required("Phone Number required"),
  message: yup.string().required("Message required"),
});
