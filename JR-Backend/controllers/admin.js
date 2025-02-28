// import { Contact } from '../models/Contact.js'

// export async function getContactFormsDetails(req, res) {
//     const { page, limit = 10 } = req.query;
//     try {

//         const contacts = await Contact
//             .find({})
//             .sort({ createdAt: -1 })
//             .select("form_Id businessName phone createdAt")
//             .limit(limit)
//             .skip((page - 1) * limit)

//         const countDocuments = await Contact.countDocuments({});

//         return res.status(200).json({
//             data: {
//                 contacts,
//                 fullLength: countDocuments
//             },
//             success: true,
//         })

//     } catch (error) {
//         return res.status(500).json({
//             error: "Something went wrong, try again!", success
//                 : false
//         });
//     }
// }

// export async function deleteProject(req, res) {
//     const { id } = req.body;

//     try {
//         await Contact.findOneAndDelete({ form_Id: id });
//         return res.status(200).json({ message: "Contact deleted successfully!", success: true });
//     } catch (error) {
//         return res.status(500).json({ error: "Something went wrong, try again!", success: false });
//     }
// }

// export async function getSingleContactFormDetails(req, res) {
//     const { form_Id } = req.query;

//     try {
//         const contact = await Contact.findOne({ form_Id });
//         if (contact) {
//             return res.status(200).json({
//                 data: {
//                     contact
//                 },
//                 success: true
//             });
//         } else {
//             return res.status(404).json({
//                 error: "Details not found",
//                 success: false
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({
//             error: "Something went wrong, try again!", success
//                 : false
//         });
//     }
// }