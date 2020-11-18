var database = require("../data/database");

exports.postSalas = (req, res, next) => {
    let unit_id=req.body.unit_id;

    try {
            if(req.body.name.length===0)
            {
                res.status(400).send("Informe informações da sala");
            }
            else{

                    database.insert({//aqui ocorre a inserção no banco de dados
                        name: req.body.name,
                        unit_id: unit_id
                    }).table("salas").then(date=>{
                        res.status(200).send("Sala adicionada com sucesso.");// aqui informa que a sala foi adicionada
                        
                    }).catch(err=>{
                        console.log(err);
                    })
            }
        
    }
    catch(err){
        console.log(err);
        res.status(400).send("Erro de atributos. Nenhuma variavel foi apresentada.");
    }

}

exports.getSala = (req, res, next) => {

    try {
        database.select().table('salas').then(data => {

            res.status(200).send(data);//exibe o resultado encontrado
            
        }).catch(err => {
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
        res.status(400).send("Parametro não informado.");
    }

}

exports.getSalas = (req, res, next) => {
    let id=req.params.id;

    try {
        database.select().where({id:id}).table('salas').then(data => {

            res.status(200).send(data);//exibe o resultado encontrado
            
        }).catch(err => {
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
        res.status(400).send("Parametro não informado.");
    }

}


exports.updateSalas = (req, res, next) => {
    let id=req.body.id;
    let name=req.body.name;
    let unit_id=req.body.unit_id;

    if(name.length===0 || unit_id.length===0){
        res.status(400).send("Nenhum atributo pode estar vazio.");
    }
    else{
        database.select().where({id:id}).table('salas').then(data => {
            
            if(data.length===0)
            {
                database.where({id:id}).update({name:name, unit_id:unit_id}).table('salas').then(dat => {
                    database.select().where({id:id}).table('salas').then(date => {
                        res.status(200).send(date);
                        
                    }).catch(err => {
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
            else{
                if(data[0].id===parseInt(id))
                {
                    
                    database.where({id:id}).update({name:name, unit_id:unit_id}).table('salas').then(dat => {
                        database.select().where({id:id}).table('salas').then(date => {
                            res.status(200).send(date);
                            
                        }).catch(err => {
                            console.log(err);
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
                else{
                    res.status(200).send("Erro.");
                }
                
            }
        
        }).catch(err => {
            console.log(err);
        })

        
        
    }
}

exports.deleteSalas = (req, res, next) => {
    let id=req.params.id;

    database.where({id:id}).delete().table('salas').then(data => {
        res.status(200).send("Sala deletado com sucesso.");
        
    }).catch(err => {
        console.log(err);
    })
}