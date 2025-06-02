import Contact from "../models/contactModel.js";

export const createContact = async (req, res) => {
  try {
    const { subject, emailAddress, description } = req.body;

    if (!subject || !emailAddress || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newContact = await Contact.create({
      subject,
      emailAddress,
      description,
    });

    if (!newContact) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create Contact" });
    }

    return res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      contact: newContact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create contact",
      error: error.message,
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ status: "active" }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Contacts",
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch contact",
    });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Contact ID is required",
    });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(id, { status: "deleted" });
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact Deleted Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete contact message",
      error: error.message,
    });
  }
};
