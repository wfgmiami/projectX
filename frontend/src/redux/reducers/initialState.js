const registerUser =
  {
    username:"",
    password:"",
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    applicationSuccess: ""
  }

  export default {
    articles: [],
    authors: [],
    user: {signinStatus: false},
    apiCallsInProgress: 0,
    contactForm: { isContactFormSent: false },
    registerUser
  }
