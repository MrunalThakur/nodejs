import { addNewContact } from "../controllers/restController";

const routes = (app) =>{
    app.route('/contact')
    .get((req,res)=>
        res.send('GET req successful')
    )

    .post(addNewContact);

    app.route('/contact/:contactId')

    .put((req,res)=>
        res.send('PUT Req successful')
    )

    .delete((req,res)=>
        res.send('Delete request successful')
    )
}

export default routes;