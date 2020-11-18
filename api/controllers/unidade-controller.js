var database = require("../data/database");

exports.postUnidade = (req, res, next) => {
    try {
            if(req.body.name.length===0 || req.body.zip_code.length===0 || req.body.address.length===0 || req.body.neighborhood.length===0 || req.body.number.length===0 || req.body.complement.length===0 || req.body.city.length===0 || req.body.state.length===0)
            {
                res.status(400).send("Informe algum valor para todos os atributos: Nome, Email e Password");
            }
            else{

                    database.insert({//aqui ocorre a inserção no banco de dados
                        name: req.body.name,
                        zip_code: req.body.zip_code,
                        address: req.body.address,
                        neighborhood: req.body.neighborhood,
                        number: req.body.number,
                        complement: req.body.complement,
                        city: req.body.city,
                        state: req.body.state,
                    }).table("unidades").then(date=>{
                        res.status(200).send("Unidade adicionado com sucesso.");// aqui informa que a unidade foi adicionada
                        
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

exports.visualizarUnidade = (req, res, next) => {
    let id=req.params.id;

    try {
        database.select().where({id:id}).table('unidades').then(data => {

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

exports.visualizarUnidades = (req, res, next) => {

    try {
        database.select().table('unidades').then(data => {

            res.status(200).send(data);//exibe o resultado encontrado
            
        }).catch(err => {
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }

}

exports.updateUnidade = (req, res, next) => {
    let id=req.body.id;
    let zip_code=req.body.zip_code;
    let address=req.body.address;
    let neighborhood=req.body.neighborhood;
    let number=req.body.number;
    let complement=req.body.complement;
    let city=req.body.city.length;
    let state=req.body.state;

    if(req.body.name.length===0 || req.body.zip_code.length===0 || req.body.address.length===0 || req.body.neighborhood.length===0 || req.body.number.length===0 || req.body.complement.length===0 || req.body.city.length===0 || req.body.state.length===0){
        res.status(400).send("Nenhum atributo pode estar vazio.");
    }
    else{
        database.select().where({email:email}).table('unidades').then(data => {
            
            if(data.length===0)
            {
                database.where({id:id}).update({name: req.body.name,
                    zip_code: req.body.zip_code,
                    address: req.body.address,
                    neighborhood: req.body.neighborhood,
                    number: req.body.number,
                    complement: req.body.complement,
                    city: req.body.city,
                    state: req.body.state,}).table('unidades').then(dat => {
                    database.select().where({id:id}).table('unidades').then(date => {
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
                    
                    database.where({id:id}).update({name: req.body.name,
                        zip_code: req.body.zip_code,
                        address: req.body.address,
                        neighborhood: req.body.neighborhood,
                        number: req.body.number,
                        complement: req.body.complement,
                        city: req.body.city,
                        state: req.body.state,}).table('unidades').then(dat => {
                        database.select().where({id:id}).table('unidades').then(date => {
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

exports.deleteUsuario = (req, res, next) => {
    let id=req.params.id;

    database.where({id:id}).delete().table('unidades').then(data => {
        res.status(200).send("Unidade deletada com sucesso.");
        
    }).catch(err => {
        console.log(err);
    })
}
