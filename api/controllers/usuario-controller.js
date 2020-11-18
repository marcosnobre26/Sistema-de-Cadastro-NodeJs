var database = require("../data/database");

exports.postUsuario = (req, res, next) => {
    

    try {
            if(req.body.name.length===0 || req.body.email.length===0 || req.body.password.length===0)
            {
                res.status(400).send("Informe algum valor para todos os atributos: Nome, Email e Password");
            }
            else{
                database.select().where({email:req.body.email}).table('usuarios').then(data => {// realiza primeiro a verificação para ver se o email já esta sendo utilizado

                    if(data.length===0)// realiza o condicional para saber se algum resultado foi encontrado. Se o tamanho da resposta for 0, então o codigo prossegue para a inserção
                    {
                        database.insert({//aqui ocorre a inserção no banco de dados
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                        }).table("usuarios").then(date=>{
                            res.status(200).send("Usuario "+req.body.name+" adicionado com sucesso.");// aqui informa que a pessoa foi adicionada
                            
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                    else{//se a consulta tiver tamanho 1, então significa que já tem um email cadastrado e uma resposta é enviada informando o que houve
                        res.status(412).send("O email informado já esta em uso. Por favor, informe um email unico para adicionar as suas informações.");
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        
    }
    catch(err){
        console.log(err);
        res.status(400).send("Erro de atributos. Nenhuma variavel foi apresentada.");
    }

}

exports.visualizarUsuario = (req, res, next) => {
    let id=req.params.id;

    try {
        database.select().where({id:id}).table('usuarios').then(data => {

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

exports.visualizarUsuarios = (req, res, next) => {

    try {
        database.select().table('usuarios').then(data => {

            res.status(200).send(data);//exibe o resultado encontrado
            
        }).catch(err => {
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }

}

exports.updateUsuario = (req, res, next) => {
    let id=req.body.id;
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;

    if(name.length===0 || email.length===0 || password.length===0){
        res.status(400).send("Nenhum atributo pode estar vazio.");
    }
    else{
        database.select().where({email:email}).table('usuarios').then(data => {
            
            if(data.length===0)
            {
                database.where({id:id}).update({name:name, email:email,password:password}).table('usuarios').then(dat => {
                    database.select().where({id:id}).table('usuarios').then(date => {
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
                    
                    database.where({id:id}).update({name:name, email:email,password:password}).table('usuarios').then(dat => {
                        database.select().where({id:id}).table('usuarios').then(date => {
                            res.status(200).send(date);
                            
                        }).catch(err => {
                            console.log(err);
                        })
                    }).catch(err => {
                        console.log(err);
                    })
                }
                else{
                    res.status(200).send("O email informado já esta em uso. Não é permitido que emails já cadastrados sejam usados por outra pessoa, por favor, informe um novo email, que seja unico e individual.");
                }
                
            }
        
        }).catch(err => {
            console.log(err);
        })

        
        
    }
}

exports.deleteUsuario = (req, res, next) => {
    let id=req.params.id;

    database.where({id:id}).delete().table('usuarios').then(data => {
        res.status(200).send("Usuario deletado com sucesso.");
        
    }).catch(err => {
        console.log(err);
    })
}