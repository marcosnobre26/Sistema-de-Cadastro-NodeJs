const app = require('./config/express')();
const bodyParser = require('body-parser');
const port = app.get('port');
const { format } = require('date-fns');

const AgendamentoController = require('./api/controllers/agendamento-controller');
const UsuarioController = require('./api/controllers/usuario-controller');
const UnidadesController = require('./api/controllers/unidade-controller');
const SalasController = require('./api/controllers/salas-controller');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var database = require("./api/data/database");



app.get("/", function(req, res){
    res.send("Seja Bem vindo ao meu app.");
});

app.post("/usuario", UsuarioController.postUsuario);
app.get("/usuario/:id", UsuarioController.visualizarUsuario);
app.get("/usuarios", UsuarioController.visualizarUsuarios);
app.delete("/usuario/:id", UsuarioController.deleteUsuario);
app.put("/usuario", UsuarioController.updateUsuario);




app.post("/agendamento", AgendamentoController.postAgendamento);
app.delete("/agendamento/:id", AgendamentoController.deleteAgendamento);
app.get("/disponibilidade", AgendamentoController.listaDisponibilidade);
app.get("/agendamentos", AgendamentoController.getAgendamentos);


app.get("/salas", SalasController.getSalas);
app.get("/sala/:id", SalasController.getSala);
app.post("/sala", SalasController.postSala);
app.put("/sala", SalasController.updateSala);
app.delete("/sala/:id", SalasController.deleteSala);

app.get("/unidades", UnidadesController.visualizarUnidades);
app.get("/unidade/:id", UnidadesController.visualizarUnidade);
app.post("/unidade", UnidadesController.postUnidade);
app.put("/unidade", UnidadesController.updateUnidade);
app.delete("/unidade/:id", UnidadesController.deleteUnidade);





// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});