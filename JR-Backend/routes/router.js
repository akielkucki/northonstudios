import express from "express";

// import { getContactFormsDetails, getSingleContactFormDetails } from '../controllers/admin.js';
import { contactUs } from "../controllers/web.js";

const Router = express.Router();

Router.get('/', (req, res) => {
    res.send('Hello dear fella!');
})

// Website Routes
Router.route('/contact').post(contactUs);

// Admin Routes
// Router.route('/admin/getContactFormsDetails').get(getContactFormsDetails);
// Router.route('/admin/getSingleFormDetails').get(getSingleContactFormDetails);

export default Router