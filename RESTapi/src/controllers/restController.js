import mongoose from 'mongoose';
import { ContactSchema } from '../model/restModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req,res) => {
    let newContact = new Contact(req.body);

    newContact.save()
        .then((err,contact) => {
        if(err){
            res.send(err);
        }
        res.json(contact);
    });
}