var database = require("../data/database");
const { format } = require('date-fns');
var differenceInHours = require('date-fns/differenceInHours')
var differenceInMonths = require('date-fns/differenceInMonths')
var eachHourOfInterval = require('date-fns/eachHourOfInterval')
var getHours = require('date-fns/getHours')


exports.getAgendamentos = (req, res, next) => {
    let id=req.body.user_id;


    database.table('agendamento')
    .join('salas', 'agendamento.room_id', '=', 'salas.id')
    .join('unidades', 'salas.unit_id', '=', 'unidades.id')
    .select().where({user_id:id}).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
    })
}


exports.deleteAgendamento = (req, res, next) => {
    let id=req.params.id;
    let user_id=req.body.user_id;

    const date = new Date();
    const formattedDate = format(date, 'yyyy/MM/dd k:00:00');

    database.select().table('agendamento').where({id:id}).then(data => {
        console.log('retornando data do banco: '+data[0].date);

        if(date[0].user_id === user_id)
        {
            var result = differenceInHours(

                new Date(format(data[0].date, 'yyyy/MM/dd k:00:00')),

                new Date(formattedDate)
                
            )

            if(result > 72){
                database.where({id:id}).delete().table('agendamento').then(data => {
                    res.status(200).send("Agendamento deletado com sucesso.");
                    
                }).catch(err => {
                    console.log(err);
                })
            }
            else{
                res.status(404).send("Não é possivel cancelar seu agendamento. Só é possível cancelar um agendamento com 72horas de antecedência.");
            }
        }else{
            res.status(404).send("Esta consulta não pertence ao usuario. Apenas o usuario relacionado a consulta pode deleta-la.");
        }
    
        
    }).catch(err => {
        console.log(err);
    })
   

    console.log('hora atual: '+formattedDate);
    console.log('hora do banco: '+formattedDate);
    var result = differenceInHours(
        new Date(formattedDate),
        
        //new Date(2014, 11, 20, 10, 00)
        new Date(formattedDate)
      )

    console.log(result);

    
}

exports.postAgendamento = (req, res, next) => {
    let user_id=req.body.id;
    let room_id=req.body.room_id;

    const date = new Date();
    //const formattedDate = format(date, 'yyyy/MM/dd k:m:s');
    const formattedDate = format(date, 'yyyy/MM/dd k:00:00');
    //const formattedDate = format(date, 'yyyy/MM/dd');
    const dia = format(date, 'dd');
    const mes = format(date, 'MM')-1;
    const ano = format(date, 'yyyy');

    database.insert({//aqui ocorre a inserção no banco de dados
        date: formattedDate,
        room_id: req.body.room_id,
        user_id: req.body.user_id
    }).table("agendamento").then(date=>{
        res.status(200).send("Agendamento realizado com sucesso.");// aqui informa que a pessoa foi adicionada
        
    }).catch(err=>{
        console.log(err);
    })


}

exports.listaDisponibilidade = (req, res, next) => {

    const date = new Date();
    const formattedDate = format(date, 'yyyy/MM/dd k:00:00');

    let dia = format(date, 'dd');
    let mes = format(date, 'MM');
    let ano = format(date, 'yyyy');
    let disponibilidade=[];
    let lista=[];
    let lista2=[];
    let varivel;
    


    database.select().table('agendamento').then(data => {
        
        var result = eachHourOfInterval({

            start: new Date(parseInt(ano), parseInt(mes)-1, parseInt(dia), 0),
            end: new Date(parseInt(ano), parseInt(mes)+1,parseInt(17), 24)
        })
        

        for (var i = 0; i < result.length; i++) {
            
            for (var a = 0; a < data.length; a++) {
                
                if(format(result[i],'yyyy/MM/dd k:00:00') != format(data[a].date,'yyyy/MM/dd k:00:00'))
                {

                    var hora = getHours(new Date(result[i]))
                    console.log(hora);
                    if(hora>=8 && hora<=19)
                    {

                        disponibilidade.push(format(result[i],'yyyy/MM/dd k:00:00'));
                        
                    }
                    
                    
                    
                    
                }

            }
        }
        
        for (var i = 0; i < disponibilidade.length; i++) {
            variavel=disponibilidade[i];

            if(disponibilidade[i]!=disponibilidade[i+1]){
                lista.push(disponibilidade[i]);
            }
            
        }
        res.status(200).send(lista);
    }).catch(err => {
        console.log(err);
    })
}