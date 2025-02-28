import { Contact } from '../models/Contact.js'

export async function contactUs(req, res) {
    const {
        businessName,
        firstName,
        lastName,
        email,
        phone,
        message
    } = req.body;

    try {

        const contact = new Contact({
            form_Id: `form_${Math.floor(Math.random() * 9999)}`,
            businessName,
            firstName,
            lastName,
            email,
            phone,
            message
        })

        contact.save();
        return res.status(200).json({ message: "Thank you! Your message has been sent successfully.", success: true });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong, try again!", success: false });
    }
}