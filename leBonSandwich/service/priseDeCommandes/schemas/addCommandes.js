const Joi = require('joi');

const schema = Joi.object({
    uuid : 
    Joi .string()
        .min(3)
        .max(255)
        .required(),

    created_at :
    Joi .string()
        .pattern(new RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$')),

    updated_at :
    Joi .string()
        .pattern(new RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$')),

    nom : 
    Joi .string().alphanum()
        .min(3)
        .max(255)
        .required(),

    mail: 
    Joi .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    
})

module.exports = schema

/*const uuid = uuidv4();
        const created_at = "2019-11-08 13:45:55" // A Modifier
        const updated_at = created_at;
        //const created_at = new Date();
        //const updated_at = created_at;
        const { livraison, nom, mail, items } = req.body;
        const token = uuidv4();
        const client_id = null;
        const ref_paiement = null;
        const date_paiement = null;
        const mode_paiement = null;
        const remise = null;
        const status = 1;

*/

/* password : Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    */